import express, { Express, Request, Response } from 'express';
import componentsController from '../../../../controllers/components/componentsController';

const router = express.Router();

router.route('/').get(componentsController.getAllComponents);

router.route('/:id').get(componentsController.getComponentById);

export const components = router;
