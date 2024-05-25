import express from 'express';
import RAMComponentsController from '../../../../controllers/components/RAMComponentsController';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';

const router = express.Router();

router
	.route('/:id')
	.get(RAMComponentsController.getRAMComponentById)
	.patch(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		RAMComponentsController.updateRAMComponent
	)
	.delete(
		auth,
		verifyRole(UserRole.ADMIN),
		RAMComponentsController.deleteRAMComponent
	);

router
	.route('/')
	.get(RAMComponentsController.getRAMComponents)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		RAMComponentsController.createRAMComponent
	);

export const RAMComponents = router;
