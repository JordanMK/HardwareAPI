import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import logErrors from './logErrors';

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	logErrors(`${err.name}: ${err.message}`, 'errors.log');
	console.error(err.stack);
	res.status(500).json({ message: err.message });
};

export default errorHandler;
