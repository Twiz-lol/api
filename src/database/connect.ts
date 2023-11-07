import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const url: string = process.env.MONGODB || '';

function connectToDatabase(): void {
  try {
    const options = {
      autoIndex: true,
    };

    mongoose.connect(url, options);

    console.log("[Mongodb] connected.");
  } catch (error) {
    console.error("Mongoose connection error:", error);
  }
}

connectToDatabase();
