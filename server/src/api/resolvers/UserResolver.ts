import {GraphQLError} from 'graphql';
import {User, UserInput} from '../../types/typeDefs';
import userModel from "../models/userModel";


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
            return await userModel.create(
                {
                    user_name: args.input.user_name,
                    email: args.input.email,
                    password: args.input.password
                }
            );
        }
    }
};
