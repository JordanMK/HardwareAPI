import Joi from 'joi';
import { IRAMComponent } from '../../types/models';
import componentValidator from './component.validator';
import makeOptional from '../makeOptional';

const ramCreateSchema = Joi.object<IRAMComponent>({
	series: Joi.string().required(),
	memoryType: Joi.string().required(),
	formFactor: Joi.string().required(),
	eccSupport: Joi.boolean().required(),
	baseClock: Joi.number().required(),
	memorySpeed: Joi.number().required(),
	casLatency: Joi.string().required(),
	voltage: Joi.number().required(),
}).concat(componentValidator.componentCreateSchema as Joi.ObjectSchema);

const ramUpdateSchema: Joi.ObjectSchema<IRAMComponent> = makeOptional(
	ramCreateSchema
)
	.optional()
	.min(1);

const ramQuerySchema = makeOptional(ramCreateSchema).concat(
	componentValidator.componentQuerySchema as Joi.ObjectSchema
);

export default {
	ramCreateSchema,
	ramUpdateSchema,
	ramQuerySchema,
};
