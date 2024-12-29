"use strict";
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
//
// const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//     // Если метод OPTIONS, пропускаем дальше
//     if (req.method === 'OPTIONS') {
//         return next();
//     }
//
//     try {
//         // Получаем токен из заголовка
//         const token = req.headers.authorization?.split(' ')[1];
//
//         // Если токен отсутствует, возвращаем ошибку
//         if (!token) {
//             res.status(401).json({ message: 'Не авторизован' });
//             return;  // Просто завершите выполнение здесь
//         }
//
//         // Декодируем токен
//         const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id: number, email: string, role: string };
//
//         // Добавляем данные пользователя в объект запроса
//         req.user = decoded;
//
//         // Переходим к следующему middleware
//         next();
//     } catch (e) {
//         console.error(e);
//         res.status(401).json({ message: 'Не авторизован' });
//     }
// };
//
// export default authMiddleware;
//
