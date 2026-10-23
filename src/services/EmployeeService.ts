import EmployeeRepository from '../repositories/EmployeeRepository';
import { HttpError } from '../utils/HttpError';

class EmployeeService {
  async getAllEmployees(page: number = 1, limit: number = 10, filters?: { department?: string; isActive?: boolean }) {
    return await EmployeeRepository.findAll(page, limit, filters);
  }

  async getEmployeeById(id: number) {
    const emp = await EmployeeRepository.findById(id);
    if (!emp) throw new HttpError(404, 'Employee not found');
    return emp;
  }

  async createEmployee(data: any) {
    const existing = await EmployeeRepository.findByEmailWithDeleted(data.email);
    if (existing) throw new HttpError(409, 'Employee with this email already exists');
    return await EmployeeRepository.create(data);
  }

  async updateEmployee(id: number, data: any) {
    // If email is being updated, check uniqueness including soft-deleted employees
    if (data.email) {
      const existing = await EmployeeRepository.findByEmailWithDeleted(data.email);
      if (existing && existing.id !== id) throw new HttpError(409, 'Email already in use by another employee');
    }
    const emp = await EmployeeRepository.update(id, data);
    if (!emp) throw new HttpError(404, 'Employee not found');
    return emp;
  }

  async deleteEmployee(id: number) {
    const emp = await EmployeeRepository.softDelete(id);
    if (!emp) throw new HttpError(404, 'Employee not found');
    return emp;
  }
}

export default new EmployeeService();
