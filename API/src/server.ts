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
import cors from 'cors';
import fs from 'fs';
import corsOptions from './config/corsOptions';
import { register } from './routes/api/register';
import { auth } from './routes/api/auth';

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
app.use(cors(corsOptions));

// Logging
app.use(
	morgan(':date[clf] | :url | :method | :status | :remote-addr | :referrer', {
		stream: fs.createWriteStream('./src/logs/access.log', { flags: 'a' }),
	})
);

// Components routes
app.use('/api/v1/components', components);

// Swagger docs
app.use('/api/v1/docs', serve, setup(swaggerJson));

// Register
app.use('/api/register', register);

// Register
app.use('/api/auth', auth);

// Favicon
app.get('/favicon.ico', (req: Request, res: Response) => {
	// #swagger.ignore = true
	res.sendFile(path.join(__dirname, '../public/img/favicon.ico'));
});

// Root
app.get('/', (req: Request, res: Response) => {
	// #swagger.ignore = true
	res.send('Hello world');
});

// 404 Not found
app.all('*', (req: Request, res: Response) => {
	// #swagger.ignore = true
	res.status(404).json({ message: '404 Not found' });
});

// Error handler
app.use(errorHandler);

// MongoDB connection
mongoose.connection.once('open', () => {
	app.listen(PORT, () => {
		console.log(`Server running on port: ${PORT}`);
	});
});
