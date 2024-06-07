import express from 'express';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';
import validator from '../../../../middleware/validator';
import computersController from '../../../../controllers/devices/computersController';

const router = express.Router();

router
	.route('/:id')
	.get(computersController.getComputerById)
	.put(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		validator('computerUpdateSchema', 'body'),
		computersController.updateComputer
	)
	.delete(auth, verifyRole(UserRole.ADMIN), computersController.deleteComputer);

router
	.route('/')
	.get(
		validator('computerQuerySchema', 'query'),
		computersController.getComputers
	)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		validator('computerCreateSchema', 'body'),
		computersController.createComputer
	);

export const computers = router;
