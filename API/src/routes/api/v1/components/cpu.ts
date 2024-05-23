import express, { Express, Request, Response } from 'express';
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
	);

router
	.route('/')
	.get(CPUComponentsController.getAllCPUComponents)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		CPUComponentsController.createCPUComponent
	);

export const CPUComponents = router;
