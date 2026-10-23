import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/HttpError';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof HttpError ? err.statusCode : (err.status || err.statusCode || 500);
  const message = err.message || 'Internal Server Error';
  console.error(`[Error] ${statusCode} - ${message}`);
  res.status(statusCode).json({ status: 'error', statusCode, message });
};
