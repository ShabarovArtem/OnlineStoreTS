import ApiError from "../errors/ApiError";
import { Brand } from "../models";
export class BrandsService {
    async getAll() {
        const result = await Brand.findAll({});
        return result;
    }
    async add(dto) {
        const name = dto.name;
        const candidate = await this.getByTypename(name);
        if (candidate)
            throw ApiError.Conflict("Brand with this name already exists");
        const brand = new Brand({ name });
        await brand.save();
        return brand;
    }
    async getByTypename(name) {
        const result = await Brand.findOne({ where: { name } });
        return result;
    }
}
