import { Schema, model, Document } from 'mongoose';

export interface ITweetModel {
	text: string;
	user: string;
}

export type ITweetModelDocument = ITweetModel & Document;

const TweetSchema = new Schema({
	text: {
		required: true,
		type: String,
	},
	user: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

export const TweetModel = model<ITweetModelDocument>('Tweet', TweetSchema);
