import Joi from 'joi';
import { IUser } from '../../types/models';

const userSchema = Joi.object<IUser>({
	username: Joi.string().min(6).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

export default { userSchema };
