import { Request, Response, NextFunction } from 'express';
import EmployeeService from '../services/EmployeeService';

class EmployeeController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const department = req.query.department as string | undefined;
      const isActive = req.query.isActive !== undefined
        ? req.query.isActive === 'true'
        : undefined;
      res.status(200).json(await EmployeeService.getAllEmployees(page, limit, { department, isActive }));
    } catch (error: any) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await EmployeeService.getEmployeeById(parseInt(req.params.id)));
    } catch (error: any) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json(await EmployeeService.createEmployee(req.body));
    } catch (error: any) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await EmployeeService.updateEmployee(parseInt(req.params.id), req.body));
    } catch (error: any) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await EmployeeService.deleteEmployee(parseInt(req.params.id));
      res.status(204).send();
    } catch (error: any) { next(error); }
  }
}

export default new EmployeeController();
