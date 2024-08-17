import { MongoClient } from 'mongodb'

// Connection URL
export const url = process.env.MONGO_URL
const client = new MongoClient(url);

// Database Name
const dbName = 'TodoDemo';

export async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server 🎉🎉🎉');
  const db = client.db(dbName); 

  // the following code examples can be pasted here...

  return db;
}

