/**
 * Database Seeding Script
 * Run this script to seed the database with FAQ data
 * 
 * Usage: node scripts/seed-db.js
 * Or: npm run seed (if added to package.json)
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const { MongoClient } = require('mongodb')

// FAQ data
const faqs = [
  { questionNumber: 1, question: 'What is the ideal diet for weight loss?', answer: 'A calorie-deficit diet with high protein, high fiber, and low sugar helps in healthy weight loss.' },
  { questionNumber: 2, question: 'What is the ideal diet for weight gain?', answer: 'Eat more calories than you burn, including nuts, whole grains, dairy, and protein-rich foods.' },
  { questionNumber: 3, question: 'How many calories should I eat per day?', answer: 'Most adults need 1,600-2,500 calories depending on age, gender, and activity.' },
  { questionNumber: 4, question: 'Is it necessary to count calories?', answer: 'No, but calorie tracking helps control portions and stay consistent.' },
  { questionNumber: 5, question: 'What is a balanced diet?', answer: 'A diet with carbs, protein, healthy fats, fruits, vegetables, and enough water.' },
  { questionNumber: 6, question: 'How much water should I drink daily?', answer: '2-3 liters per day, more if you sweat.' },
  { questionNumber: 7, question: 'Are supplements necessary?', answer: 'Only if your diet lacks nutrients or a doctor recommends them.' },
  { questionNumber: 8, question: 'Is intermittent fasting effective?', answer: 'Yes for many people, but not recommended for pregnant women or those with medical conditions.' },
  { questionNumber: 9, question: 'What is the best time to eat meals?', answer: 'Eat every 3-4 hours and avoid heavy late-night meals.' },
  { questionNumber: 10, question: 'Are carbs bad?', answer: 'No. Whole carbs are healthy; refined carbs should be limited.' },
  { questionNumber: 11, question: 'Why am I not losing weight even after dieting?', answer: 'Possible reasons include hidden calories, poor sleep, stress, or lack of exercise.' },
  { questionNumber: 12, question: 'How to reduce belly fat?', answer: 'Eat fewer calories, increase protein, reduce sugar, and do strength training.' },
  { questionNumber: 13, question: 'How much protein do I need for fat loss?', answer: '1.2-1.6 g per kg body weight daily.' },
  { questionNumber: 14, question: 'Can I lose weight without exercise?', answer: 'Yes, but exercise makes fat loss faster and healthier.' },
  { questionNumber: 15, question: 'Why does my weight fluctuate?', answer: 'Due to water retention, salt intake, digestion, and hormones.' },
  { questionNumber: 16, question: 'What diet is best for diabetes?', answer: 'Low sugar, high fiber, controlled carbohydrates, and regular meals.' },
  { questionNumber: 17, question: 'What diet is best for high BP?', answer: 'A low-salt diet with fruits, vegetables, and lean protein (DASH diet).' },
  { questionNumber: 18, question: 'What should I eat for high cholesterol?', answer: 'High-fiber foods like oats, nuts, fruits, and fewer fried foods.' },
  { questionNumber: 19, question: 'What diet helps with thyroid issues?', answer: 'Balanced protein, iodine, and selenium; avoid excessive soy.' },
  { questionNumber: 20, question: 'What foods reduce inflammation?', answer: 'Turmeric, berries, nuts, olive oil, and green tea.' },
  { questionNumber: 21, question: 'What should I eat before a workout?', answer: 'A small meal with carbs and protein, like oats or a banana with peanut butter.' },
  { questionNumber: 22, question: 'What should I eat after a workout?', answer: 'Protein plus carbs, like eggs, whey protein, chicken, or smoothies.' },
  { questionNumber: 23, question: 'Is whey protein safe?', answer: 'Yes, for most people; it is a milk-based protein supplement.' },
  { questionNumber: 24, question: 'How to gain muscle naturally?', answer: 'Eat high protein, lift weights, and sleep well.' },
  { questionNumber: 25, question: 'How much protein is too much?', answer: 'More than 2.2 g per kg body weight daily may stress kidneys.' },
  { questionNumber: 26, question: 'What should I eat for acidity?', answer: 'Bananas, coconut water, cucumbers; avoid spicy and fried foods.' },
  { questionNumber: 27, question: 'What should I eat for constipation?', answer: 'Fiber-rich foods, fruits, vegetables, and plenty of water.' },
  { questionNumber: 28, question: 'Why do I feel bloated?', answer: 'Eating too fast, heavy meals, or gas-producing foods.' },
  { questionNumber: 29, question: 'How to improve gut health?', answer: 'Eat probiotics, fiber, hydrate well, and avoid junk food.' },
  { questionNumber: 30, question: 'Are probiotics useful?', answer: 'Yes, they improve digestion and immunity.' },
  { questionNumber: 31, question: 'Is keto diet safe?', answer: 'Short-term yes; long-term may cause nutrient deficiencies.' },
  { questionNumber: 32, question: 'Should I follow gluten-free diet?', answer: 'Only if you are gluten intolerant or have celiac disease.' },
  { questionNumber: 33, question: 'Are vegan diets healthy?', answer: 'Yes, if you ensure protein, B12, iron, and omega-3 intake.' },
  { questionNumber: 34, question: 'What is the Mediterranean diet?', answer: 'A diet rich in vegetables, fruits, olive oil, and fish.' },
  { questionNumber: 35, question: 'Is detox dieting helpful?', answer: 'No strong evidence; the body naturally detoxes.' },
  { questionNumber: 36, question: 'How many meals should I eat daily?', answer: 'Three main meals and one or two healthy snacks.' },
  { questionNumber: 37, question: 'Are snacks healthy?', answer: 'Yes, if you choose nuts, fruits, yogurt, or roasted foods.' },
  { questionNumber: 38, question: 'Is eating late at night harmful?', answer: 'Yes, it may cause indigestion and fat gain.' },
  { questionNumber: 39, question: 'How to stop sugar cravings?', answer: 'Eat enough protein, drink water, and avoid long meal gaps.' },
  { questionNumber: 40, question: 'Is tea or coffee harmful?', answer: 'Not in moderation; limit sugar and cream.' },
  { questionNumber: 41, question: 'Do bananas cause weight gain?', answer: 'No, bananas are healthy and do not cause fat gain by themselves.' },
  { questionNumber: 42, question: 'Is brown rice better than white rice?', answer: 'Brown rice has more fiber, but portion size matters more.' },
  { questionNumber: 43, question: 'Should I avoid dairy?', answer: 'Only if lactose intolerant; otherwise dairy is healthy.' },
  { questionNumber: 44, question: 'Are artificial sweeteners safe?', answer: 'Safe in moderate amounts.' },
  { questionNumber: 45, question: 'Is fruit juice healthy?', answer: 'Less healthy than whole fruits because juice has no fiber.' },
  { questionNumber: 46, question: 'What is the best diet for busy professionals?', answer: 'Simple meals: eggs, fruits, nuts, yogurt, oats, salads, and meal-prepped dishes.' },
  { questionNumber: 47, question: 'What should I eat while traveling?', answer: 'Nuts, fruits, protein bars, sandwiches, and water.' },
  { questionNumber: 48, question: 'How to plan meals for a week?', answer: 'Prepare a list, batch-cook protein, and pre-cut vegetables.' },
  { questionNumber: 49, question: 'How to stay consistent with diet?', answer: 'Keep meals simple, track progress, and avoid extreme dieting.' },
  { questionNumber: 50, question: 'How long to see results?', answer: 'Usually 3-6 weeks with proper diet and discipline.' },
]

async function seedDatabase() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.error('Error: MONGODB_URI environment variable is not set')
    console.error('Please set it in your .env.local file')
    process.exit(1)
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db('diet_faq')
    const collection = db.collection('faqs')

    // Clear existing FAQs
    await collection.deleteMany({})
    console.log('Cleared existing FAQs')

    // Insert all FAQs
    const result = await collection.insertMany(faqs)
    console.log(`Successfully seeded ${result.insertedCount} FAQs`)

    // Verify
    const count = await collection.countDocuments()
    console.log(`Total FAQs in database: ${count}`)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    await client.close()
    console.log('Database connection closed')
  }
}

seedDatabase()

