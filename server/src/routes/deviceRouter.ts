import {DeviceController} from '../controllers';
import {body, param, query} from 'express-validator';
import {authMiddleware, ValidateBody} from '../middleware';
import express from "express";

export const router = express.Router();
const deviceController = new DeviceController();

// Маршрут для создания устройства
router.post(
    '/',
    body('name').isString(),
    body('price').isNumeric(),
    body('typeId').isNumeric(),
    body('brandId').isNumeric(),
    ValidateBody,  // Этот middleware проверяет валидность тела запроса
    async (req, res) => {
        await deviceController.create(req, res);
    }
);

router.get(
    "/",
    query('brandId').optional().isInt(),
    query('typeId').optional().isInt(),
    query('limit').optional().isInt(),
    query('page').optional().isInt(),
    ValidateBody,
    async (req, res) => {
        await deviceController.getAll(req, res);
    }
);

router.get(
    "/:id",
    param('id').isInt(),
    ValidateBody,
    async (req, res) => {
        await deviceController.getOne(req, res);
    }
);

router.delete(
    "/",
    body('deviceId').isInt(),
    ValidateBody,
    async (req, res) => {
        await deviceController.delete(req, res);
    }
);