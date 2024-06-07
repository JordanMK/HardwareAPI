import { Request, Response } from 'express';
import { ComponentType, ComputerType, IComputer } from '../../types/models';
import Computer from '../../models/devices/Computer';
import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
import CPU from '../../models/components/CPU';
import RAM from '../../models/components/RAM';
import GPU from '../../models/components/GPU';

const getComputers = async (req: Request, res: Response): Promise<void> => {
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

const getComputerById = async (req: Request, res: Response): Promise<void> => {
	if (Object.values(req.query).length > 0) {
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
		const computer: IComputer | null = await Computer.findById(req.params.id)
			.populate('cpu')
			.populate('ram')
			.populate('gpu');
		if (!computer) {
			res.status(404).json({ message: 'Computer not found' });
			return;
		}
		res.status(200).json(computer);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const createComputer = async (req: Request, res: Response): Promise<void> => {
	try {
		if (
			!isValidObjectId(req.body.cpu) ||
			(req.body.gpu != undefined && !isValidObjectId(req.body.gpu)) ||
			!isValidObjectId(req.body.ram)
		) {
			res.status(400).json({ message: 'Invalid ID' });
			return;
		}
		const cpu = await CPU.findById(req.body.cpu);
		const ram = await RAM.findById(req.body.ram);
		const gpu = await GPU.findById(req.body.gpu);
		if (!cpu) {
			res
				.status(404)
				.json({ message: 'CPU with id: ' + req.body.cpu + ' was not found' });
			return;
		}
		if (req.body.gpu != undefined && !gpu) {
			res
				.status(404)
				.json({ message: 'GPU with id: ' + req.body.gpu + ' was not found' });
			return;
		}
		if (!ram) {
			res
				.status(404)
				.json({ message: 'ram with id: ' + req.body.ram + ' was not found' });
			return;
		}
		const nameRegex = new RegExp(req.body.name as string, 'i');
		const duplicate = await Computer.find({ name: nameRegex });
		if (duplicate.length > 0) {
			res.status(409).json({ message: 'This computer already exists' });
			return;
		}
		const computer = await Computer.create(req.body);
		const populated = await Computer.findById(computer.id)
			.populate('cpu')
			.populate('ram')
			.populate('gpu');
		if (!populated) {
			res.status(500).json({ message: 'Error creating computer' });
			return;
		}
		res.status(201).json(populated);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const updateComputer = async (req: Request, res: Response): Promise<void> => {
	if (!isValidObjectId(req.params.id)) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	if (
		(req.body.cpu != undefined && !isValidObjectId(req.body.cpu)) ||
		(req.body.gpu != undefined && !isValidObjectId(req.body.gpu)) ||
		(req.body.ram != undefined && !isValidObjectId(req.body.ram))
	) {
		res.status(400).json({ message: 'Invalid ID' });
		return;
	}
	const cpu = await CPU.findById(req.body.cpu);
	const ram = await RAM.findById(req.body.ram);
	const gpu = await GPU.findById(req.body.gpu);
	if (req.body.cpu != undefined && !cpu) {
		res
			.status(404)
			.json({ message: 'CPU with id: ' + req.body.cpu + ' was not found' });
		return;
	}
	if (req.body.gpu != undefined && !gpu) {
		res
			.status(404)
			.json({ message: 'GPU with id: ' + req.body.gpu + ' was not found' });
		return;
	}
	if (req.body.ram != undefined && !ram) {
		res
			.status(404)
			.json({ message: 'ram with id: ' + req.body.ram + ' was not found' });
		return;
	}
	try {
		const computer: IComputer | null = await Computer.findById(req.params.id);
		if (!computer) {
			res.status(404).json({ message: 'Computer not found' });
			return;
		}
		const updatedComputer: IComputer | null = await Computer.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		)
			.populate('cpu')
			.populate('ram')
			.populate('gpu');
		if (!updatedComputer) {
			res.status(500).json({ message: 'Error updating computer' });
			return;
		}
		console.log(updatedComputer);
		res.status(200).json(updatedComputer);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
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

export default {
	getComputers,
	getComputerById,
	createComputer,
	updateComputer,
	deleteComputer,
};
