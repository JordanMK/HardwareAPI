import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';

export interface IRequest extends Request {
	id?: string;
	role?: string;
}
const auth = (req: IRequest, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ message: 'No token provided' });
	}
	if (!authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Invalid token' });
	}
	if (authHeader.split(' ')[1] == null) {
		return res.status(401).json({ message: 'No token provided' });
	}

	const token = (authHeader as string).split(' ')[1];
	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET as string,
		{},
		(err, decoded) => {
			if (err instanceof TokenExpiredError) {
				res.status(401).json({ message: 'Used Token expired' });
				return;
			} else if (err) {
				res.status(401).json({ message: 'Authentication failed' });
				return;
			}
			req.id = (decoded as JwtPayload).id;
			req.role = (decoded as JwtPayload).role;
			next();
		}
	);
};

export default auth;
