import { Request, Response } from 'express';
import {CreateDeviceDto} from "../dto";
import {DeviceService} from "../services/devices.service";
import ApiError from "../errors/ApiError";

export class DeviceController {

    private deviceService = new DeviceService();

    async create(req: Request, res: Response) {
        try {
            // Проверяем наличие всех обязательных данных в теле запроса
            const { name, price, typeId, brandId } = req.body;
            const img = req.files?.img;

            if (!img) {
                return res.status(400).json({ message: 'No image file uploaded' });
            }

            const file = Array.isArray(img) ? img[0] : img;

            // Создаём DTO и передаём в сервис
            const dto: CreateDeviceDto = {
                name,
                price: parseFloat(price),
                typeId: parseInt(typeId, 10),
                brandId: parseInt(brandId, 10),
            };

            const device = await this.deviceService.create(dto, file);
            return res.status(201).json(device);
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.status).json({ message: error.msg });
            }
            console.error('Error creating device:', error);
            return res.status(500).json({ message: 'Internal server error' });
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

    async delete(req: Request, res: Response) {
        try {
            const { deviceId } = req.body;

            if (!deviceId) {
                return res.status(400).json({ message: 'deviceId is required' });
            }

            const result = await this.deviceService.delete(deviceId);
            return res.status(200).json(result);
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.status).json({ message: error.msg });
            }

            console.error('Error deleting device:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

}