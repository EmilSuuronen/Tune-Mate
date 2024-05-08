import {GraphQLError} from 'graphql';
import {User, UserInput, LoginInput, QueryByIdInput, TabInput, Tab, UserModifyInput} from '../../types/typeDefs';
import userModel from "../models/userModel";
import bcrypt from 'bcrypt';
import tabModel from "../models/tabModel";
const jwt = require('jsonwebtoken');
require('dotenv').config();

export default {
    Query: {
        users: async () => {
            return userModel.find();
        },
        user: async (
            _parent: undefined,
            args: { input: QueryByIdInput}
        ) => {
            const user = await userModel.findById(args.input.id);
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
        },
        modifyUser: async (
            _parent: undefined,
            args: { id: string, input: UserModifyInput },
        ): Promise<User | null> => {
            const hashedPassword = await bcrypt.hash(args.input.password, 10);
            const updatedUser = await userModel.findByIdAndUpdate(
                args.id,
                {
                    $set: {
                        user_name: args.input.user_name,
                        email: args.input.email,
                        password: hashedPassword
                    }
                },
                { new: true }
            );
            if (!updatedUser) {
                throw new GraphQLError("No user found with the given ID");
            }
            return updatedUser;
        },
    }
};
