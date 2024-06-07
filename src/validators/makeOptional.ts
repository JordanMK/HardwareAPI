import Joi from 'joi';

const makeOptional = (schema: Joi.ObjectSchema) => {
	return schema.fork(Object.keys(schema.describe().keys), (subSchema) =>
		subSchema.type == 'object'
			? subSchema
					.optional()
					.fork(Object.keys(subSchema.describe().keys), (childSchema) =>
						childSchema.optional()
					)
			: subSchema.optional()
	);
};

export default makeOptional;
