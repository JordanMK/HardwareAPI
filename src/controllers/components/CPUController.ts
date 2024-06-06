import { Request, Response } from 'express';
import CPU from '../../models/components/CPU';
import { ICPUComponent } from '../../types/models';
import { isValidObjectId } from 'mongoose';

const getCPUComponents = async (req: Request, res: Response): Promise<void> => {
	try {
		const cpuComponents: ICPUComponent[] = await CPU.find(req.query);
		res.status(200).json(cpuComponents);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const getCPUComponentById = async (
	req: Request,
	res: Response
): Promise<void> => {
	if (Object.values(req.query).length > 0) {
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
		const component: ICPUComponent | null = await CPU.findById(req.params.id);
		if (!component) {
			res.status(404).json({ message: 'Component not found' });
			return;
		}
		res.status(200).json(component);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const createCPUComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const nameRegex = new RegExp(req.body.name as string, 'i');
		const duplicate = await CPU.find({ name: nameRegex });
		console.log(duplicate);
		if (duplicate.length > 0) {
			res.status(409).json({ message: 'This component already exists' });
			return;
		}
		const cpuComponent: ICPUComponent = await CPU.create(req.body);
		if (!cpuComponent) {
			res.status(500).json({ message: 'Error creating CPU' });
		}
		res.status(201).json(cpuComponent);
	} catch (error: any) {
		const errorDetails = { message: error.message };
		res.status(500).json(errorDetails);
	}
};

const updateCPUComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	try {
		const cpuComponent: ICPUComponent | null = await CPU.findById(
			req.params.id
		);
		if (!cpuComponent) {
			res.status(404).json({ message: 'Component not found' });
			return;
		}
		const updatedCPUComponent: ICPUComponent | null =
			await CPU.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
		if (!updatedCPUComponent) {
			res.status(500).json({ message: 'Error updating CPU' });
			return;
		}
		res.status(200).json(updatedCPUComponent);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const deleteCPUComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	try {
		const deleted: ICPUComponent | null = await CPU.findByIdAndDelete(
			req.params.id
		);
		if (!deleted) {
			res.status(404).json({ message: 'Component not found' });
			return;
		}
		res.status(200).json(deleted);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export default {
	getCPUComponents,
	getCPUComponentById,
	createCPUComponent,
	updateCPUComponent,
	deleteCPUComponent,
};
