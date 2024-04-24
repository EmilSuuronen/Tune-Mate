"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectToMongo = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI not found from .env');
        }
        const databaseConnection = await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${databaseConnection.connection.host}`);
        return databaseConnection;
    }
    catch (error) {
        console.log(`Error: connection to mongodb failed, ${error}`);
    }
};
exports.default = connectToMongo;
//# sourceMappingURL=mongoosedb.js.map