import { Router } from 'express';

import userController from './UserController.js';

const router = Router();

router.use('/user', userController);

export default router;
