"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = async (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1];
            const userFromToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!userFromToken) {
                return {};
            }
            const tokenContent = {
                token: token,
                user: userFromToken,
            };
            return { userdata: tokenContent };
        }
        catch (error) {
            return {};
        }
    }
    return {};
};
//# sourceMappingURL=authenticate.js.map