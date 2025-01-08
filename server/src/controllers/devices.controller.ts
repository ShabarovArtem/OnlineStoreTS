import { Request, Response } from 'express';
import {CreateDeviceDto} from "../dto";
import {DeviceService} from "../services/devices.service";
import {UploadedFile} from "express-fileupload";
import ApiError from "../errors/ApiError";

export class DeviceController {

    private deviceService = new DeviceService();

    async create(req: Request<{}, {}, CreateDeviceDto>, res: Response) {
        const { name, price, typeId, brandId } = req.body;
        const img = req.files?.img;

        if (!img) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        const file = Array.isArray(img) ? img[0] : img;

        const priceParsed = parseFloat(price.toString());
        const typeIdParsed = parseInt(typeId.toString(), 10);
        const brandIdParsed = parseInt(brandId.toString(), 10);

        if (isNaN(priceParsed) || isNaN(typeIdParsed) || isNaN(brandIdParsed)) {
            return res.status(400).json({ message: 'Invalid values for price, typeId, or brandId' });
        }

        try {
            const result = await this.deviceService.create(
                { name, price: priceParsed, typeId: typeIdParsed, brandId: brandIdParsed },
                file
            );
            return res.status(201).json(result);
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.status).json({ message: error.msg });
            }

            console.error(error);
            return res.status(500).json({ message: 'Error creating device' });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const devices = await this.deviceService.getAll(req.query);
            return res.json(devices);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching devices' });
        }
    }

    async getOne(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const device = await this.deviceService.getOne(parseInt(id, 10));
            return res.json(device);
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.status).json({ message: error.msg });
            }

            console.error(error);
            return res.status(500).json({ message: 'Error fetching device' });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { deviceId } = req.body;

        try {
            if (!deviceId) {
                return res.status(400).json({ message: 'ID устройства не указан' });
            }

            // Вызываем сервис для удаления устройства
            const result = await this.deviceService.delete(deviceId);

            return res.json(result);
        } catch (error: unknown) {
            // Обрабатываем ошибку и возвращаем соответствующий ответ
            if (error instanceof ApiError) {
                return res.status(error.status).json({ message: error.message });
            }

            console.error('Ошибка при удалении устройства:', error);
            return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
        }
    }

}