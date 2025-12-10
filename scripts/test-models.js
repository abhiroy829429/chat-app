const { GoogleGenerativeAI } = require("@google/generative-ai");
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

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // There isn't a direct "listModels" in the high-level SDK easily accessible in all versions,
        // but we can try to use the model we think exists and see if it works, or try a known older one.
        // Actually, let's just try to generate content with 'gemini-pro' which is usually standard.
        console.log("Trying gemini-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-pro:", result.response.text());
    } catch (error) {
        console.error("Error with gemini-pro:", error.message);
    }

    try {
        console.log("Trying gemini-1.5-flash-latest...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash-latest:", result.response.text());
    } catch (error) {
        console.error("Error with gemini-1.5-flash-latest:", error.message);
    }
}

listModels();
