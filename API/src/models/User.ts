import mongoose, { Model, Schema } from 'mongoose';
import { IUser, IUserMethods } from '../types/models';
import jwt from 'jsonwebtoken';

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
	username: {
		type: String,
		uique: true,
		minLength: 5,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		required: true,
	},
});

userSchema.methods.generateAccessToken = function () {
	return jwt.sign({ id: this.id }, process.env.ACCESS_TOKEN_SECRET as string, {
		expiresIn: '1m',
	});
};

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign({ id: this.id }, process.env.REFRESH_TOKEN_SECRET as string, {
		expiresIn: '1m',
	});
};

export default mongoose.model<IUser, UserModel>('User', userSchema);
