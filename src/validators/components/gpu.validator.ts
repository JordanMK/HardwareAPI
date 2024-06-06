import Joi from 'joi';
import { IGPUComponent } from '../../types/models';
import componentValidator from './component.validator';
import makeOptional from '../makeOptional';

const gpuCreateSchema = Joi.object<IGPUComponent>({
	family: Joi.string().required(),
	series: Joi.string().required(),
	generation: Joi.string().required(),
	architecture: Joi.string().required(),
	baseClock: Joi.number().required(),
	boostClock: Joi.number().required(),
	vram: Joi.number().required(),
	memoryType: Joi.string().required(),
	memorySpeed: Joi.number().required(),
	tdp: Joi.number().required(),
	busWidth: Joi.number().required(),
	pcieSupport: Joi.string().required(),
	maxPcieLanes: Joi.number().required(),
	computeCores: Joi.number().required(),
	virtualisationSupport: Joi.boolean().required(),
}).concat(componentValidator.componentCreateSchema as Joi.ObjectSchema);

const gpuUpdateSchema = makeOptional(gpuCreateSchema).min(1);

const gpuQuerySchema = makeOptional(gpuCreateSchema).concat(
	componentValidator.componentQuerySchema as Joi.ObjectSchema
);

export default {
	gpuCreateSchema,
	gpuUpdateSchema,
	gpuQuerySchema,
};
