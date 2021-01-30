import { model, Schema, Document } from 'mongoose';
import { IUser } from './Users';
import {IFile} from "./File";

export interface IComment extends Document {
  text: string;
  video: IFile;
  user: IUser | string;
  date: Date;
}

const Comment = new Schema({
  text: { type: String, required: true },
  video: { type: Schema.Types.ObjectId, ref: 'File' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now() },
});

const CommentModel = model<IComment>('Comment', Comment);

export default CommentModel;
