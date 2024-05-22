import express, { Express, Request, Response } from 'express';
import componentsController from '../../../../controllers/components/componentsController';
import { RAMComponents } from './ram';

const router = express.Router();

router.use('/ram', RAMComponents);
router.route('/:id').get(componentsController.getComponentById);
router.route('/').get(componentsController.getAllComponents);

export const components = router;
