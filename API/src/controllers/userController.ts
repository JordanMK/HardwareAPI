import { Request, Response } from 'express';
import { IUser, UserRole } from '../types/models';
import User from '../models/User';
import bcrypt from 'bcrypt';

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users: IUser[] = await User.find();
		res.status(200).json(users);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
	try {
		const user: IUser | null = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const createUser = async (req: Request, res: Response): Promise<void> => {
	const reqBody: IUser = req.body;
	if (!reqBody.username || !reqBody.email || !reqBody.password) {
		res.status(400).json({ message: 'Missing required fields' });
		return;
	}
	try {
		const duplicate: IUser | null =
			(await User.findOne({
				username: reqBody.username,
			})) || (await User.findOne({ email: reqBody.email }));
		if (duplicate) {
			res.status(409).json({ message: 'Username already exists' });
			return;
		}
		const hashedPwd = await bcrypt.hash(
			reqBody.password,
			await bcrypt.genSalt(10)
		);
		const newUser: IUser = {
			username: reqBody.username,
			email: reqBody.email,
			password: hashedPwd,
			role: UserRole.USER,
		};
		const user: IUser = await User.create(newUser);
		const showUser: Pick<IUser, 'username' | 'email' | 'password'> = {
			username: user.username,
			email: user.email,
			password: user.password,
		};
		res.status(201).json(showUser);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const user: IUser | null = await User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.status(200).json(user);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const authUser = async (req: Request, res: Response): Promise<void> => {
	const reqBody: IUser = req.body;
	if (!reqBody.username || !reqBody.email || !reqBody.password) {
		res.status(400).json({ message: 'Missing required fields' });
		return;
	}
	try {
		const user: IUser | null = await User.findOne({
			username: reqBody.username,
		});
		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}
		const isMatch: boolean = await bcrypt.compare(
			reqBody.password,
			user.password
		);
		if (isMatch) {
			res.status(200).json({ success: `User ${user.username} is logged in!` });
		} else {
			res.status(401).json({ message: 'Incorrect password' });
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export default { getAllUsers, getUserById, createUser, authUser };