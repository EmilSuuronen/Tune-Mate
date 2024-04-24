import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToMongo = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI not found from .env');
        }
        const databaseConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${databaseConnection.connection.host}`);
        return databaseConnection;
    } catch (error) {
        console.log(`Error: connection to mongodb failed, ${error}`);
    }
}

export default connectToMongo;
