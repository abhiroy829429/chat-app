import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { faqs } from '@/lib/faqs'

export async function POST() {
  try {
    const client = await clientPromise
    const db = client.db('diet_faq')
    const collection = db.collection('faqs')
    
    // Clear existing FAQs
    await collection.deleteMany({})
    
    // Insert all FAQs
    await collection.insertMany(faqs)
    
    return NextResponse.json({ 
      message: `Successfully seeded ${faqs.length} FAQs`,
      count: faqs.length 
    })
  } catch (error: any) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to seed database' },
      { status: 500 }
    )
  }
}


