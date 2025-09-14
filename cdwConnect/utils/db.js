import mongoose from 'mongoose';
import { dbLogger } from '../logger/index.js';


// Inititalization for Mongo DB connection 
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: process.env.DB_NAME
    });
    dbLogger.info(' MongoDB connected');
  } catch (err) {
    dbLogger.error(' MongoDB connection error:', err);
    process.exit(1);
  }
};