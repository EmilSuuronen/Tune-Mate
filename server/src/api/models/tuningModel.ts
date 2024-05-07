import mongoose from 'mongoose';
import {Tuning, User} from "../../types/typeDefs";

const TuningModel = new mongoose.Schema<Tuning>({
    name: {
        type: String,
        required: true,
    },
    string_count: {
        type: Number,
        required: true,
    },
    string_notes: {
        type: [String],
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

export default mongoose.model<Tuning>('Tuning', TuningModel);
