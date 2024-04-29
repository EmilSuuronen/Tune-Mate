import mongoose, {Document, Types} from 'mongoose';

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

type Tab = Partial<Document & {
    id: Types.ObjectId | string;
    owner: Types.ObjectId;
    tempo: number;
    name: string;
    string1: [string];
    string2: [string];
    string3: [string];
    string4: [string];
    string5: [string];
    string6: [string];
}>

type TabInput = {
    owner: Types.ObjectId;
    tempo: number;
    name: string;
    string1: [string];
    string2: [string];
    string3: [string];
    string4: [string];
    string5: [string];
    string6: [string];
}

type QueryTabByIdInput = Tab

type TabOutput = {
    id: string;
    tempo: number;
    name: string;
    string1: [string];
    string2: [string];
    string3: [string];
    string4: [string];
    string5: [string];
    string6: [string];
}

export {
    User,
    UserOutput,
    UserInput,
    LoginUser,
    TokenContent,
    LoginInput,
    QueryByIdInput,
    Tab,
    QueryTabByIdInput,
    TabInput,
};
