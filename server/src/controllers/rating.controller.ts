import { Request, Response } from "express";
import 'express-async-errors';
import ApiError from "../errors/ApiError";
import { RatingService } from "../services/rating.service";
import jwt from "jsonwebtoken";

export class RatingController {
    private ratingService = new RatingService();

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

    async addRating(req: Request, res: Response) {
        const userId = this.extractUserIdFromToken(req);
        const { deviceId, rate } = req.body;

        if (rate < 1 || rate > 5) {
            throw ApiError.BadRequest("Rating must be between 1 and 5");
        }

        const result = await this.ratingService.addRating(userId, deviceId, rate);
        res.json(result);
    }

    async deleteRating(req: Request, res: Response) {
        const userId = this.extractUserIdFromToken(req);
        const { deviceId } = req.body;

        await this.ratingService.deleteRating(userId, deviceId);
        res.json({ message: "Rating successfully deleted" });
    }
}
