import Joi from 'joi';
import { ComponentType, IComponent } from '../../types/models';
import makeOptional from '../makeOptional';

const componentCreateSchema = Joi.object<IComponent>({
	brand: Joi.string().required(),
	name: Joi.string().required(),
	images: Joi.array().items(Joi.string()).single(),
});

const componentQuerySchema = makeOptional(componentCreateSchema).append({
	id: Joi.string(),
	componentType: Joi.string().allow(...Object.values(ComponentType)),
});

export default { componentCreateSchema, componentQuerySchema };
