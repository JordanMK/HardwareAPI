import express from 'express';
import userController from '../../controllers/userController';
const router = express.Router();

router.route('/').get(userController.refreshAuthUser);

export const refresh = router;
