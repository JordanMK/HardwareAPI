import { NextFunction, Request, Response } from 'express';
import validators from '../validators';
import Joi from 'joi';

type SchemaKeys<T> = {
	[K in keyof T]: keyof T[K];
};

type AllSchemaKeys = SchemaKeys<typeof validators>[keyof typeof validators];
type SchemaKeyUnion = AllSchemaKeys;

type ReqType = 'body' | 'query';
const validator = (schema: SchemaKeyUnion, reqType: ReqType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const validator: any = Object.values(validators).find((obj) =>
			Object.keys(obj).includes(schema)
		);
		const schemaValidator: Joi.ObjectSchema = validator[schema];
		if (!schemaValidator) {
			return res.status(500).json({
				message: 'An unexpected error occurred',
			});
		}
		const { error } = schemaValidator.validate(req[reqType]);
		if (error) {
			return res.status(400).json({
				message: error.message,
			});
		}
		next();
	};
};

export default validator;
