"use strict";
// import express from 'express';
// import { UsersController } from '../controllers';
// import { body } from 'express-validator';
// import { ValidateBody } from '../middleware';
// import authMiddleware from "../middleware/auth.middleware"; // Импортируем middleware для валидации
//
//
// export const router = express.Router();
// const usersController = new UsersController();
//
// // Регистрация нового пользователя
// router.post("/register",
//     body('email').isEmail().withMessage('Некорректный email'), // Валидация email
//     body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'), // Валидация пароля
//     ValidateBody, // Валидация тела запроса
//     async (req, res, next) => { // Контроллер для регистрации
//         await usersController.registration(req, res, next);
//     }
// );
//
// // Логин пользователя
// router.post("/login",
//     body('email').isEmail().withMessage('Некорректный email'), // Валидация email
//     body('password').notEmpty().withMessage('Пароль не может быть пустым'), // Валидация пароля
//     ValidateBody, // Валидация тела запроса
//     async (req, res, next) => {
//         await usersController.login(req, res, next);
//     }
// );
//
// // Проверка токена
// router.get("/check",
//     authMiddleware, // Middleware для проверки токена
//     async (req, res, next) => {
//         await usersController.check(req, res, next);
//     }
// );
