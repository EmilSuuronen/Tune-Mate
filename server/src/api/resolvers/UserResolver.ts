import {GraphQLError} from 'graphql';
import {User, UserInput} from '../../types/typeDefs';
import userModel from "../models/userModel";
import bcrypt from 'bcrypt';

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
        }
    }
};
