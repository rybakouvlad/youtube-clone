import { model, Schema, Document } from 'mongoose';
import { IUser } from './Users';

export interface IFile extends Document {
  name: string;
  size?: number;
  path: string;
  date: Date;
  user: IUser | string;
  title?: string;
}

const File = new Schema(
  {
    name: { type: String, required: true },
    size: { type: Number, default: 0 },
    path: { type: String, default: '' },
    date: { type: Date, default: Date.now() },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, default: 'Some title' },
  },
  {
    timestamps: true,
  },
);

const FileModel = model<IFile>('File', File);

export default FileModel;
