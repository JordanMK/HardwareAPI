import { Request, Response } from 'express';
import CPUComponent from '../../models/components/CPUComponent';
import { ICPUComponent } from '../../types/models';

const getAllCPUComponents = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const cpuComponents: ICPUComponent[] = await CPUComponent.find();
		res.status(200).json(cpuComponents);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const getCPUComponentById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const cpuComponent: ICPUComponent | null = await CPUComponent.findById(
			req.params.id
		);
		res.status(200).json(cpuComponent);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const createCPUComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	/* #swagger.security = [{"bearerAuth": []}] */
	try {
		const cpuComponent: ICPUComponent = await CPUComponent.create(req.body);
		res.status(201).json(cpuComponent);
	} catch (error: any) {
		const errorDetails = { message: error.message, sent: req.body };
		res.status(500).json(errorDetails);
	}
};

const updateCPUComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	/* #swagger.security = [{"bearerAuth": []}] */
	if (!req.params.id) {
		res.status(400).json({ message: 'No ID provided' });
		return;
	}
	try {
		const cpuComponent: ICPUComponent | null = await CPUComponent.findById(
			req.params.id
		);
		if (!cpuComponent) {
			res.status(404).json({ message: 'CPU Component not found' });
		} else {
			const updatedCPUComponent: ICPUComponent | null =
				await CPUComponent.findByIdAndUpdate(req.params.id, req.body, {
					new: true,
				});
			res.status(200).json(updatedCPUComponent);
		}
	} catch (error: any) {}
};

export default {
	getAllCPUComponents,
	getCPUComponentById,
	createCPUComponent,
	updateCPUComponent,
};
