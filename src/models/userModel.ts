import mongoose, { Schema, Document } from 'mongoose';
import { randomBytes, pbkdf2Sync } from 'crypto';

export interface IUserName {
	firstName: string;
	lastName: string;
}

export interface IUser {
	email: string;
	salt: string;
	hash: string;
	name: IUserName;
	age: number;
}

export interface IUserModel extends IUser, Document {
	setPassword(password: string): void;
	validPassword(password: string): boolean;
}

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	hash: {
		type: String,
		required: true
	},
	name: {
		firstName: { type: String, default: undefined },
		lastName: { type: String, default: undefined }
	},
	age: { type: String, default: undefined }
});

UserSchema.methods.setPassword = function(password: string) {
	this.salt = randomBytes(21).toString('hex');
	this.hash = pbkdf2Sync(password, this.salt, 99, 64, `sha512`).toString(
		`hex`
	);
	console.log(this.salt);
};

UserSchema.methods.validPassword = function(password: string) {
	const hashPassword = pbkdf2Sync(
		password,
		//FIXME: use secret env variable
		password,
		48,
		64,
		`sha512`
	).toString(`hex`);
	const hash = pbkdf2Sync(hashPassword, this.salt, 99, 64, `sha512`).toString(
		`hex`
	);
	return this.hash === hash;
};

export default mongoose.model<IUserModel>('User', UserSchema);
