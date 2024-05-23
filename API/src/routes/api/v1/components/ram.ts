import express, { Express, Request, Response } from 'express';
import RAMComponentsController from '../../../../controllers/components/RAMComponentsController';
import auth from '../../../../middleware/auth';

const router = express.Router();

router
	.route('/:id')
	.get(RAMComponentsController.getRAMComponentById)
	.patch(auth, RAMComponentsController.updateRAMComponent);

router
	.route('/')
	.get(RAMComponentsController.getAllRAMComponents)
	.post(auth, RAMComponentsController.createRAMComponent);

export const RAMComponents = router;
