import express from 'express';
import { computers } from './computers';
import devicesController from '../../../../controllers/devices/devicesController';
import validator from '../../../../middleware/validator';

const router = express.Router();

router.use('/computers', computers);
router.route('/deviceTypes').get(devicesController.getDeviceTypes);
router.route('/:id').get(devicesController.getDeviceById);
router
	.route('/')
	.get(validator('deviceQuerySchema', 'query'), devicesController.getDevices);

export const devices = router;
