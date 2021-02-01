import { model, Schema, Document } from 'mongoose';
import { IUser } from './Users';

export interface IStream extends Document {
  title?: string;
  key: string;
  user: IUser | string;
}

const Stream = new Schema({
  title: { type: String, required: true },
  key: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const StreamModel = model<IStream>('Stream', Stream);

export default StreamModel;
