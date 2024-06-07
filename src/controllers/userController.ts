import { Request, Response } from 'express';
import { IUser, UserRole } from '../types/models';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { IRequest } from '../middleware/auth';

const getUserById = async (req: IRequest, res: Response): Promise<void> => {
	try {
		const user: IUser | null = await User.findById(req.id);
		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}
		const showUser: Pick<IUser, 'id' | 'username' | 'email'> = {
			id: user.id,
			username: user.username,
			email: user.email,
		};
		res.status(200).json(showUser);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const createUser = async (req: Request, res: Response): Promise<void> => {
	const reqBody: Partial<IUser> = req.body;
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
		const newUser: Pick<IUser, 'username' | 'email' | 'password' | 'role'> = {
			username: reqBody.username,
			email: reqBody.email,
			password: hashedPwd,
			role: UserRole.USER,
		};
		const user: IUser = await User.create(newUser);
		if (!user) {
			res.status(500).json({ message: 'Could not add user' });
			return;
		}
		const showUser: Pick<IUser, 'username' | 'email'> = {
			username: user.username,
			email: user.email,
		};
		res.status(201).json(showUser);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const authUser = async (req: Request, res: Response): Promise<void> => {
	const reqBody: Partial<IUser> = req.body;
	if (!reqBody.username || !reqBody.email || !reqBody.password) {
		res.status(400).json({ message: 'Missing required fields' });
		return;
	}
	try {
		const user = await User.findOne({
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

		if (!isMatch) {
			res.status(401).json({ message: 'Incorrect password' });
			return;
		}

		const accesToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		const userWithToken = await User.findByIdAndUpdate(user.id, {
			refreshToken: refreshToken,
		});
		if (!userWithToken) {
			res
				.status(500)
				.json({ message: 'An unexpected error occurred on the server.' });
			return;
		}

		res
			.status(200)
			.header('x-auth-token', accesToken)
			.cookie('jwt', refreshToken, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
			})
			.json({ success: `User ${user.username} is logged in!` });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const refreshAuthUser = async (req: Request, res: Response): Promise<void> => {
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		res.status(401).json({ message: 'No token supplied' });
		return;
	}
	try {
		const refreshToken = cookies.jwt;
		const user = await User.findOne({
			refreshToken: refreshToken,
		});

		if (!user) {
			res.status(403).json({ message: `No user found` });
			return;
		}

		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET as string,
			{},
			(err, decoded) => {
				if (err || user.id !== (decoded as JwtPayload).id) {
					if (err instanceof TokenExpiredError) {
						res.status(401).json({ message: 'Used Token expired' });
						return;
					} else {
						res.status(401).json({ message: 'Authentication failed' });
						return;
					}
				}
				const accesToken = user.generateAccessToken();
				console.log('Success');
				res
					.status(200)
					.header('x-auth-token', accesToken)
					.json({ message: 'Success' });
			}
		);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
	// On client, delete the accessToken
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		res.status(204).json({ message: 'No content' });
		return;
	}

	try {
		const refreshToken = cookies.jwt;
		const user = await User.findOne({
			refreshToken: refreshToken,
		});

		if (!user) {
			res.clearCookie('jwt', { httpOnly: true });
			res.status(204).json({ message: `No content` });
			return;
		}

		const updatedUser = await User.findByIdAndUpdate(user.id, {
			refreshToken: '',
		});

		if (!updatedUser) {
			res
				.status(500)
				.json({ message: 'An unexpected error occurred on the server.' });
			return;
		}
		res.clearCookie('jwt', { httpOnly: true }); // secure: true on https
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export default {
	getUserById,
	createUser,
	authUser,
	refreshAuthUser,
	logoutUser,
};
