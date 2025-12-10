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

async function testConnection(options, name) {
    const uri = process.env.MONGODB_URI;
    console.log(`\n--- Testing Configuration: ${name} ---`);
    console.log('Options:', JSON.stringify(options, null, 2));

    const client = new MongoClient(uri, options);

    try {
        console.log('Connecting...');
        await client.connect();
        console.log('SUCCESS: Connected!');
        await client.db('admin').command({ ping: 1 });
        console.log('SUCCESS: Pinged admin db!');
        await client.close();
        return true;
    } catch (error) {
        console.error('FAILED:', error.message);
        return false;
    }
}

async function runTests() {
    // Test 1: Standard with loose SSL
    await testConnection({
        tls: true,
        tlsAllowInvalidCertificates: true,
        connectTimeoutMS: 5000,
    }, 'Standard Loose SSL');

    // Test 2: No explicit TLS (rely on SRV)
    await testConnection({
        tlsAllowInvalidCertificates: true,
        connectTimeoutMS: 5000,
    }, 'Implicit TLS (SRV)');

    // Test 3: Force TLS 1.2

    // Test 4: IPv4 Family
    await testConnection({
        tls: true,
        tlsAllowInvalidCertificates: true,
        family: 4,
        connectTimeoutMS: 5000,
    }, 'IPv4 Forced');
    // Test 5: Direct Shard Connection
    const shardUri = 'mongodb://abhiroy829429_db_user:XfjArjZbXDikAVQo@ac-j5vlzpb-shard-00-00.sres5dz.mongodb.net:27017/?ssl=true&replicaSet=atlas-2hbsua-shard-0&authSource=admin&retryWrites=true&w=majority';
    await testConnection({
        tls: true,
        tlsAllowInvalidCertificates: true,
        connectTimeoutMS: 5000,
    }, 'Direct Shard Connection');
}

runTests();
