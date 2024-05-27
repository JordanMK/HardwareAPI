import express from 'express';
import GPUController from '../../../../controllers/components/GPUController';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';

const router = express.Router();

router
	.route('/:id')
	.get(GPUController.getGPUComponentById)
	.patch(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		GPUController.updateGPUComponent
	)
	.delete(auth, verifyRole(UserRole.ADMIN), GPUController.deleteGPUComponent);

router
	.route('/')
	.get(GPUController.getGPUComponents)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		GPUController.createGPUComponent
	);

export const GPUComponents = router;
