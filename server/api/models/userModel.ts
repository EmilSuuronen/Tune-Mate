// models/User.js
import mongoose from 'mongoose';
import {User} from "../types/User";

const users = [];

const userModel = new mongoose.Schema<User>({
    password: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
});
export default mongoose.model<User>('User', userModel);
