import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const uri: string = process.env.MONGODB_URI
let client: MongoClient
let clientPromise: Promise<MongoClient>

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   let globalWithMongo = global as typeof globalThis & {
//     _mongoClientPromise?: Promise<MongoClient>
//   }

//   if (!globalWithMongo._mongoClientPromise) {
//     client = new MongoClient(uri, {
//       tls: true,
//       tlsAllowInvalidCertificates: true,
//       family: 4,
//     })
//     globalWithMongo._mongoClientPromise = client.connect()
//   }
//   clientPromise = globalWithMongo._mongoClientPromise
// } else {
// In production mode, it's best to not use a global variable.
console.log('Creating NEW MongoClient (Caching Disabled for Debugging)');
console.log('URI:', uri.substring(0, 20) + '...');
client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: true,
  family: 4,
})
clientPromise = client.connect()
  .then(c => {
    console.log('Successfully connected to MongoDB in App!');
    return c;
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB in App:', err);
    throw err;
  });
// }

export default clientPromise


