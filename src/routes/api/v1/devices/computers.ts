import express from 'express';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';
import validator from '../../../../middleware/validator';
import computerController from '../../../../controllers/devices/computerController';

const router = express.Router();

router
	.route('/:id')
	.get(computerController.getComputerById)
	.put(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		validator('computerUpdateSchema', 'body'),
		computerController.updateComputer
	)
	.delete(auth, verifyRole(UserRole.ADMIN), computerController.deleteComputer);

router
	.route('/')
	.get(
		validator('computerQuerySchema', 'query'),
		computerController.getComputers
	)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		validator('computerCreateSchema', 'body'),
		computerController.createComputer
	);

export const computers = router;
