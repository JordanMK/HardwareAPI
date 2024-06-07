import express from 'express';
import RAMController from '../../../../controllers/components/RAMController';
import auth from '../../../../middleware/auth';
import verifyRole from '../../../../middleware/verifyRole';
import { UserRole } from '../../../../types/models';
import validator from '../../../../middleware/validator';

const router = express.Router();

router
	.route('/:id')
	.get(RAMController.getRAMComponentById)
	.put(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		validator('ramUpdateSchema', 'body'),
		RAMController.updateRAMComponent
	)
	.delete(auth, verifyRole(UserRole.ADMIN), RAMController.deleteRAMComponent);

router
	.route('/')
	.get(validator('ramQuerySchema', 'query'), RAMController.getRAMComponents)
	.post(
		auth,
		verifyRole(UserRole.ADMIN, UserRole.USER),
		validator('ramCreateSchema', 'body'),
		RAMController.createRAMComponent
	);

export const RAMComponents = router;
