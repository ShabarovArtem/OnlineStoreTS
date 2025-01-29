import {CreateTypeDto} from "../dto";
import ApiError from "../errors/ApiError";
import {Type} from "../models";

export class TypesService {

    async getAll() {
        const result = await Type.findAll({});
        return result;
    }

    async add(dto: CreateTypeDto) {
        const name = dto.name;

        const candidate = await Type.findOne({ where: { name } });
        if (candidate) throw ApiError.Conflict("Types with this name already exists");

        const type = new Type({ name });
        await type.save();
        return type;
    }
}