"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/User.js
const mongoose_1 = __importDefault(require("mongoose"));
const users = [];
const userModel = new mongoose_1.default.Schema({
    user_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model('User', userModel);
//# sourceMappingURL=userModel.js.map