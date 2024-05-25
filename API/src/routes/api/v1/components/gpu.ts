import express from 'express';
import GPUComponentsController from '../../../../controllers/components/GPUComponentsController';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';

const router = express.Router();

router
	.route('/:id')
	.get(GPUComponentsController.getGPUComponentById)
	.patch(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		GPUComponentsController.updateGPUComponent
	)
	.delete(
		auth,
		verifyRole(UserRole.ADMIN),
		GPUComponentsController.deleteGPUComponent
	);

router
	.route('/')
	.get(GPUComponentsController.getGPUComponents)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		GPUComponentsController.createGPUComponent
	);

export const GPUComponents = router;
