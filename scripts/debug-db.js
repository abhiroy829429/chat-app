const { MongoClient } = require('mongodb');
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

async function testConnection() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('MONGODB_URI not found in .env.local');
        return;
    }

    console.log('Testing MongoDB connection...');
    console.log('URI starts with:', uri.substring(0, 15) + '...');

    try {
        const client = new MongoClient(uri, {
            tls: true,
            tlsAllowInvalidCertificates: true,
        });
        await client.connect();
        console.log('Successfully connected to MongoDB!');
        await client.close();
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

testConnection();
