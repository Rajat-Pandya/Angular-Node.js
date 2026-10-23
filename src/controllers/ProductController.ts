import { Request, Response, NextFunction } from 'express';
import ProductService from '../services/ProductService';

class ProductController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      res.status(200).json(await ProductService.getAllProducts(page, limit));
    } catch (error: any) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await ProductService.getProductById(parseInt(req.params.id)));
    } catch (error: any) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json(await ProductService.createProduct(req.body));
    } catch (error: any) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await ProductService.updateProduct(parseInt(req.params.id), req.body));
    } catch (error: any) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ProductService.deleteProduct(parseInt(req.params.id));
      res.status(204).send();
    } catch (error: any) { next(error); }
  }
}

export default new ProductController();
