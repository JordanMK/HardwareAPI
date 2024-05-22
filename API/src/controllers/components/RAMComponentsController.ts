import { Request, Response } from 'express';
import RAMComponent from '../../models/components/RAMComponent';
import { IRAMComponent } from '../../types/models';

const getAllRAMComponents = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const ramComponents: IRAMComponent[] = await RAMComponent.find();
		res.status(200).json(ramComponents);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const getRAMComponentById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
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
	try {
		console.log(req.body.memorySpeed);
		console.log(req.body);
		const ramComponent: IRAMComponent = await RAMComponent.create(req.body);
		res.status(201).json(ramComponent);
	} catch (error: any) {
		const errorDetails = { message: error.message, sent: req.body };
		res.status(500).json(errorDetails);
	}
};

export default { getAllRAMComponents, getRAMComponentById, createRAMComponent };
