import jwt from 'jsonwebtoken';
import { AuthPayload } from '../types';

export const generateJWTtoken = (payload: AuthPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`
    });
}

export const throwError = (message: string): never => {
    throw new Error(message);
}
