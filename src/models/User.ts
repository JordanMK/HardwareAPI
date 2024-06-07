import mongoose, { Model, Schema } from 'mongoose';
import { IUser, IUserMethods, UserRole } from '../types/models';
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
		enum: [UserRole.USER, UserRole.USER],
		required: true,
	},
	refreshToken: {
		type: String,
	},
});

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{ id: this.id, role: this.role },
		process.env.ACCESS_TOKEN_SECRET as string,
		{
			expiresIn: '7d',
		}
	);
};

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{ id: this.id, role: this.role },
		process.env.REFRESH_TOKEN_SECRET as string,
		{
			expiresIn: '14d',
		}
	);
};

export default mongoose.model<IUser, UserModel>('User', userSchema);
