import { NextFunction, Request, Response } from 'express';
import formatter from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	logErrors(`${err.name}: ${err.message}`, 'errors.log');
	console.error(err.stack);
	res.status(500).json({ message: err.message });
	next();
};

const logErrors = async (message: string, logName: string) => {
	const dateTime = `${formatter.format(new Date(), 'dd/MM/yyy\tHH:mm:ss')}`;
	const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;
	try {
		if (!fs.existsSync(path.join(__dirname, '../logs'))) {
			await fsPromises.mkdir(path.join(__dirname, '../logs'));
		}

		await fsPromises.appendFile(
			path.join(__dirname, '../logs', logName),
			logItem
		);
	} catch (err) {
		console.error(err);
	}
};

export default errorHandler;
