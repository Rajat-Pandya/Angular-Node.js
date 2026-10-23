import User from '../models/User';

class UserRepository {
  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }
  async findById(id: number) {
    return await User.findByPk(id);
  }
  async create(userData: any) {
    return await User.create(userData);
  }
}

export default new UserRepository();
