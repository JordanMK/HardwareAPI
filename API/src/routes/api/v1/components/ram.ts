import express, { Express, Request, Response } from 'express';
import RAMComponentsController from '../../../../controllers/components/RAMComponentsController';

const router = express.Router();

router.route('/:id').get(RAMComponentsController.getRAMComponentById);

router
	.route('/')
	.get(RAMComponentsController.getAllRAMComponents)
	.post(RAMComponentsController.createRAMComponent);

export const RAMComponents = router;
