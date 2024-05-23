import { Request, Response } from 'express';
import GPUComponent from '../../models/components/GPUComponent';
import { IGPUComponent } from '../../types/models';

const getAllGPUComponents = async (
	req: Request,
	res: Response
): Promise<void> => {
	// #swagger.tags = ['GPU']
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
	// #swagger.tags = ['GPU']
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
	// #swagger.tags = ['GPU']
	/* #swagger.security = [{"bearerAuth": []}] */
	try {
		const gpuComponent: IGPUComponent = await GPUComponent.create(req.body);
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
	// #swagger.tags = ['GPU']
	/* #swagger.security = [{"bearerAuth": []}] */
	if (!req.params.id) {
		res.status(400).json({ message: 'No ID provided' });
		return;
	}
	try {
		const gpuComponent: IGPUComponent | null = await GPUComponent.findById(
			req.params.id
		);
		if (!gpuComponent) {
			res.status(404).json({ message: 'Component not found' });
			return;
		}
		const updatedGPUComponent: IGPUComponent | null =
			await GPUComponent.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
		res.status(200).json(updatedGPUComponent);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export default {
	getAllGPUComponents,
	getGPUComponentById,
	createGPUComponent,
	updateGPUComponent,
};
