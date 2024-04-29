import tabModel from "../models/tabModel";
import {QueryByIdInput, Tab} from "../../types/typeDefs";
import {GraphQLError} from "graphql";
import {User, UserInput, LoginInput, QueryTabByIdInput, TabInput} from '../../types/typeDefs';
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    Query: {
        tabs: async () => {
            return tabModel.find();
        },
        tab: async (
            _parent: undefined,
            args: { input: QueryTabByIdInput}
        ) => {
            const tab = await tabModel.findById(args.input.id);
            if (!tab) {
                throw new GraphQLError('User not found');
            }
            return tab;
        }
    },
    Mutation: {
        createTab: async (
            _parent: undefined,
            args: { input: TabInput },
        ): Promise<Tab> => {
            return await tabModel.create(
                {
                    tempo: args.input.tempo,
                    tab_name: args.input.tab_name,
                    string1: args.input.string1,
                    string2: args.input.string2,
                    string3: args.input.string3,
                    string4: args.input.string4,
                    string5: args.input.string5,
                    string6: args.input.string6,
                }
            );
        },
    }
}
