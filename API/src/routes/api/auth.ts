import express, { Express, Request, Response } from 'express';
import userController from '../../controllers/userController';
const router = express.Router();

router.route('/').post(userController.authUser);

export const auth = router;
