const { GoogleGenerativeAI } = require('@google/generative-ai');
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

async function listModels() {
    if (!process.env.GEMINI_API_KEY) {
        console.error('GEMINI_API_KEY not found');
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // There isn't a direct listModels method on the client instance in some versions,
        // but let's try to infer or use a different approach if needed.
        // Actually, the error message suggested: "Call ListModels to see the list of available models"
        // This usually implies using the REST API or a specific method on the SDK if available.
        // In the Node SDK, it might be under a manager or similar.
        // Let's try a simple generation with a known very old model or just try to find the method.
        // Since I can't easily browse docs, I'll try to use the model 'gemini-1.0-pro' which might be the stable one.

        // Alternatively, I can try to fetch the models list via REST API using fetch if the SDK doesn't expose it easily.
        const apiKey = process.env.GEMINI_API_KEY;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log('Available models:');
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log('Could not list models:', data);
        }

    } catch (error) {
        console.error('Error listing models:', error);
    }
}

listModels();
