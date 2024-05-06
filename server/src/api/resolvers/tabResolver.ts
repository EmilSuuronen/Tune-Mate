import tabModel from "../models/tabModel";
import {Tab} from "../../types/typeDefs";
import {TabByOwnerInput, TabInput, TabByIdInput} from '../../types/typeDefs';
import {Types} from "mongoose";

export default {
    Query: {
        tabs: async () => {
            return tabModel.find();
        },
        findTabsByOwner: async (_parent: undefined, args: {input: TabByOwnerInput}) => {
            console.log("Received args: ", JSON.stringify(args));
            const ownerId = args.input.input;
            const tabs = await tabModel.find({ owner: ownerId });
            console.log("Found tabs: ", JSON.stringify(tabs));
            if (!tabs.length) {
                throw new Error('No tabs found yet!');
            }
            return tabs;
        },
        findTabById: async (_parent: undefined, args: {input: TabByIdInput}) => {
            console.log("Received args: ", JSON.stringify(args));
            const tab = await tabModel.findById(args.input.id);
            if (!tab) {
                throw new Error('No tabs found yet!');
            }
            return tab;
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
        modifyTab: async (
            _parent: undefined,
            args: { id: string, input: TabInput },
        ): Promise<Tab | null> => {
            console.log("args.id: ",args.id)
            console.log("args.input: ", args.input)
            const updatedTab = await tabModel.findByIdAndUpdate(
                args.id,
                {
                    $set: {
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
                },
                { new: true }
            );
            if (!updatedTab) {
                throw new Error("No tab found with the given ID");
            }
            return updatedTab;
        },
    }
}
