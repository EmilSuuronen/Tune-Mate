import {GraphQLError} from 'graphql';
import {LoginUser, User, UserInput} from '../../types/typeDefs';
import fetchData from '../../functions/fetchData';
import {LoginResponse, UserResponse} from '../../types/MessageTypes';
import {MyContext} from '../../types/MyContext';
import userModel from "../models/userModel";

export default {
  Query: {
    users: async () => {
      return userModel.find();
    },
    userById: async (_parent: undefined, args: {id: string}) => {
        return userModel.findById(args.id);
    },
    checkToken: async (
      _parent: undefined,
      _args: undefined,
      context: MyContext,
    ) => {
      const response = {
        message: 'Token is valid',
        user: context.userdata,
      };
      return response;
    },
  },
  Mutation: {
    createUser: async (
        _parent: undefined,
        args: {username: String, email: String, password: String},
        ): Promise<User> => {
      return userModel.create({
          user_name: args.username,
          email: args.email,
          password: args.password,
        });
    },
    login: async (
      _parent: undefined,
      args: {credentials: {email: string; password: string}},
    ): Promise<LoginResponse & {token: string; user: LoginUser}> => {
      if (!process.env.AUTH_URL) {
        throw new GraphQLError('No auth url set in .env file');
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args.credentials),
      };
      const loginResponse = await fetchData<
        LoginResponse & {token: string; user: LoginUser}
      >(process.env.AUTH_URL + '/auth/login', options);
      loginResponse.user.id = loginResponse.user._id;
      return loginResponse;
    },
    updateUser: async (
      _parent: undefined,
      args: {user: UserInput},
      context: MyContext,
    ): Promise<UserResponse> => {
      if (!context.userdata) {
        throw new GraphQLError('User not authenticated', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      const options = {
        method: 'PUT',
        headers: {
          'CONTENT-TYPE': 'application/json',
          Authorization: 'Bearer ' + context.userdata.token,
        },
        body: JSON.stringify(args.user),
      };
      const user = await fetchData<UserResponse>(
        process.env.AUTH_URL + '/users',
        options,
      );
      return user;
    },
    deleteUser: async (
      _parent: undefined,
      _args: undefined,
      context: MyContext,
    ): Promise<UserResponse> => {
      if (!context.userdata) {
        throw new GraphQLError('User not authenticated', {
          extensions: {code: 'UNAUTHENTICATED'},
        });
      }
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + context.userdata.token,
        },
      };
      const user = await fetchData<UserResponse>(
        process.env.AUTH_URL + '/users',
        options,
      );
      return user;
    },
  },
};
