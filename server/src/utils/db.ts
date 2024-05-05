import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoConnect = async () => {
  mongoose.connect(process.env.MONGO_URI as string, {
    connectTimeoutMS: 30000, // Extend connection timeout to 30 seconds
    socketTimeoutMS: 45000, // Extend socket timeout
    ssl: true,
  }).then(() => console.log('MongoDB connected successfully'))
      .catch(err => console.error('MongoDB connection error:', err));
};

export default mongoConnect;
