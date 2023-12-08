import { Router } from 'express';
import UserController from '../controllers/userController.js';
import isLoggedIn from '../middleware/authentication.js';

const router = Router();

router.get('/dashboard', isLoggedIn,  UserController.dashboard);

export default router;
