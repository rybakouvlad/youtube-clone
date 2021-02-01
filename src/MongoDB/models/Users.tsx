import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  email: string;
  password: string;
  login: string;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      require: 'Email address is required',
      validate: [validator.isEmail, 'Invalid email'],
      unique: true,
    },
    password: String,
    login: String,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>('Users', UserSchema);

export default User;
