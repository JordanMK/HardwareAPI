import { Request, Response } from 'express';
import CPU from '../../models/components/CPU';
import { ICPUComponent } from '../../types/models';
import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
import getComponentById from './componentsController';
import { transformDotNotation } from '../queryController';

const getCPUComponents = async (req: Request, res: Response): Promise<void> => {
	// #swagger.tags = ['CPU']
	const query: Partial<ICPUComponent> =
		Object.values(req.query).length > 0 ? req.query : req.body;
	const tranformedQuery = transformDotNotation(query);
	const { error } = validateCPUComponentQuery(tranformedQuery);
	if (error) {
		res.status(400).json({ message: error.message });
		return;
	}
	try {
		const cpuComponents: ICPUComponent[] = await CPU.find(query);
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
	// #swagger.tags = ['CPU']
	/* #swagger.security = [{"bearerAuth": []}] */
	/*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/CPU" }
    } */
	const body: ICPUComponent = req.body;
	const { error } = validateCPUComponent(body);
	if (error) {
		res.status(400).json({ message: error.message });
		return;
	}
	try {
		const nameRegex = new RegExp(body.name as string, 'i');
		const duplicate = await CPU.find({ name: nameRegex });
		console.log(duplicate);
		if (duplicate.length > 0) {
			res.status(409).json({ message: 'This component already exists' });
			return;
		}
		const cpuComponent: ICPUComponent = await CPU.create(body);
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
	// #swagger.tags = ['CPU']
	/* #swagger.security = [{"bearerAuth": []}] */
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	const { error } = validateCPUComponentUpdate(req.body);
	if (error) {
		res.status(400).json({ message: error.message });
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

const validateCPUComponentQuery = (query: Partial<ICPUComponent>) => {
	const schema = Joi.object<ICPUComponent>({
		id: Joi.string(),
		brand: Joi.string(),
		name: Joi.string(),
		family: Joi.string(),
		series: Joi.string(),
		generation: Joi.string(),
		architecture: Joi.string(),
		cores: Joi.number(),
		threads: Joi.number(),
		baseClock: Joi.number(),
		boostClock: Joi.number(),
		tdp: Joi.number(),
		socket: Joi.string(),
		technology: Joi.number(),
		integratedGraphics: Joi.object({
			name: Joi.string(),
			brand: Joi.string(),
			generation: Joi.string(),
			architecture: Joi.string(),
			baseClock: Joi.number(),
			boostClock: Joi.number(),
		}),
		cache: Joi.object({
			l1: Joi.string(),
			l2: Joi.string(),
			l3: Joi.string(),
		}),
		hyperthreading: Joi.boolean(),
		pcieSupport: Joi.string(),
		maxPcieLanes: Joi.number(),
		virtualisationSupport: Joi.boolean(),
	});
	return schema.validate(query);
};

const validateCPUComponentUpdate = (query: Partial<ICPUComponent>) => {
	const schema = Joi.object<ICPUComponent>({
		brand: Joi.string(),
		name: Joi.string(),
		family: Joi.string(),
		series: Joi.string(),
		generation: Joi.string(),
		architecture: Joi.string(),
		cores: Joi.number(),
		threads: Joi.number(),
		baseClock: Joi.number(),
		boostClock: Joi.number(),
		tdp: Joi.number(),
		socket: Joi.string(),
		technology: Joi.number(),
		integratedGraphics: Joi.object({
			name: Joi.string(),
			brand: Joi.string(),
			generation: Joi.string(),
			architecture: Joi.string(),
			baseClock: Joi.number(),
			boostClock: Joi.number(),
		}),
		cache: Joi.object({
			l1: Joi.string(),
			l2: Joi.string(),
			l3: Joi.string(),
		}),
		hyperthreading: Joi.boolean(),
		pcieSupport: Joi.string(),
		maxPcieLanes: Joi.number(),
		virtualisationSupport: Joi.boolean(),
	});
	return schema.validate(query);
};

const validateCPUComponent = (cpu: ICPUComponent) => {
	const schema = Joi.object<ICPUComponent>({
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
		}).required(),
		hyperthreading: Joi.boolean().required(),
		pcieSupport: Joi.string().required(),
		maxPcieLanes: Joi.number().required(),
		virtualisationSupport: Joi.boolean().required(),
	});
	return schema.validate(cpu);
};

export default {
	getCPUComponents,
	getCPUComponentById,
	createCPUComponent,
	updateCPUComponent,
	deleteCPUComponent,
};
