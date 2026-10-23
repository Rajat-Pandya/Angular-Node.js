import { Router } from 'express';
import EmployeeController from '../controllers/EmployeeController';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRequest, employeeSchema, updateEmployeeSchema } from '../middleware/validation.middleware';

const router = Router();
router.use(authMiddleware);
router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.post('/', validateRequest(employeeSchema), EmployeeController.create);
router.put('/:id', validateRequest(updateEmployeeSchema), EmployeeController.update);
router.delete('/:id', EmployeeController.delete);

export default router;
