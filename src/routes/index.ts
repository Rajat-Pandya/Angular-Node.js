import { Router } from 'express';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';
import employeeRoutes from './employee.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/employees', employeeRoutes);

export default router;
