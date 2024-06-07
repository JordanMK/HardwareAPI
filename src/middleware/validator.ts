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
		const transformed = transformDotNotation(req[reqType]);
		const { error } = schemaValidator.validate(transformed);
		if (error) {
			return res.status(400).json({
				message: error.message,
			});
		}
		next();
	};
};

export const transformDotNotation = (obj: {
	[key: string]: any;
}): {
	[key: string]: any;
} => {
	const result: { [key: string]: any } = {};

	Object.keys(obj).forEach((key) => {
		const keys = key.split('.');
		let currentLevel = result;

		keys.forEach((part, index) => {
			if (index === keys.length - 1) {
				currentLevel[part] = obj[key];
			} else {
				if (!currentLevel[part]) {
					currentLevel[part] = {};
				}
				currentLevel = currentLevel[part];
			}
		});
	});

	return result;
};

export default validator;
