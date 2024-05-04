import tabModel from "../models/tabModel";
import {QueryByIdInput, Tab} from "../../types/typeDefs";
import {GraphQLError} from "graphql";
import {QueryTabByIdInput, TabInput} from '../../types/typeDefs';
import mongoose from "mongoose";

export default {
    Query: {
        tabs: async () => {
            return tabModel.find();
        },
    },
    Mutation: {
        createTab: async (
            _parent: undefined,
            args: { input: TabInput },
        ): Promise<Tab> => {
            return await tabModel.create(
                {
                    tempo: args.input.tempo,
                    name: args.input.name,
                    string1: args.input.string1,
                    string2: args.input.string2,
                    string3: args.input.string3,
                    string4: args.input.string4,
                    string5: args.input.string5,
                    string6: args.input.string6,
                    owner: args.input.owner,
                }
            );
        },
    }
}
