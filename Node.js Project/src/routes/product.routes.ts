import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRequest, productSchema } from '../middleware/validation.middleware';

const router = Router();
router.use(authMiddleware);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/', validateRequest(productSchema), ProductController.create);
router.put('/:id', validateRequest(productSchema), ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;
