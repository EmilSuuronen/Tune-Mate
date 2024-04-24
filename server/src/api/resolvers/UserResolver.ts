import {GraphQLError} from 'graphql';
import {User, UserInput, LoginInput} from '../../types/typeDefs';
import userModel from "../models/userModel";
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
require('dotenv').config();

export default {
    Query: {
        users: async () => {
            return userModel.find();
        },
        user: async (
            _parent: undefined,
            args: { id: string }
        ) => {
            const user = await userModel.findById(args.id);
            if (!user) {
                throw new GraphQLError('User not found');
            }
            return user;
        }
    },

    Mutation: {
        createUser: async (
            _parent: undefined,
            args: { input: UserInput },
        ): Promise<User> => {
            const hashedPassword = await bcrypt.hash(args.input.password, 10);
            return await userModel.create(
                {
                    user_name: args.input.user_name,
                    email: args.input.email,
                    password: hashedPassword
                }
            );
        },
        loginUser: async (
            _parent: undefined,
            args: { input: LoginInput }) => {
            const user = await userModel.findOne({ user_name: args.input.user_name});
            if (!user) {
                throw new GraphQLError('User not found');
            }
            const valid = await bcrypt.compare(args.input.password, user.password);
            if (!valid) {
                throw new GraphQLError('Invalid password');
            }
            const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET);
            return {
                token,
                user
            };
        }
    }
};
