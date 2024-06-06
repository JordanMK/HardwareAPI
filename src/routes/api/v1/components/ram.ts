import express from 'express';
import RAMController from '../../../../controllers/components/RAMController';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';

const router = express.Router();

router
	.route('/:id')
	.get(RAMController.getRAMComponentById)
	.patch(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		RAMController.updateRAMComponent
	)
	.delete(auth, verifyRole(UserRole.ADMIN), RAMController.deleteRAMComponent);

router
	.route('/')
	.get(RAMController.getRAMComponents)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		RAMController.createRAMComponent
	);

export const RAMComponents = router;
