import { Device, Rating } from "../models";
import ApiError from "../errors/ApiError";

export class RatingService {
    async addRating(userId: number, deviceId: number, rate: number) {
        const device = await Device.findOne({ where: { id: deviceId } });
        if (!device) {
            throw ApiError.BadRequest("Device not found");
        }

        const existingRating = await Rating.findOne({
            where: { userId, deviceId }
        });

        if (existingRating) {
            existingRating.rate = rate;
            await existingRating.save();
            return existingRating;
        } else {
            const rating = await Rating.create({ rate, userId, deviceId });
            return rating;
        }
    }

    async deleteRating(userId: number, deviceId: number) {
        const device = await Device.findOne({ where: { id: deviceId } });
        if (!device) {
            throw ApiError.BadRequest("Device not found");
        }

        const rating = await Rating.findOne({
            where: { userId, deviceId }
        });

        if (!rating) {
            throw ApiError.BadRequest("Rating not found");
        }

        await rating.destroy();
    }
}
