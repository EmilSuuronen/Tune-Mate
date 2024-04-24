import {Document, Types} from 'mongoose';

type User = Partial<Document> & {
  id: Types.ObjectId | string;
  user_name: string;
  email: string;
  password: string;
};

type UserOutput = Omit<User, 'password'>;

type UserInput = Omit<User, 'id'>;

type UserTest = Partial<User>;

type LoginUser = Omit<User, 'password'>;

type TokenContent = {
  token: string;
  user: LoginUser;
};

// ***

export {
  User,
  UserOutput,
  UserInput,
  UserTest,
  LoginUser,
  TokenContent,
};
