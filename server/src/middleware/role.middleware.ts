import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserDto } from '../dto';
import ApiError from '../errors/ApiError';

interface AuthenticatedRequest extends Request {
    user?: UserDto;
}

export function RoleMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw ApiError.Unauthorized('Токен отсутствует');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw ApiError.Unauthorized('Токен отсутствует');
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as UserDto;

        if (decoded.role.trim().toUpperCase() !== 'ADMIN') {
            throw ApiError.Forbidden('Нет доступа. Требуется роль ADMIN');
        }

        req.user = decoded;
        next();
    } catch (error) {
        next(ApiError.Unauthorized('Не авторизован'));
    }
}
