import { MongoClient } from 'mongodb';

let client;
let databasePromise;

export async function connectDatabase() {
  if (!databasePromise) {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is required. Set it in server/.env.');
    }

    client = new MongoClient(mongoUri);
    databasePromise = client.connect()
      .then(() => client.db('Myweb'))
      .catch((error) => {
        databasePromise = undefined;
        throw error;
      });
  }

  return databasePromise;
}

export async function getUsersCollection() {
  const database = await connectDatabase();
  const users = database.collection('users');
  await users.createIndex({ email: 1 }, { unique: true });
  return users;
}
