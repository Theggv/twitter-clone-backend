import { Schema, model, Document } from 'mongoose';

export interface IUserModel {
	email: string;
	fullname: string;
	username: string;
	password: string;
	confirmHash: string;
	confirmed?: boolean;

	avatarUrl?: string;
	location?: string;
	about?: string;
	website?: string;
	verified?: boolean;
}

export type IUserModelDocument = IUserModel & Document;

const UserSchema = new Schema({
	email: {
		unique: true,
		required: true,
		type: String,
	},
	fullname: {
		required: true,
		type: String,
	},
	username: {
		unique: true,
		required: true,
		type: String,
	},
	password: {
		required: true,
		type: String,
	},
	confirmHash: {
		required: true,
		type: String,
	},
	confirmed: {
		type: Boolean,
		default: false,
	},
	verified: {
		type: Boolean,
		default: false,
	},
	avatarUrl: String,
	location: String,
	about: String,
	website: String,
});

UserSchema.set('toJSON', {
	transform: function (_: any, obj: any) {
		delete obj.password;
		delete obj.confirmHash;
		return obj;
	},
});

export const UserModel = model<IUserModelDocument>('User', UserSchema);
