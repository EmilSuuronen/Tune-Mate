import mongoose, {Document}  from 'mongoose';

type User = Partial<Document> & {
    user_name: string;
    email: string;
    password: string;
}

export {User}
