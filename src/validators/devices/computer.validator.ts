import Joi from 'joi';
import { DeviceType, IComputer } from '../../types/models';
import deviceValidator from './device.validator';
import cpuValidator from '../components/cpu.validator';
import gpuValidator from '../components/gpu.validator';
import ramValidator from '../components/ram.validator';
import { isValidObjectId } from 'mongoose';
import makeOptional from '../makeOptional';

const computerCreateSchema = Joi.object<IComputer>({
	computerType: Joi.string()
		.allow(...Object.values(DeviceType))
		.required(),
	// cpu: Joi.allow(Joi.string(), cpuValidator.cpuCreateSchema).required(),
	// gpu: Joi.allow(Joi.string(), gpuValidator.gpuCreateSchema),
	// ram: Joi.allow(Joi.string(), ramValidator.ramCreateSchema).required(),
	cpu: Joi.string().external(isValidObjectId).required(),
	gpu: Joi.string().external(isValidObjectId),
	ram: Joi.string().external(isValidObjectId).required(),
	ramModules: Joi.number().required(),
	ramCapacity: Joi.number().required(),
}).concat(deviceValidator.deviceCreateSchema as Joi.ObjectSchema);

const computerUpdateSchema = makeOptional(computerCreateSchema).min(1);

const computerQuerySchema = makeOptional(computerCreateSchema).concat(
	deviceValidator.deviceQuerySchema as Joi.ObjectSchema
);

export default {
	computerCreateSchema,
	computerUpdateSchema,
	computerQuerySchema,
};
