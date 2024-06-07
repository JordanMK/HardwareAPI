import express from 'express';
import userController from '../../controllers/userController';
import auth from '../../middleware/auth';
import { UserRole } from '../../types/models';
import verifyRole from '../../middleware/verifyRole';
const router = express.Router();

router
	.route('/')
	.get(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		userController.getUserById
	);

export const me = router;
