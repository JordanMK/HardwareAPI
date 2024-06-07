import { Request, Response } from 'express';
import RAM from '../../models/components/RAM';
import { IRAMComponent } from '../../types/models';
import { isValidObjectId } from 'mongoose';

const getRAMComponents = async (req: Request, res: Response): Promise<void> => {
	try {
		const ramComponents: IRAMComponent[] = await RAM.find(req.query);
		res.status(200).json(ramComponents);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const getRAMComponentById = async (
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
		const component: IRAMComponent | null = await RAM.findById(req.params.id);
		if (!component) {
			res.status(404).json({ message: 'Component not found' });
			return;
		}
		res.status(200).json(component);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const createRAMComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const nameRegex = new RegExp(req.body.name as string, 'i');
		const duplicate = await RAM.find({ name: nameRegex });
		if (duplicate) {
			res.status(409).json({ message: 'This component already exists' });
			return;
		}
		const ramComponent: IRAMComponent = await RAM.create(req.body);
		if (!ramComponent) {
			res.status(500).json({ message: 'Error creating RAM' });
		}
		res.status(201).json(ramComponent);
	} catch (error: any) {
		const errorDetails = { message: error.message };
		res.status(500).json(errorDetails);
	}
};

const updateRAMComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	try {
		const ramComponent: IRAMComponent | null = await RAM.findById(
			req.params.id
		);
		if (!ramComponent) {
			res.status(404).json({ message: 'Component not found' });
			return;
		}
		const updatedRAMComponent: IRAMComponent | null =
			await RAM.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
		if (!updatedRAMComponent) {
			res.status(500).json({ message: 'Error updating RAM' });
			return;
		}
		res.status(200).json(updatedRAMComponent);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const deleteRAMComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	try {
		const deleted: IRAMComponent | null = await RAM.findByIdAndDelete(
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
	getRAMComponents,
	getRAMComponentById,
	createRAMComponent,
	updateRAMComponent,
	deleteRAMComponent,
};
