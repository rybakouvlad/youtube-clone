import { model, Schema, Document } from 'mongoose';
import { IUser } from './Users';

export interface IComment extends Document {
  text: string;
  user: IUser | string;
  date: Date;
}

const Comment = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date },
});

const CommentModel = model<IComment>('Comment', Comment);

export default CommentModel;
