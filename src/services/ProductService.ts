import ProductRepository from '../repositories/ProductRepository';
import { HttpError } from '../utils/HttpError';

class ProductService {
  async getAllProducts(page: number = 1, limit: number = 10) {
    return await ProductRepository.findAll(page, limit);
  }

  async getProductById(id: number) {
    const product = await ProductRepository.findById(id);
    if (!product) throw new HttpError(404, 'Product not found');
    return product;
  }

  async createProduct(productData: any) {
    return await ProductRepository.create(productData);
  }

  async updateProduct(id: number, productData: any) {
    const product = await ProductRepository.update(id, productData);
    if (!product) throw new HttpError(404, 'Product not found');
    return product;
  }

  async deleteProduct(id: number) {
    const product = await ProductRepository.softDelete(id);
    if (!product) throw new HttpError(404, 'Product not found');
    return product;
  }
}

export default new ProductService();
