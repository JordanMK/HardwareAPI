import Joi from 'joi';

const makeOptional = (schema: Joi.ObjectSchema) => {
	return schema.fork(Object.keys(schema.describe().keys), (schema) =>
		schema.optional()
	);
};

export default makeOptional;
