import { model, Schema, Document } from 'mongoose';
import { IUser } from './Users';
import { IFile } from './File';

export interface IComment extends Document {
  text: string;
  video: IFile | string;
  user: IUser | string;
  login: string;
  date: Date;
}

const Comment = new Schema({
  text: { type: String, required: true },
  video: { type: Schema.Types.ObjectId, ref: 'File' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  login: { type: String },
  date: { type: Date, default: Date.now() },
});

const CommentModel = model<IComment>('Comment', Comment);

export default CommentModel;
