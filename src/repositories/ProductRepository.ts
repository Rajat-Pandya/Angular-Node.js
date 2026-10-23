import Product from '../models/Product';

class ProductRepository {
  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Product.findAndCountAll({
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });
    return {
      totalItems: count,
      products: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  }

  async findById(id: number) {
    return await Product.findByPk(id);
  }

  async create(productData: any) {
    return await Product.create(productData);
  }

  async update(id: number, productData: any) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return await product.update(productData);
  }

  async softDelete(id: number) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return await product.update({ isDeleted: true });
  }
}

export default new ProductRepository();
