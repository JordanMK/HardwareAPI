import express from 'express';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';
import ComputerController from '../../../../controllers/devices/computerController';
import validator from '../../../../middleware/validator';

const router = express.Router();

router
	.route('/:id')
	.get(ComputerController.getComputerById)
	.put(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		validator('computerUpdateSchema', 'body'),
		ComputerController.updateComputer
	)
	.delete(auth, verifyRole(UserRole.ADMIN), ComputerController.deleteComputer);

router
	.route('/')
	.get(
		validator('computerQuerySchema', 'query'),
		ComputerController.getComputers
	)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		validator('computerCreateSchema', 'body'),
		ComputerController.createComputer
	);

export const computers = router;
