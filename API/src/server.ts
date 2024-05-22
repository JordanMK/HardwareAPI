import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { serve, setup } from 'swagger-ui-express';
import swaggerJson from './swagger/swagger.json';
import connectDB from './config/dbConn';
import { components } from './routes/api/v1/components';
import path from 'path';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler';
import cors, { CorsOptions } from 'cors';
import fs from 'fs';

dotenv.config();
connectDB();

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

// Form data
app.use(express.urlencoded({ extended: false }));

// Json data
app.use(express.json());
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// CORS
const whitelist = ['http://localhost:4000'];
const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin as string) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Logging
app.use(
	morgan(':date[clf] | :url | :method | :status | :remote-addr | :referrer', {
		stream: fs.createWriteStream('./src/logs/access.log', { flags: 'a' }),
	})
);

app.use('/api/v1/components', components);

app.use('/api/v1/docs', serve, setup(swaggerJson));

app.get('/favicon.ico', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../public/img/favicon.ico'));
});

app.get('/', (req: Request, res: Response) => {
	res.send('Hello world');
});

app.all('*', (req: Request, res: Response) => {
	res.status(404).json({ message: '404 Not found' });
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
	app.listen(PORT, () => {
		console.log(`Server running on port: ${PORT}`);
	});
});
