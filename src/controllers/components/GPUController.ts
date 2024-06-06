import { Request, Response } from 'express';
import GPU from '../../models/components/GPU';
import { IGPUComponent } from '../../types/models';
import { isValidObjectId } from 'mongoose';
import Joi from 'joi';
import { transformDotNotation } from '../queryController';

const getGPUComponents = async (req: Request, res: Response): Promise<void> => {
	// #swagger.tags = ['GPU']
	const query: Partial<IGPUComponent> =
		Object.values(req.query).length > 0 ? req.query : req.body;
		const tranformedQuery = transformDotNotation(query)
	const { error } = validateGPUComponentQuery(tranformedQuery);
	if (error) {
		res.status(400).json({ message: error.message });
		return;
	}
	try {
		const gpuComponents: IGPUComponent[] = await GPU.find(query);
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
	// #swagger.tags = ['GPU']
	/* #swagger.security = [{"bearerAuth": []}] */
	const body: IGPUComponent = req.body;
	const { error } = validateGPUComponent(body);
	if (error) {
		res.status(400).json({ message: error.message });
		return;
	}
	try {
		const nameRegex = new RegExp(body.name as string, 'i');
		const duplicate = await GPU.find({ name: nameRegex });
		if (duplicate) {
			res.status(409).json({ message: 'This component already exists' });
			return;
		}
		const gpuComponent: IGPUComponent = await GPU.create(body);
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
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	const { error } = validateGPUComponentUpdate(req.body);
	if (error) {
		res.status(400).json({ message: error.message });
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
	// #swagger.tags = ['GPU']
	/* #swagger.security = [{"bearerAuth": []}] */
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

const validateGPUComponentQuery = (query: Partial<IGPUComponent>) => {
	const schema = Joi.object<IGPUComponent>({
		id: Joi.string(),
		brand: Joi.string(),
		name: Joi.string(),
		family: Joi.string(),
		series: Joi.string(),
		generation: Joi.string(),
		architecture: Joi.string(),
		baseClock: Joi.number(),
		boostClock: Joi.number(),
		vram: Joi.number(),
		memoryType: Joi.string(),
		memorySpeed: Joi.number(),
		tdp: Joi.number(),
		busWidth: Joi.number(),
		pcieSupport: Joi.string(),
		maxPcieLanes: Joi.number(),
		computeCores: Joi.number(),
		virtualisationSupport: Joi.boolean(),
	});
	return schema.validate(query);
};

const validateGPUComponentUpdate = (query: Partial<IGPUComponent>) => {
	const schema = Joi.object<IGPUComponent>({
		brand: Joi.string(),
		name: Joi.string(),
		images: Joi.array(),
		family: Joi.string(),
		series: Joi.string(),
		generation: Joi.string(),
		architecture: Joi.string(),
		baseClock: Joi.number(),
		boostClock: Joi.number(),
		vram: Joi.number(),
		memoryType: Joi.string(),
		memorySpeed: Joi.number(),
		tdp: Joi.number(),
		busWidth: Joi.number(),
		pcieSupport: Joi.string(),
		maxPcieLanes: Joi.number(),
		computeCores: Joi.number(),
		virtualisationSupport: Joi.boolean(),
	});
	return schema.validate(query);
};

const validateGPUComponent = (gpu: IGPUComponent) => {
	const schema = Joi.object<IGPUComponent>({
		brand: Joi.string().required(),
		name: Joi.string().required(),
		images: Joi.string(),
		family: Joi.string().required(),
		series: Joi.string().required(),
		generation: Joi.string().required(),
		architecture: Joi.string().required(),
		baseClock: Joi.number().required(),
		boostClock: Joi.number().required(),
		vram: Joi.number().required(),
		memoryType: Joi.string().required(),
		memorySpeed: Joi.number().required(),
		tdp: Joi.number().required(),
		busWidth: Joi.number().required(),
		pcieSupport: Joi.string().required(),
		maxPcieLanes: Joi.number().required(),
		computeCores: Joi.number().required(),
		virtualisationSupport: Joi.boolean().required(),
	});
	return schema.validate(gpu);
};

export default {
	getGPUComponents,
	getGPUComponentById,
	createGPUComponent,
	updateGPUComponent,
	deleteGPUComponent,
};
