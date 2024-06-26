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

type UserModifyInput = Partial<Document> &{
    user_name: string;
    email: string;
    password: string;
}

type TokenContent = {
    id: Types.ObjectId | string;
    user_name: string;
    email: string;
    password: string;
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
    owner: Types.ObjectId | string;
    tempo: number;
    name: string;
    string1: [string];
    string2: [string];
    string3: [string];
    string4: [string];
    string5: [string];
    string6: [string];
}

type TabByOwnerInput = {
    input: Types.ObjectId | string;
}

type TabByIdInput = {
    id: Types.ObjectId | string;
}

type Tuning = Partial<Document & {
    id: Types.ObjectId | string;
    name: string;
    string_count: number;
    string_notes: [string];
    owner: Types.ObjectId;
}>

type TuningInput = {
    name: string;
    string_count: number;
    string_notes: [string];
    owner: Types.ObjectId;
}

type TuningByOwnerInput = {
    id: Types.ObjectId | string;
}

type TuningByIdInput = {
    id: Types.ObjectId | string;
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
    TabByOwnerInput,
    TabInput,
    TabByIdInput,
    Tuning,
    TuningInput,
    TuningByOwnerInput,
    TuningByIdInput,
    UserModifyInput,
};
