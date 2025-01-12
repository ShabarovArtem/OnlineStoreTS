import { Request, Response } from "express";
import 'express-async-errors';
import ApiError from "../errors/ApiError";
import { BasketService } from "../services/basket.service";
import jwt from "jsonwebtoken";

export class BasketController {
    private basketService = new BasketService();

    private extractUserIdFromToken(req: Request): number {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw ApiError.Unauthorized("Authorization header is missing");
        }

        const token = authHeader.split(" ")[1];
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            throw ApiError.Internal("SECRET_KEY is not defined");
        }

        try {
            const decoded = jwt.verify(token, secretKey) as { id: number };
            return decoded.id;
        } catch (error) {
            throw ApiError.Unauthorized("Invalid token");
        }
    }

    async addDeviceToBasket(req: Request, res: Response) {
        const userId = this.extractUserIdFromToken(req);
        const { deviceId } = req.body;

        if (!deviceId) {
            throw ApiError.BadRequest("Device ID is required");
        }

        const result = await this.basketService.addDeviceToBasket(userId, deviceId);
        res.json(result);
    }

    async getAll(req: Request, res: Response) {
        const userId = this.extractUserIdFromToken(req);

        const result = await this.basketService.getAll(userId);
        res.json(result);
    }
}
