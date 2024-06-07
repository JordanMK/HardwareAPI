import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import connectDB from './config/dbConn';
import { components } from './routes/api/v1/components';
import path from 'path';
import errorHandler from './middleware/errorHandler';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import { register } from './routes/api/register';
import { auth } from './routes/api/auth';
import cookieParser = require('cookie-parser');
import { refresh } from './routes/api/refresh';
import { logout } from './routes/api/logout';
import logAcces from './middleware/logAcces';
import { devices } from './routes/api/v1/devices';
import { me } from './routes/api/me';

dotenv.config();
connectDB();

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

// Form data
app.use(express.urlencoded({ extended: false }));

// Json data
app.use(express.json());
app.use(bodyParser.json());

// Cookies (refresh)
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// CORS
app.use(cors(corsOptions));

// Logging
app.use(logAcces);

// Components routes
app.use('/api/v1/components', components);

// Devices routes
app.use('/api/v1/devices', devices);

// Me
app.use('/api/me', me);

// Register
app.use('/api/register', register);

// Authenticate
app.use('/api/auth', auth);

// Refresh
app.use('/api/refresh', refresh);

// Logout
app.use('/api/logout', logout);

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
