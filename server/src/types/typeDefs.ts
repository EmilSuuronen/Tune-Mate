import {Document, Types} from 'mongoose';

type User = Partial<Document> & {
    id: Types.ObjectId | string;
    user_name: string;
    email: string;
    password: string;
};

type UserOutput = Omit<User, 'password'>;

type UserInput = Omit<User, 'id'>;

type LoginInput = Omit<User, 'email'>

type LoginUser = Omit<User, 'password'>;

type QueryByIdInput = Omit<User, 'password'>

type TokenContent = {
    token: string;
    user: LoginUser;
};

// tablature definitions
type Note = Partial<Document> & {
    string: string;
    position: number;
    fret: number;
};
type Tablature = Partial<Document> & {
    id: Types.ObjectId | string;
    tablature_name: string;
    tempo: string;
    Notes: [Note];
};

export {
    User,
    UserOutput,
    UserInput,
    LoginUser,
    TokenContent,
    LoginInput,
    QueryByIdInput
};
