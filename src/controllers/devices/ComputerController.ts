import { Request, Response } from 'express';
import { ComponentType, ComputerType, IComputer } from '../../types/models';
import Computer from '../../models/devices/Computer';
import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

const getComputers = async (req: Request, res: Response): Promise<void> => {
	const query: Partial<IComputer> =
		Object.values(req.query).length > 0 ? req.query : req.body;
	// const tranformedQuery = transformDotNotation(query);
	// const { error } = validateCPUComponentQuery(tranformedQuery);
	// if (error) {
	// 	res.status(400).json({ message: error.message });
	// 	return;
	// }
	try {
		const computers: IComputer[] = await Computer.find()
			.populate('cpu')
			.populate('ram')
			.populate('gpu');
		res.status(200).json(computers);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const createComputer = async (req: Request, res: Response): Promise<void> => {
	const body: IComputer = req.body;
	const { error } = validateComputer(body);
	if (error) {
		res.status(400).json({ message: error.message });
		return;
	}
	try {
		const nameRegex = new RegExp(body.name as string, 'i');
		const duplicate = await Computer.find({ name: nameRegex });
		console.log(duplicate);
		if (duplicate.length > 0) {
			res.status(409).json({ message: 'This computer already exists' });
			return;
		}
		const computer: IComputer = await Computer.create(body);
		if (!computer) {
			res.status(500).json({ message: 'Error creating computer' });
		}
		res.status(201).json(computer);
	} catch (error: any) {
		const errorDetails = { message: error.message };
		res.status(500).json(errorDetails);
	}
};

const deleteComputer = async (req: Request, res: Response): Promise<void> => {
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	try {
		const deleted: IComputer | null = await Computer.findByIdAndDelete(
			req.params.id
		);
		if (!deleted) {
			res.status(404).json({ message: 'Computer not found' });
			return;
		}
		res.status(200).json(deleted);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const validateComputer = (computer: IComputer) => {
	const schema = Joi.object<IComputer>({
		brand: Joi.string().required(),
		name: Joi.string().required(),
		images: Joi.array(),
		computerType: Joi.string()
			.allow(...Object.values(ComponentType))
			.required(),
		cpu: Joi.string().required(),
		gpu: Joi.string(),
		ram: Joi.string().required(),
		ramModules: Joi.number().required(),
		ramCapacity: Joi.number().required(),
	});
	return schema.validate(computer);
};

export default {
	getComputers,
	createComputer,
	deleteComputer,
};
