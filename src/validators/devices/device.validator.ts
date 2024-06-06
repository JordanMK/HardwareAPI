import Joi from 'joi';
import { DeviceType, IDevice } from '../../types/models';
import makeOptional from '../makeOptional';

const deviceCreateSchema = Joi.object<IDevice>({
	brand: Joi.string().required(),
	name: Joi.string().required(),
	images: Joi.array().items(Joi.string()).single(),
});

const deviceQuerySchema: Joi.ObjectSchema<IDevice> = makeOptional(
	deviceCreateSchema
).append({
	id: Joi.string(),
	deviceType: Joi.string().allow(...Object.values(DeviceType)),
});

export default { deviceCreateSchema, deviceQuerySchema };
