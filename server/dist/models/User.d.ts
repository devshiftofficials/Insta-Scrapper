import mongoose, { Document } from 'mongoose';
export interface IUserDocument extends Document {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    role: 'user' | 'admin' | 'premium';
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
    preferences: {
        niches: string[];
        notifications: boolean;
        emailUpdates: boolean;
    };
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, {}> & IUserDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map