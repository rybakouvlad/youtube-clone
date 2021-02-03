import { model, Schema, Document } from 'mongoose';
import { IUser } from './Users';

export interface IStream extends Document {
  title?: string | string[];
  key: string;
  user: IUser | string;
  lastId?: string;
}

const Stream = new Schema(
  {
    title: { type: String },
    key: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    lastId: { type: String },
  },
  {
    timestamps: true,
  },
);

const StreamModel = model<IStream>('Stream', Stream);

export default StreamModel;
