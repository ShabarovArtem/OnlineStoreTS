import express from 'express';
import { UsersController } from '../controllers';
import { body } from 'express-validator';
import {authMiddleware, ValidateBody} from '../middleware';
// import authMiddleware from "../middleware/auth.middleware";


export const router = express.Router();
const usersController = new UsersController();

router.post("/register",
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
    ValidateBody,
    async (req, res, next) => {
        await usersController.registration(req, res, next);
    }
);

router.post("/login",
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').notEmpty().withMessage('Пароль не может быть пустым'),
    ValidateBody,
    async (req, res, next) => {
        await usersController.login(req, res, next);
    }
);

router.get("/auth",
    authMiddleware,
    async (req, res, next) => {
        await usersController.check(req, res, next);
    });
