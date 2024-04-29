import mongoose from 'mongoose';
import {Tab} from "../../types/typeDefs";

const TabModel = new mongoose.Schema<Tab>({
    tab_name: {
        type: String,
        required: true,
    },
    tempo: {
        type: String,
        required: true,
    },
    string1: {
        type: [String],
        required: true,
    },
    string2: {
        type: [String],
        required: true,
    },
    string3: {
        type: [String],
        required: true,
    },
    string4: {
        type: [String],
        required: true,
    },
    string5: {
        type: [String],
        required: true,
    },
    string6: {
        type: [String],
        required: true,
    },
});

const NoteModel = mongoose.model("Tab", TabModel);

export default NoteModel;
