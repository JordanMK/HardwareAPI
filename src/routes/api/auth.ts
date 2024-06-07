import express, { Express, Request, Response } from 'express';
import userController from '../../controllers/userController';
import validator from '../../middleware/validator';
const router = express.Router();

router
	.route('/')
	.post(validator('userSchema', 'body'), userController.authUser);

export const auth = router;
