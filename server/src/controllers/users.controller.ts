import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";
import 'express-async-errors'; // Для автоматической обработки ошибок в async мидлварах
import {CreateUserDto, UserDto} from "../dto"; // DTO для создания пользователя
import { UsersService } from "../services/usersService";

export class UsersController {
    private usersService = new UsersService();

    // Регистрация нового пользователя
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const dto: CreateUserDto = req.body; // Достаем DTO из тела запроса
            const token = await this.usersService.registration(dto);
            res.json({ token });
        } catch (e) {
            next(e);
        }
    }

    // Авторизация пользователя
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = await this.usersService.login(email, password);
            res.json({ token });
        } catch (e) {
            next(e);
        }
    }

    // Проверка токена пользователя
    async check(req: Request, res: Response, next: NextFunction) {
        try {
            const userDto: UserDto = req.body.user; // Используем DTO, переданное в тело запроса
            if (!userDto) {
                throw ApiError.internal('Пользователь не найден');
            }

            const token = await this.usersService.check(userDto);
            return res.json({ token });
        } catch (e) {
            next(e);
        }
    }
}
