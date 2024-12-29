import 'express-async-errors';
import { TypesService } from "../services/types.service";
export class TypesController {
    typesService = new TypesService();
    async add(req, res) {
        const dto = req.body;
        const result = await this.typesService.add(dto);
        return res.json(result);
    }
    async getAll(req, res) {
        const result = await this.typesService.getAll();
        res.send(result);
    }
}
