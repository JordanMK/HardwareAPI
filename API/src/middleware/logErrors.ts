import formatter from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

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

export default logErrors;
