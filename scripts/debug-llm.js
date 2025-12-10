const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

async function testLLM() {
    console.log('Testing LLM connection...');

    if (process.env.GEMINI_API_KEY) {
        console.log('Testing Gemini...');
        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
            const result = await model.generateContent('Hello, are you working?');
            const response = await result.response;
            console.log('Gemini Response:', response.text());
        } catch (error) {
            console.error('Gemini Error:', error);
        }
    } else if (process.env.OPENAI_API_KEY) {
        console.log('Testing OpenAI...');
        try {
            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: 'Hello' }],
            });
            console.log('OpenAI Response:', completion.choices[0].message.content);
        } catch (error) {
            console.error('OpenAI Error:', error);
        }
    } else {
        console.error('No API keys found!');
    }
}

testLLM();
