import bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import { generateAccessToken, TokenPayload } from '../utils/jwtUtils';
import { HttpError } from '../utils/HttpError';

class AuthService {
  async register(userData: { username: string; email: string; password: string; role?: string }) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) throw new HttpError(409, 'User already exists');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password, salt);

    const newUser = await UserRepository.create({
      username: userData.username,
      email: userData.email,
      passwordHash,
      role: userData.role || 'user'
    });

    return { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role };
  }

  async login(loginData: { email: string; password: any }) {
    const user = await UserRepository.findByEmail(loginData.email);
    if (!user || !user.passwordHash || !loginData.password) throw new HttpError(401, 'Invalid credentials');

    const isValid = await bcrypt.compare(loginData.password, user.passwordHash);
    if (!isValid) throw new HttpError(401, 'Invalid credentials');

    const payload: TokenPayload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);

    return {
      accessToken,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    };
  }
}

export default new AuthService();
