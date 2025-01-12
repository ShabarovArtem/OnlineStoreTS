import express from 'express';
import { BasketController } from '../controllers';
import { body } from 'express-validator';
import {AuthMiddleware, ValidateBody} from '../middleware';

export const router = express.Router();
const basketController = new BasketController();

router.post(
    "/add",
    AuthMiddleware,
    body('deviceId').isInt().withMessage('deviceId must be an integer'),
    ValidateBody,
    async (req, res) => {
        await basketController.addDeviceToBasket(req, res);
    }
);

router.get(
    "/",
    AuthMiddleware,
    async (req, res) => {
        await basketController.getAll(req, res);
    }
);
