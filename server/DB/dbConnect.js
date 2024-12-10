import mongoose from 'mongoose';

import dotenv from 'dotenv';

mongoose.Promise = global.Promise;

dotenv.config();
const dbUrl = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDb;
