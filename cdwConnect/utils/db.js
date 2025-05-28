import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { dbLogger } from '../logger/index.js';

dotenv.config();

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
    throw new Error('DB_URI is not defined in environment variables')
};
if (!dbName) {
    throw new Error('DB_NAME is not defined in environment variables');
}

const client = new MongoClient(uri);

let db;

export const connectDB = async () => {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }
    db = client.db(dbName);
    dbLogger.info(`MongoDB connected to database: ${dbName}`);
  } catch (error) {
    dbLogger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    dbLogger.error('Database not connected but getDB called.')
    throw new Error('Database not connected. Call connectDB first.');
  }
  return db;
};
