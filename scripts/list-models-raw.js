const https = require('https');
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

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log('Fetching models from:', url.replace(apiKey, 'HIDDEN_KEY'));

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.error) {
                console.error('API Error:', json.error);
            } else {
                console.log('Available Models:');
                if (json.models) {
                    json.models.forEach(m => {
                        if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
                            console.log(`- ${m.name}`);
                        }
                    });
                } else {
                    console.log('No models found in response:', json);
                }
            }
        } catch (e) {
            console.error('Parse Error:', e);
            console.log('Raw Data:', data);
        }
    });
}).on('error', (e) => {
    console.error('Request Error:', e);
});
