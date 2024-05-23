import { Request, Response } from 'express';
import RAMComponent from '../../models/components/RAMComponent';
import { IRAMComponent } from '../../types/models';

const getAllRAMComponents = async (
	req: Request,
	res: Response
): Promise<void> => {
	// #swagger.tags = ['RAM']
	try {
		console.log(req.query);
		const query: Partial<IRAMComponent> = req.query;
		const ramComponents: IRAMComponent[] = await RAMComponent.find(query);
		res.status(200).json(ramComponents);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const getRAMComponentById = async (
	req: Request,
	res: Response
): Promise<void> => {
	// #swagger.tags = ['RAM']
	try {
		console.log(req.params);
		const ramComponent: IRAMComponent | null = await RAMComponent.findById(
			req.params.id
		);
		res.status(200).json(ramComponent);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const createRAMComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	// #swagger.tags = ['RAM']
	/* #swagger.security = [{"bearerAuth": []}] */
	try {
		const ramComponent: IRAMComponent = await RAMComponent.create(req.body);
		res.status(201).json(ramComponent);
	} catch (error: any) {
		const errorDetails = { message: error.message, sent: req.body };
		res.status(500).json(errorDetails);
	}
};

const updateRAMComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	// #swagger.tags = ['RAM']
	/* #swagger.security = [{"bearerAuth": []}] */
	if (!req.params.id) {
		res.status(400).json({ message: 'No ID provided' });
		return;
	}
	try {
		const ramComponent: IRAMComponent | null = await RAMComponent.findById(
			req.params.id
		);
		if (!ramComponent) {
			res.status(404).json({ message: 'RAM component not found' });
		} else {
			const updatedRAMComponent: IRAMComponent | null =
				await RAMComponent.findByIdAndUpdate(req.params.id, req.body, {
					new: true,
				});
			res.status(200).json(updatedRAMComponent);
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export default {
	getAllRAMComponents,
	getRAMComponentById,
	createRAMComponent,
	updateRAMComponent,
};
