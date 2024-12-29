import ApiError from "../errors/ApiError";
import { Type } from "../models";
export class TypesService {
    async getAll() {
        const result = await Type.findAll({});
        return result;
    }
    async add(dto) {
        const name = dto.name;
        const candidate = await this.getByTypename(name);
        if (candidate)
            throw ApiError.Conflict("Types with this name already exists");
        const type = new Type({ name });
        await type.save();
        return type;
    }
    async getByTypename(name) {
        const result = await Type.findOne({ where: { name } });
        return result;
    }
}
