import express, { Express, Request, Response } from 'express';
import CPUComponentsController from '../../../../controllers/components/CPUComponentsController';

const router = express.Router();

router.route('/:id').get(CPUComponentsController.getCPUComponentById);

router
	.route('/')
	.get(CPUComponentsController.getAllCPUComponents)
	.post(CPUComponentsController.createCPUComponent);

export const CPUComponents = router;
