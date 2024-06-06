import { Request, Response } from 'express';
import Device from '../../models/devices/Device';
import { DeviceType, IDevice } from '../../types/models';
import { isValidObjectId } from 'mongoose';
import Joi from 'joi';
import { transformDotNotation } from '../queryController';

const getDeviceTypes = (req: Request, res: Response) => {
	res.status(200).json(Object.values(DeviceType));
};

const getDevices = async (req: Request, res: Response): Promise<void> => {
	const query: Partial<IDevice> = req.query;
	const tranformedQuery = transformDotNotation(query);
	const { error } = validateDeviceQuery(tranformedQuery);
	if (error) {
		res.status(400).json({ message: 'Invalid query' });
		return;
	}
	try {
		const devices: IDevice[] = await Device.find(query)
			.populate('cpu')
			.populate('gpu')
			.populate('ram');
		res.status(200).json(devices);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const getDeviceById = async (req: Request, res: Response): Promise<void> => {
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	try {
		const device: IDevice | null = await Device.findById(req.params.id);
		if (!device) {
			res.status(404).json({ message: 'Device not found' });
			return;
		}
		res.status(200).json(device);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const deleteDevice = async (req: Request, res: Response): Promise<void> => {
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	try {
		const deleted: IDevice | null = await Device.findByIdAndDelete(
			req.params.id
		);
		if (!deleted) {
			res.status(404).json({ message: 'Device not found' });
			return;
		}
		res.status(200).json(deleted);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const validateDeviceQuery = (query: Partial<IDevice>) => {
	const schema = Joi.object<IDevice>({
		id: Joi.string(),
		brand: Joi.string(),
		name: Joi.string(),
		deviceType: Joi.string(),
		images: Joi.array().items(Joi.string()),
	});
	return schema.validate(query);
};

export default {
	getDevices,
	getDeviceById,
	deleteDevice,
	getDeviceTypes,
};
