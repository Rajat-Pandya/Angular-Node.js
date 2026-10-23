import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: any) { next(error); }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json({ message: 'Login successful', ...result });
    } catch (error: any) { next(error); }
  }
}

export default new AuthController();
