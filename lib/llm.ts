import { GoogleGenerativeAI } from '@google/generative-ai'
import OpenAI from 'openai'

export type LLMProvider = 'openai' | 'gemini'

interface LLMResponse {
  content: string
  error?: string
}

/**
 * Get the configured LLM provider from environment variables
 * Priority: GEMINI_API_KEY > OPENAI_API_KEY
 * Default: 'gemini' (free tier recommended)
 */
export function getLLMProvider(): LLMProvider {
  if (process.env.GEMINI_API_KEY) {
    return 'gemini'
  }
  if (process.env.OPENAI_API_KEY) {
    return 'openai'
  }
  // Default to gemini for free tier
  return 'gemini'
}

/**
 * Generate response using OpenAI
 */
async function generateWithOpenAI(
  systemPrompt: string,
  userQuestion: string
): Promise<LLMResponse> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      content: '',
      error: 'OPENAI_API_KEY is not set',
    }
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userQuestion,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    })

    const content = completion.choices[0]?.message?.content || ''
    return { content }
  } catch (error: any) {
    return {
      content: '',
      error: error.message || 'OpenAI API error',
    }
  }
}

/**
 * Generate response using Google Gemini
 */
async function generateWithGemini(
  systemPrompt: string,
  userQuestion: string
): Promise<LLMResponse> {
  if (!process.env.GEMINI_API_KEY) {
    return {
      content: '',
      error: 'GEMINI_API_KEY is not set',
    }
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Combine system prompt and user question for Gemini
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userQuestion}`

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const content = response.text()

    return { content }
  } catch (error: any) {
    return {
      content: '',
      error: error.message || 'Gemini API error',
    }
  }
}

/**
 * Main function to generate LLM response
 * Automatically uses the configured provider
 */
export async function generateLLMResponse(
  systemPrompt: string,
  userQuestion: string
): Promise<LLMResponse> {
  const provider = getLLMProvider()

  if (provider === 'gemini') {
    return generateWithGemini(systemPrompt, userQuestion)
  } else {
    return generateWithOpenAI(systemPrompt, userQuestion)
  }
}

