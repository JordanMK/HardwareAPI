import { Request, Response } from 'express';
import Component from '../../models/components/Component';
import { ComponentType, IComponent } from '../../types/models';
import { isValidObjectId } from 'mongoose';
import Joi from 'joi';
import { transformDotNotation } from '../queryController';

const getComponentTypes = (req: Request, res: Response) => {
	res.status(200).json(Object.values(ComponentType));
};

const getComponents = async (req: Request, res: Response): Promise<void> => {
	const query: Partial<IComponent> = req.query;
	const tranformedQuery = transformDotNotation(query);
	const { error } = validateComponentQuery(tranformedQuery);
	if (error) {
		res.status(400).json({ message: 'Invalid query' });
		return;
	}
	try {
		const components: IComponent[] = await Component.find(query);
		res.status(200).json(components);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const getComponentById = async (req: Request, res: Response): Promise<void> => {
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	try {
		const component: IComponent | null = await Component.findById(
			req.params.id
		);
		if (!component) {
			res.status(404).json({ message: 'Component not found' });
			return;
		}
		res.status(200).json(component);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const deleteComponent = async (req: Request, res: Response): Promise<void> => {
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	try {
		const deleted: IComponent | null = await Component.findByIdAndDelete(
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

const validateComponentQuery = (query: Partial<IComponent>) => {
	const schema = Joi.object<IComponent>({
		id: Joi.string(),
		brand: Joi.string(),
		name: Joi.string(),
		componentType: Joi.string(),
		images: Joi.array().items(Joi.string()),
	});
	return schema.validate(query);
};

export default {
	getComponents,
	getComponentById,
	deleteComponent,
	getComponentTypes,
};
