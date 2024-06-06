import express, { Express, Request, Response } from 'express';
import componentsController from '../../../../controllers/components/componentsController';
import { CPUComponents } from './cpu';
import { GPUComponents } from './gpu';
import { RAMComponents } from './ram';
import validator from '../../../../middleware/validator';

const router = express.Router();

router.use('/cpu', CPUComponents);
router.use('/gpu', GPUComponents);
router.use('/ram', RAMComponents);
router.route('/componentTypes').get(componentsController.getComponentTypes);
router.route('/:id').get(componentsController.getComponentById);
router
	.route('/')
	.get(
		validator('componentQuerySchema', 'query'),
		componentsController.getComponents
	);

export const components = router;
