import mongoose from 'mongoose';
import {User} from "../../types/typeDefs";

const UserModel = new mongoose.Schema<User>({
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<User>('User', UserModel);
