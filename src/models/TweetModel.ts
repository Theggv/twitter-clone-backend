import { Schema, model, Document } from 'mongoose';

export interface ITweetModel {
	createdAtUTC?: Date;
	user: string;

	text: string;
	attachments?: string[];

	replies?: string[];
	likes?: string[];
	retweets?: string[];
}

export type ITweetModelDocument = ITweetModel & Document;

const TweetSchema = new Schema({
	createdAtUTC: {
		type: Date,
		default: Date.now,
	},
	user: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	text: {
		required: true,
		type: String,
	},
	attachments: {
		type: [String],
		default: [],
	},
	replies: {
		type: [Schema.Types.ObjectId],
		default: [],
	},
	likes: {
		type: [Schema.Types.ObjectId],
		default: [],
	},
	retweets: {
		type: [Schema.Types.ObjectId],
		ref: 'User',
		default: [],
	},
});

export const TweetModel = model<ITweetModelDocument>('Tweet', TweetSchema);
