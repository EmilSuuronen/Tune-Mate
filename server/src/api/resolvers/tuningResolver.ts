import {Tuning, TuningByOwnerInput, TuningInput} from "../../types/typeDefs";
import tuningModel from "../models/tuningModel";

export default {
    Query: {
        findTuningsByOwner: async (_parent: undefined, args: {input: TuningByOwnerInput}) => {
            console.log("Received args: ", JSON.stringify(args.input.id));
            const ownerId = args.input.id;
            const tunings = await tuningModel.find({ owner: ownerId });
            console.log("Found tunings: ", JSON.stringify(tunings));
            if (!tunings.length) {
                throw new Error('No tunings found yet!');
            }
            return tunings;
        },
    },
    Mutation: {
        createTuning: async (
            _parent: undefined,
            args: { input: TuningInput },
        ): Promise<Tuning | Error> => {
            try {
                console.log(args.input)
                const newTuning = await tuningModel.create({
                    name: args.input.name,
                    string_count: args.input.string_count,
                    string_notes: args.input.string_notes,
                    owner: args.input.owner,
                });
                console.log('Tuning created successfully:', newTuning);
                return newTuning;
            } catch (error: any) {
                console.error('Error creating tuning:', error);

                if (error.name === 'ValidationError') {
                    console.error('Validation error:', error.message);
                    throw new Error('Input validation failed. Please check your data.');
                } else {
                    throw new Error('Failed to create tuning. Please try again later.');
                }
            }
        },
        modifyTuning: async (
            _parent: undefined,
            args: { id: string, input: TuningInput },
        ): Promise<Tuning | null> => {
            console.log("args.id: ",args.id)
            console.log("args.input: ", args.input)
            const updatedTuning = await tuningModel.findByIdAndUpdate(
                args.id,
                {
                    $set: {
                        name: args.input.name,
                        string_count: args.input.string_count,
                        string_notes: args.input.string_notes,
                        owner: args.input.owner,
                    }
                },
                { new: true }
            );
            if (!updatedTuning) {
                throw new Error("No tuning found with the given ID");
            }
            return updatedTuning;
        },
        deleteTuning: async (
            _parent: undefined,
            args: { id: string },
        ): Promise<Tuning | null> => {
            const deletedTuning = await tuningModel.findByIdAndDelete(args.id);
            if (!deletedTuning) {
                throw new Error("No tab found with the given ID");
            }
            return deletedTuning;
        }
    }
}
