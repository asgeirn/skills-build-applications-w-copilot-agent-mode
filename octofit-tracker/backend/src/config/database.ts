import mongoose from 'mongoose';

export const mongoConnectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectToDatabase() {
  await mongoose.connect(mongoConnectionString);
  console.log('Connected to octofit_db');
}

export async function disconnectFromDatabase() {
  await mongoose.disconnect();
}