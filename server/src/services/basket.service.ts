import { Basket, BasketDevice, Device } from "../models";
import ApiError from "../errors/ApiError";

export class BasketService {
    async addDeviceToBasket(userId: number, deviceId: number) {
        const basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            throw ApiError.BadRequest("Basket not found for this user");
        }

        const device = await Device.findOne({ where: { id: deviceId } });
        if (!device) {
            throw ApiError.BadRequest("Device not found");
        }

        const basketDevice = await BasketDevice.create({ basketId: basket.id, deviceId });
        return basketDevice;
    }

    async getAll(userId: number) {
        const basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            throw ApiError.BadRequest("Basket not found for this user");
        }

        const basketDevices = await BasketDevice.findAll({
            where: { basketId: basket.id },
            include: [{ model: Device }]
        });

        return basketDevices;
    }
}
