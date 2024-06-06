import { Request, Response } from 'express';
import RAM from '../../models/components/RAM';
import { IRAMComponent } from '../../types/models';
import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
import getComponentById from './componentsController';
import { transformDotNotation } from '../queryController';

const getRAMComponents = async (req: Request, res: Response): Promise<void> => {
	// #swagger.tags = ['RAM']
	const query: Partial<IRAMComponent> =
		Object.values(req.query).length > 0 ? req.query : req.body;
	const tranformedQuery = transformDotNotation(query);
	const { error } = validateRAMComponentQuery(tranformedQuery);
	if (error) {
		res.status(400).json({ message: error.message });
		return;
	}
	try {
		const ramComponents: IRAMComponent[] = await RAM.find(query);
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
	// #swagger.tags = ['RAM']
	/* #swagger.security = [{"bearerAuth": []}] */
	/*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/RAM" }
    } */
	const body: IRAMComponent = req.body;
	const { error } = validateRAMComponent(body);
	if (error) {
		res.status(400).json({ message: error.message });
		return;
	}
	try {
		const nameRegex = new RegExp(body.name as string, 'i');
		const duplicate = await RAM.find({ name: nameRegex });
		if (duplicate) {
			res.status(409).json({ message: 'This component already exists' });
			return;
		}
		const ramComponent: IRAMComponent = await RAM.create(body);
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
	// #swagger.tags = ['RAM']
	/* #swagger.security = [{"bearerAuth": []}] */
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	const { error } = validateRAMComponentUpdate(req.body);
	if (error) {
		res.status(400).json({ message: error.message });
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

const validateRAMComponentQuery = (query: Partial<IRAMComponent>) => {
	const schema = Joi.object<IRAMComponent>({
		id: Joi.string(),
		brand: Joi.string(),
		name: Joi.string(),
		images: Joi.array(),
		series: Joi.string(),
		memoryType: Joi.string(),
		formFactor: Joi.string(),
		eccSupport: Joi.boolean(),
		baseClock: Joi.number(),
		memorySpeed: Joi.number(),
		casLatency: Joi.string(),
		voltage: Joi.number(),
	});
	return schema.validate(query);
};

const validateRAMComponentUpdate = (query: Partial<IRAMComponent>) => {
	const schema = Joi.object<IRAMComponent>({
		brand: Joi.string(),
		name: Joi.string(),
		images: Joi.array(),
		series: Joi.string(),
		memoryType: Joi.string(),
		formFactor: Joi.string(),
		eccSupport: Joi.boolean(),
		baseClock: Joi.number(),
		memorySpeed: Joi.number(),
		casLatency: Joi.string(),
		voltage: Joi.number(),
	});
	return schema.validate(query);
};

const validateRAMComponent = (ram: IRAMComponent) => {
	const schema = Joi.object<IRAMComponent>({
		brand: Joi.string().required(),
		name: Joi.string().required(),
		images: Joi.array(),
		series: Joi.string().required(),
		memoryType: Joi.string().required(),
		formFactor: Joi.string().required(),
		eccSupport: Joi.boolean().required(),
		baseClock: Joi.number().required(),
		memorySpeed: Joi.number().required(),
		casLatency: Joi.string().required(),
		voltage: Joi.number().required(),
	});
	return schema.validate(ram);
};

export default {
	getRAMComponents,
	getRAMComponentById,
	createRAMComponent,
	updateRAMComponent,
	deleteRAMComponent,
};
