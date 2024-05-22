import express, { Express, Request, Response } from 'express';
import GPUComponentsController from '../../../../controllers/components/GPUComponentsController';

const router = express.Router();

router.route('/:id').get(GPUComponentsController.getGPUComponentById);

router
	.route('/')
	.get(GPUComponentsController.getAllGPUComponents)
	.post(GPUComponentsController.createGPUComponent);

export const GPUComponents = router;
