import express from 'express';
import RAMController from '../../../../controllers/components/RAMController';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';
import ComputerController from '../../../../controllers/devices/computerController';
import validator from '../../../../middleware/validator';

const router = express.Router();

router
	.route('/:id')
	// 	.get(RAMController.getRAMComponentById)
	// 	.patch(
	// 		auth,
	// 		verifyRole(UserRole.ADMIN, UserRole.USER),
	// 		RAMController.updateRAMComponent
	// 	)
	.delete(auth, verifyRole(UserRole.ADMIN), RAMController.deleteRAMComponent);

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
