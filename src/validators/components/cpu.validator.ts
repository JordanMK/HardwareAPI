import Joi from 'joi';
import { ICPUComponent } from '../../types/models';
import componentValidator from './component.validator';
import makeOptional from '../makeOptional';

const cpuCreateSchema = Joi.object<ICPUComponent>({
	family: Joi.string().required(),
	series: Joi.string().required(),
	generation: Joi.string().required(),
	architecture: Joi.string().required(),
	cores: Joi.number().required(),
	threads: Joi.number().required(),
	baseClock: Joi.number().required(),
	boostClock: Joi.number().required(),
	tdp: Joi.number().required(),
	socket: Joi.string().required(),
	technology: Joi.number().required(),
	integratedGraphics: Joi.object({
		name: Joi.string().required(),
		brand: Joi.string().required(),
		generation: Joi.string().required(),
		architecture: Joi.string().required(),
		baseClock: Joi.number().required(),
		boostClock: Joi.number().required(),
	}),
	cache: Joi.object({
		l1: Joi.number().required(),
		l2: Joi.number().required(),
		l3: Joi.number().required(),
	}).required(),
	hyperthreading: Joi.boolean().required(),
	pcieSupport: Joi.string().required(),
	maxPcieLanes: Joi.number().required(),
	virtualisationSupport: Joi.boolean().required(),
}).concat(componentValidator.componentCreateSchema as Joi.ObjectSchema);

const cpuUpdateSchema = makeOptional(cpuCreateSchema).min(1);

const cpuQuerySchema = makeOptional(cpuCreateSchema).concat(
	componentValidator.componentQuerySchema as Joi.ObjectSchema
);

export default {
	cpuCreateSchema,
	cpuUpdateSchema,
	cpuQuerySchema,
};
