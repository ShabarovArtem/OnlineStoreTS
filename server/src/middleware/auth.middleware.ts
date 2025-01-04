import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {UserDto} from "../dto";
import ApiError from '../errors/ApiError';

// Интерфейс для типизации запроса с пользователем
interface AuthenticatedRequest extends Request {
    user?: UserDto;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw ApiError.Unauthorized('Токен отсутствует');
        }

        // Bearer token: разделяем строку на тип токена и сам токен
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw ApiError.Unauthorized('Токен отсутствует');
        }

        // Проверка токена с использованием секретного ключа
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as UserDto;

        req.user = decoded; // Сохраняем информацию о пользователе в req.user
        next();
    } catch (error) {
        console.error('Ошибка при проверке токена:', error);
        next(ApiError.Unauthorized('Не авторизован'));
    }
}

