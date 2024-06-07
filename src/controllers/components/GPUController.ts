import { Request, Response } from 'express';
import GPU from '../../models/components/GPU';
import { IGPUComponent } from '../../types/models';
import { isValidObjectId } from 'mongoose';

const getGPUComponents = async (req: Request, res: Response): Promise<void> => {
	try {
		const gpuComponents: IGPUComponent[] = await GPU.find(req.query);
		res.status(200).json(gpuComponents);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const getGPUComponentById = async (
	req: Request,
	res: Response
): Promise<void> => {
	if (Object.values(req.query).length > 0) {
		console.log(Object.values(req.query));
		res.status(400).json({
			message: 'This route does not allow additional query parameters',
		});
		return;
	}
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	try {
		const component: IGPUComponent | null = await GPU.findById(req.params.id);
		if (!component) {
			res.status(404).json({ message: 'Component not found' });
			return;
		}
		res.status(200).json(component);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const createGPUComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const nameRegex = new RegExp(req.body.name as string, 'i');
		const duplicate = await GPU.find({ name: nameRegex });
		if (duplicate.length > 0) {
			res.status(409).json({ message: 'This component already exists' });
			return;
		}
		const gpuComponent: IGPUComponent = await GPU.create(req.body);
		res.status(201).json(gpuComponent);
	} catch (error: any) {
		const errorDetails = { message: error.message, sent: req.body };
		res.status(500).json(errorDetails);
	}
};

const updateGPUComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	try {
		const gpuComponent: IGPUComponent | null = await GPU.findById(
			req.params.id
		);
		if (!gpuComponent) {
			res.status(404).json({ message: 'Component not found' });
			return;
		}
		const updatedGPUComponent: IGPUComponent | null =
			await GPU.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
		if (!updatedGPUComponent) {
			res.status(500).json({ message: 'Error updating GPU' });
			return;
		}
		res.status(200).json(updatedGPUComponent);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const deleteGPUComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	try {
		const deleted = await GPU.findByIdAndDelete(req.params.id);
		if (!deleted) {
			res.status(404).json({ message: 'Component not found' });
			return;
		}
		res.status(204).json(deleted);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export default {
	getGPUComponents,
	getGPUComponentById,
	createGPUComponent,
	updateGPUComponent,
	deleteGPUComponent,
};
