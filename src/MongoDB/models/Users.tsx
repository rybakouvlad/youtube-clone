import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      require: 'Email address is required',
      validate: [validator.isEmail, 'Invalid email'],
      unique: true,
    },
    // avatar: String,
    firstName: String,
    lastName: String,
    password: String,
    // password: String,
    // confimed: Boolean,
    // confirm_hash: String,
    // last_seen: Date,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>('Urer', UserSchema);

export default User;
