import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserDto } from '../dto';

interface JwtPayload {
    id: number;
    email: string;
    role: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]; // Получаем токен из заголовка

        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload; // Декодируем токен

        // Создаем экземпляр DTO с данными пользователя
        const userDto = new UserDto(decoded.id, decoded.email, decoded.role);

        // Добавляем DTO в тело запроса
        req.body.user = userDto;

        next();
    } catch (e) {
        console.error(e);
        return res.status(401).json({ message: 'Не авторизован' });
    }
};

export default authMiddleware;
