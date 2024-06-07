import { Request, Response } from 'express';
import Device from '../../models/devices/Device';
import { DeviceType, IDevice } from '../../types/models';
import { isValidObjectId } from 'mongoose';

const getDeviceTypes = (req: Request, res: Response) => {
	res.status(200).json(Object.values(DeviceType));
};

const getDevices = async (req: Request, res: Response): Promise<void> => {
	try {
		const devices: IDevice[] = await Device.find(req.query)
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

export default {
	getDevices,
	getDeviceById,
	deleteDevice,
	getDeviceTypes,
};
