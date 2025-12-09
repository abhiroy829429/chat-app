/**
 * Database Check Script
 * Check if the database is seeded with FAQ data
 *
 * Usage: node scripts/check-db.js
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const { MongoClient } = require('mongodb')

async function checkDatabase() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.error('❌ Error: MONGODB_URI environment variable is not set')
    console.error('Please set it in your .env.local file')
    process.exit(1)
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log('✅ Connected to MongoDB')

    const db = client.db('diet_faq')
    const collection = db.collection('faqs')

    // Count documents
    const count = await collection.countDocuments()
    console.log(`📊 Total FAQs in database: ${count}`)

    if (count > 0) {
      console.log('✅ Database is seeded!')

      // Show a few sample FAQs
      const sampleFaqs = await collection.find({}).limit(3).toArray()
      console.log('\n📝 Sample FAQs:')
      sampleFaqs.forEach(faq => {
        console.log(`Q${faq.questionNumber}: ${faq.question}`)
        console.log(`A: ${faq.answer}\n`)
      })
    } else {
      console.log('❌ Database is empty. Run: node scripts/seed-db.js')
    }

  } catch (error) {
    console.error('❌ Error checking database:', error)
    process.exit(1)
  } finally {
    await client.close()
    console.log('🔌 Database connection closed')
  }
}

checkDatabase()