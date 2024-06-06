import express from 'express';
import CPUController from '../../../../controllers/components/CPUController';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';

const router = express.Router();

router
	.route('/:id')
	.get(CPUController.getCPUComponentById)
	.patch(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		CPUController.updateCPUComponent
	)
	.delete(auth, verifyRole(UserRole.ADMIN), CPUController.deleteCPUComponent);

router
	.route('/')
	.get(CPUController.getCPUComponents)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		CPUController.createCPUComponent
	);

export const CPUComponents = router;
