import express, { Express, Request, Response } from 'express';
import GPUComponentsController from '../../../../controllers/components/GPUComponentsController';
import auth from '../../../../middleware/auth';

const router = express.Router();

router
	.route('/:id')
	.get(GPUComponentsController.getGPUComponentById)
	.patch(auth, GPUComponentsController.updateGPUComponent);

router
	.route('/')
	.get(GPUComponentsController.getAllGPUComponents)
	.post(auth, GPUComponentsController.createGPUComponent);

export const GPUComponents = router;
