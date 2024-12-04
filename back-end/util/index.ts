import jwt from 'jsonwebtoken';
import { Role } from '../types';

export const generateJWTtoken = (payload: { user_id: number; role: Role; }): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`
    });
}

export const throwError = (message: string): never => {
    throw new Error(message);
}
