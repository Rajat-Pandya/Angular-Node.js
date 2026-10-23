import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((d: any) => d.message).join(', ');
      return res.status(400).json({ message: errorMessage });
    }
    next();
  };
};

// --- Auth Schemas ---
export const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// --- Product Schemas ---
export const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required()
});

// --- Employee Schemas ---
export const employeeSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('', null),
  department: Joi.string().required(),
  designation: Joi.string().required(),
  salary: Joi.number().positive().required(),
  joiningDate: Joi.date().required(),
  isActive: Joi.boolean().optional()
});

export const updateEmployeeSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().allow('', null).optional(),
  department: Joi.string().optional(),
  designation: Joi.string().optional(),
  salary: Joi.number().positive().optional(),
  joiningDate: Joi.date().optional(),
  isActive: Joi.boolean().optional()
}).min(1);
