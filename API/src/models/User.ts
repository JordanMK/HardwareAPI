import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/models';

const userSchema = new Schema<IUser>({
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

export default mongoose.model('User', userSchema);
