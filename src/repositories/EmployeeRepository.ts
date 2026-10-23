import Employee from '../models/Employee';

class EmployeeRepository {
  async findAll(page: number, limit: number, filters?: { department?: string; isActive?: boolean }) {
    const offset = (page - 1) * limit;
    const where: any = {};
    if (filters?.department) where.department = filters.department;
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;

    const { count, rows } = await Employee.findAndCountAll({
      where,
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });

    return {
      totalItems: count,
      employees: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  }

  async findById(id: number) {
    return await Employee.findByPk(id);
  }

  async findByEmail(email: string) {
    return await Employee.findOne({ where: { email } });
  }

  async findByEmailWithDeleted(email: string) {
    return await Employee.scope('withDeleted').findOne({ where: { email } });
  }

  async create(data: any) {
    return await Employee.create(data);
  }

  async update(id: number, data: any) {
    const emp = await Employee.findByPk(id);
    if (!emp) return null;
    return await emp.update(data);
  }

  async softDelete(id: number) {
    const emp = await Employee.findByPk(id);
    if (!emp) return null;
    return await emp.update({ isDeleted: true });
  }
}

export default new EmployeeRepository();
