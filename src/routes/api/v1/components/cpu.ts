import express from 'express';
import CPUController from '../../../../controllers/components/CPUController';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';
import validator from '../../../../middleware/validator';

const router = express.Router();

router
	.route('/:id')
	.get(CPUController.getCPUComponentById)
	.put(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		validator('cpuUpdateSchema', 'body'),
		CPUController.updateCPUComponent
	)
	.delete(auth, verifyRole(UserRole.ADMIN), CPUController.deleteCPUComponent);

router
	.route('/')
	.get(validator('cpuQuerySchema', 'query'), CPUController.getCPUComponents)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		validator('cpuCreateSchema', 'body'),
		CPUController.createCPUComponent
	);

export const CPUComponents = router;
