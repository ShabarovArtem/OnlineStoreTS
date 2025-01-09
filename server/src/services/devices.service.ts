import { Device } from '../models/device.model';
import {CreateDeviceDto, GetDevicesQuery} from '../dto';
import ApiError from '../errors/ApiError';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';

export class DeviceService {
    async create(dto: CreateDeviceDto, img: UploadedFile) {
        const { name, price, typeId, brandId } = dto;

        const existingDevice = await Device.findOne({ where: { name } });
        if (existingDevice) {
            throw ApiError.Conflict(`Device with the name "${name}" already exists`);
        }

        const fileName = `${uuidv4()}.jpg`;

        await img.mv(path.resolve(__dirname, '..', 'static', fileName));

        const device = await Device.create({
            name,
            price,
            typeId,
            brandId,
            img: fileName,
        });

        return device;
    }

    async getAll(query: GetDevicesQuery) {
        let {brandId, typeId, limit, page} = query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        const brandIdStr = brandId ? brandId.toString() : undefined;
        const typeIdStr = typeId ? typeId.toString() : undefined;

        let devices;

        if (!brandIdStr && !typeIdStr) {
            devices = await Device.findAndCountAll({limit, offset});
        } else if (brandIdStr && !typeIdStr) {
            devices = await Device.findAndCountAll({where: {brandId: brandIdStr}, limit, offset});
        } else if (!brandIdStr && typeIdStr) {
            devices = await Device.findAndCountAll({where: {typeId: typeIdStr}, limit, offset});
        } else if (brandIdStr && typeIdStr) {
            devices = await Device.findAndCountAll({where: {brandId: brandIdStr, typeId: typeIdStr}, limit, offset});
        }

        return devices;
    }

    async getOne(id: number) {
        const device = await Device.findOne({
            where: {id}
        });

        if (!device) {
            throw ApiError.NotFound(`Device with ID ${id} not found`);
        }

        return device;
    }

    async delete(deviceId: number): Promise<{ message: string }> {
        try {
            const device = await Device.findOne({ where: { id: deviceId } });
            if (!device) {
                throw ApiError.NotFound('Устройство не найдено');
            }

            await device.destroy();

            return { message: 'Устройство успешно удалено' };
        } catch (error: unknown) {
            throw ApiError.BadRequest('Не удалось удалить устройство');
        }
    }
}
