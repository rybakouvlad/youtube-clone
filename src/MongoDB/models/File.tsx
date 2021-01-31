import { model, Schema, Document } from 'mongoose';
import { IUser } from './Users';

export interface IFile extends Document {
  name: string;
  size: number;
  //   date: string;
  path: string;
  date: Date;
  user: IUser | string;
}

const File = new Schema({
  name: { type: String, required: true },
  //   accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: '' },
  date: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const FileModel = model<IFile>('File', File);

export default FileModel;
