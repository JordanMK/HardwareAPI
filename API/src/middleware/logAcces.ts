import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

const logAcces = async (req: Request, res: Response, next: NextFunction) => {
	if (!fs.existsSync(path.join(__dirname, '../logs'))) {
		await fsPromises.mkdir(path.join(__dirname, '../logs'));
	}
	morgan(':date[clf] | :url | :method | :status | :remote-addr | :referrer', {
		stream: fs.createWriteStream('./src/logs/access.log', { flags: 'a' }),
	})(req, res, next);
};

export default logAcces;
