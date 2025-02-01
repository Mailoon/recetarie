import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected DB-> (OK)');
  } catch (error) {
    console.error('Connection DB error:', error);
    process.exit(1);
  }
};

export { connectDB };