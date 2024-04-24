import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoConnect = async () => {
  console.log("Database connection established")
  return await mongoose.connect(process.env.MONGO_URI as string);
};

export default mongoConnect;
