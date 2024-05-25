import express from 'express';
import CPUComponentsController from '../../../../controllers/components/CPUComponentsController';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';

const router = express.Router();

router
	.route('/:id')
	.get(CPUComponentsController.getCPUComponentById)
	.patch(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		CPUComponentsController.updateCPUComponent
	)
	.delete(
		auth,
		verifyRole(UserRole.ADMIN),
		CPUComponentsController.deleteCPUComponent
	);

router
	.route('/')
	.get(CPUComponentsController.getCPUComponents)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		CPUComponentsController.createCPUComponent
	);

export const CPUComponents = router;
