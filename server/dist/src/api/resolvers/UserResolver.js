"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const fetchData_1 = __importDefault(require("../../functions/fetchData"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.default = {
    Query: {
        users: async () => {
            return userModel_1.default.find();
        },
        userById: async (_parent, args) => {
            return userModel_1.default.findById(args.id);
        },
        checkToken: async (_parent, _args, context) => {
            const response = {
                message: 'Token is valid',
                user: context.userdata,
            };
            return response;
        },
    },
    Mutation: {
        createUser: async (_parent, args) => {
            return userModel_1.default.create({
                user_name: args.username,
                email: args.email,
                password: args.password,
            });
        },
        login: async (_parent, args) => {
            if (!process.env.AUTH_URL) {
                throw new graphql_1.GraphQLError('No auth url set in .env file');
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(args.credentials),
            };
            const loginResponse = await (0, fetchData_1.default)(process.env.AUTH_URL + '/auth/login', options);
            loginResponse.user.id = loginResponse.user._id;
            return loginResponse;
        },
        updateUser: async (_parent, args, context) => {
            if (!context.userdata) {
                throw new graphql_1.GraphQLError('User not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
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
            const user = await (0, fetchData_1.default)(process.env.AUTH_URL + '/users', options);
            return user;
        },
        deleteUser: async (_parent, _args, context) => {
            if (!context.userdata) {
                throw new graphql_1.GraphQLError('User not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }
            const options = {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + context.userdata.token,
                },
            };
            const user = await (0, fetchData_1.default)(process.env.AUTH_URL + '/users', options);
            return user;
        },
    },
};
//# sourceMappingURL=UserResolver.js.map