import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../types/models';
import auth from './auth';

interface IRequest extends Request {
	role?: UserRole;
}
const verifyRole = (...allowedRoles: UserRole[]) => {
	return (req: IRequest, res: Response, next: NextFunction) => {
		if (!req?.role) {
			return res.status(401).json({ message: '' });
		}
		const roles = [...allowedRoles];
		const result = roles.includes(req.role);
		if (!result) {
			return res.status(403).json({
				message: 'You do not have permissions to access this route resource',
			});
		}
		next();
	};
};

export default verifyRole;
