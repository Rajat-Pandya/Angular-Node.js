import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { validateRequest, registerSchema, loginSchema } from '../middleware/validation.middleware';

const router = Router();
router.post('/register', validateRequest(registerSchema), AuthController.register);
router.post('/login', validateRequest(loginSchema), AuthController.login);
export default router;
