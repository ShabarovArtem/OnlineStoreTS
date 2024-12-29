"use strict";
// // controllers/usersController.ts
// import { Request, Response, NextFunction } from "express";
// import { UsersService } from "../services/usersService";
// import  ApiError  from "../errors/ApiError";
// import {CreateUserDto, UserDto} from "../dto";
//
// export class UsersController {
//     private usersService = new UsersService();
//
//     // Регистрация нового пользователя
//     async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
//         try {
//             const dto: CreateUserDto = req.body; // Достаем DTO из тела запроса
//             const token = await this.usersService.registration(dto);
//             res.json({ token });
//         } catch (e) {
//             next(e); // Передаем ошибку в middleware обработки ошибок
//         }
//     }
//
//     // Логин пользователя
//     async login(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { email, password } = req.body;
//             const token = await this.usersService.login(email, password);
//             res.json({ token });
//         } catch (e) {
//             next(e);
//         }
//     }
//
//     // Проверка токена пользователя
//     async check(req: Request, res: Response, next: NextFunction) {
//         try {
//             const userDto: UserDto = req.user; // Данные пользователя, добавленные middleware
//             if (!userDto) {
//                 throw ApiError.internal('Пользователь не найден');
//             }
//
//             const token = await this.usersService.check(userDto);
//             return res.json({ token });
//         } catch (e) {
//             next(e);
//         }
//     }
// }
