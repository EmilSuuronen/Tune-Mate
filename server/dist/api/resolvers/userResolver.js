"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../types/User");
exports.default = {
    Query: {
        users: async () => {
            return await User_1.User.findAll();
        },
        user: async (_, args) => {
            return await User_1.User.findByPk(args.id);
        },
    },
    Mutation: {
        createUser: async (_, args) => {
            return await User_1.User.create(args.userName, args.password);
        },
        loginUser: async (_, args) => {
            const isValid = await User_1.User.validatePassword(args.userName, args.password);
            if (isValid) {
                return "Token_or_Something"; // Ideally, return a JWT or similar token
            }
            throw new Error('Invalid credentials');
        }
    }
};
//# sourceMappingURL=userResolver.js.map