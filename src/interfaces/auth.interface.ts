import { Request } from 'express';
import { TokenPayload } from '../utils/jwtUtils';

export interface RequestWithUser extends Request {
  user?: TokenPayload;
}
