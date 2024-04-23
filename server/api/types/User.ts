import {Document, Types} from "mongoose";

type User = Partial<Document> & {
    id: Types.ObjectId | string;
    user_name: string;
    password: string;
};

type UserInput = Partial<User>;

export {
    User,
    UserInput
}
