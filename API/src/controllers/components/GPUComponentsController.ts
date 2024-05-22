import { Request, Response } from 'express';
import GPUComponent from '../../models/components/GPUComponent';
import { IGPUComponent } from '../../types/models';

const getAllGPUComponents = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const gpuComponents: IGPUComponent[] = await GPUComponent.find();
		res.status(200).json(gpuComponents);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const getGPUComponentById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const gpuComponent: IGPUComponent | null = await GPUComponent.findById(
			req.params.id
		);
		res.status(200).json(gpuComponent);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const createGPUComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const gpuComponent: IGPUComponent = await GPUComponent.create(req.body);
		res.status(201).json(gpuComponent);
	} catch (error: any) {
		const errorDetails = { message: error.message, sent: req.body };
		res.status(500).json(errorDetails);
	}
};

export default {
	getAllGPUComponents,
	getGPUComponentById,
	createGPUComponent,
};
