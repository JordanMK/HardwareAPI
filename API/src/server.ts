import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/dbConn';

dotenv.config();

connectDB();

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
	res.send('Hello world');
});

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => {
		console.log(`Server running on port: ${PORT}`);
	});
});
