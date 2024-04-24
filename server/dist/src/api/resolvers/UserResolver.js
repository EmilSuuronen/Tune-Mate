"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = {
    Query: {
        users: async () => {
            return userModel_1.default.find();
        },
        user: async (_parent, args) => {
            const user = await userModel_1.default.findById(args.id);
            if (!user) {
                throw new graphql_1.GraphQLError('User not found');
            }
            return user;
        }
    },
    Mutation: {
        createUser: async (_parent, args) => {
            const hashedPassword = await bcrypt_1.default.hash(args.input.password, 10);
            return await userModel_1.default.create({
                user_name: args.input.user_name,
                email: args.input.email,
                password: hashedPassword
            });
        }
    }
};
//# sourceMappingURL=UserResolver.js.map