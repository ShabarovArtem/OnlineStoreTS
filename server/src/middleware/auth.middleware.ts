import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {UserDto} from "../dto";

interface AuthRequest extends Request {
    user?: UserDto; // Привязка DTO пользователя
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as UserDto;
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Не авторизован' });
    }
}


