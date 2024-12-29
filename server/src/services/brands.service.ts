import {CreateBrandDto} from "../dto";
import ApiError from "../errors/ApiError";
import {Brand} from "../models";

export class BrandsService {

    async getAll() {
        const result = await Brand.findAll({});
        return result;
    }

    async add(dto: CreateBrandDto) {
        const name = dto.name;

        // Прямой запрос для проверки, существует ли уже бренд с таким именем
        const candidate = await Brand.findOne({ where: { name } });
        if (candidate) throw ApiError.Conflict("Brand with this name already exists");

        const brand = new Brand({ name });
        await brand.save();
        return brand;
    }
}