import express from 'express';
import RAMController from '../../../../controllers/components/RAMController';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';
import ComputerController from '../../../../controllers/devices/ComputerController';

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
	.get(ComputerController.getComputers)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		ComputerController.createComputer
	);

export const computers = router;
