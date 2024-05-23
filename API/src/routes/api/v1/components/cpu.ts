import express, { Express, Request, Response } from 'express';
import CPUComponentsController from '../../../../controllers/components/CPUComponentsController';
import auth from '../../../../middleware/auth';

const router = express.Router();

router
	.route('/:id')
	.get(CPUComponentsController.getCPUComponentById)
	.patch(auth, CPUComponentsController.updateCPUComponent);

router
	.route('/')
	.get(CPUComponentsController.getAllCPUComponents)
	.post(auth, CPUComponentsController.createCPUComponent);

export const CPUComponents = router;
