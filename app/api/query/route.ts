import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { generateLLMResponse } from '@/lib/llm'

interface FAQDocument {
  questionNumber: number
  question: string
  answer: string
  _id?: unknown
}

// Simple similarity search - finds FAQ with most matching words
function findBestMatchingFAQ(userQuestion: string, faqs: FAQDocument[]): FAQDocument {
  const questionLower = userQuestion.toLowerCase()
  const questionWords = questionLower.split(/\s+/).filter(w => w.length > 2)
  
  let bestMatch = faqs[0]
  let bestScore = 0
  
  for (const faq of faqs) {
    const faqText = `${faq.question} ${faq.answer}`.toLowerCase()
    let score = 0
    
    for (const word of questionWords) {
      if (faqText.includes(word)) {
        score += 1
      }
    }
    
    // Bonus for exact phrase matches
    if (faq.question.toLowerCase().includes(questionLower)) {
      score += 5
    }
    
    if (score > bestScore) {
      bestScore = score
      bestMatch = faq
    }
  }
  
  return bestMatch
}

export async function POST(request: Request) {
  try {
    const { question } = await request.json()
    
    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    // Fetch all FAQs from database
    const client = await clientPromise
    const db = client.db('diet_faq')
    const faqs = await db.collection('faqs').find({}).toArray()

    if (faqs.length === 0) {
      return NextResponse.json(
        { error: 'FAQ database is empty. Please seed the database first.' },
        { status: 500 }
      )
    }

    // Find the best matching FAQ
    const bestMatch = findBestMatchingFAQ(question, faqs)
    
    // Prepare context for LLM
    const context = faqs.map(
      (faq) => `Q${faq.questionNumber}: ${faq.question}\nA: ${faq.answer}`
    ).join('\n\n')

    // Prepare system prompt
    const systemPrompt = `You are a helpful diet and nutrition assistant. Use the following FAQ database as context to answer user questions. Always provide a clear answer first, then include a reference in the format "(Ref: Question #X)" where X is the question number from the FAQ that best matches the user's question.

FAQ Database:
${context}

Important: Your response must end with "(Ref: Question #X)" where X is the question number from the FAQ database.`

    // Call LLM API (supports both OpenAI and Gemini)
    const llmResponse = await generateLLMResponse(systemPrompt, question)

    if (llmResponse.error) {
      return NextResponse.json(
        { error: `LLM Error: ${llmResponse.error}. Please check your API keys in .env.local` },
        { status: 500 }
      )
    }

    const response = llmResponse.content || 'I apologize, but I could not generate a response.'

    // Ensure the response includes the reference
    let finalResponse = response.trim()
    if (!finalResponse.includes(`(Ref: Question #${bestMatch.questionNumber})`)) {
      finalResponse = `${finalResponse} (Ref: Question #${bestMatch.questionNumber})`
    }

    return NextResponse.json({
      answer: finalResponse,
      reference: bestMatch.questionNumber,
    })
  } catch (error: any) {
    console.error('Error processing query:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process query' },
      { status: 500 }
    )
  }
}
