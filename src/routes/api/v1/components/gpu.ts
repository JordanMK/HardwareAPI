import express from 'express';
import GPUController from '../../../../controllers/components/GPUController';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';
import validator from '../../../../middleware/validator';

const router = express.Router();

router
	.route('/:id')
	.get(GPUController.getGPUComponentById)
	.put(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		validator('gpuUpdateSchema', 'body'),
		GPUController.updateGPUComponent
	)
	.delete(auth, verifyRole(UserRole.ADMIN), GPUController.deleteGPUComponent);

router
	.route('/')
	.get(validator('gpuQuerySchema', 'query'), GPUController.getGPUComponents)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		validator('gpuCreateSchema', 'body'),
		GPUController.createGPUComponent
	);

export const GPUComponents = router;
