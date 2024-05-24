import { Request, Response } from 'express';
import CPUComponent from '../../models/components/CPUComponent';
import { ComponentType, ICPUComponent } from '../../types/models';
import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

const getAllCPUComponents = async (
	req: Request,
	res: Response
): Promise<void> => {
	// #swagger.tags = ['CPU']
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
	// #swagger.tags = ['CPU']
	try {
		if (!isValidObjectId(req.params.id)) {
			res.status(400).json({ message: 'Invalid ID' });
			return;
		}
		const cpuComponent: ICPUComponent | null = await CPUComponent.findById(
			req.params.id
		);
		if (!cpuComponent) {
			res.status(404).json({ message: 'Component not found' });
			return;
		}
		res.status(200).json(cpuComponent);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const createCPUComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	// #swagger.tags = ['CPU']
	/* #swagger.security = [{"bearerAuth": []}] */
	/*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/CPU" }
    } */
	const { error } = validateCPUComponent(req.body);
	if (error) {
		res.status(400).json({ message: error.details[0].message });
		return;
	}
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
	// #swagger.tags = ['CPU']
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

const deleteCPUComponent = async (
	req: Request,
	res: Response
): Promise<void> => {
	// #swagger.tags = ['CPU']
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
			await CPUComponent.findByIdAndDelete(req.params.id);
			res.status(200).json({ message: 'CPU Component deleted' });
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const validateCPUComponent = (cpu: ICPUComponent) => {
	const schema = Joi.object<Omit<ICPUComponent, 'componentType'>>({
		brand: Joi.string().required(),
		name: Joi.string().required(),
		images: Joi.array(),
		family: Joi.string().required(),
		series: Joi.string().required(),
		generation: Joi.string().required(),
		architecture: Joi.string().required(),
		cores: Joi.number().required(),
		threads: Joi.number().required(),
		baseClock: Joi.number().required(),
		boostClock: Joi.number().required(),
		tdp: Joi.number().required(),
		socket: Joi.string().required(),
		technology: Joi.number().required(),
		integratedGraphics: Joi.object({
			name: Joi.string().required(),
			brand: Joi.string().required(),
			generation: Joi.string().required(),
			architecture: Joi.string().required(),
			baseClock: Joi.number().required(),
			boostClock: Joi.number().required(),
		}),
		cache: Joi.object({
			l1: Joi.string().required(),
			l2: Joi.string().required(),
			l3: Joi.string().required(),
		}),
		hyperthreading: Joi.boolean().required(),
		pcieSupport: Joi.string().required(),
		maxPcieLanes: Joi.number().required(),
		virtualisationSupport: Joi.boolean().required(),
	});
	return schema.validate(cpu);
};

export default {
	getAllCPUComponents,
	getCPUComponentById,
	createCPUComponent,
	updateCPUComponent,
};
