import 'express-async-errors';
import { BrandsService } from "../services/brands.service";
export class BrandsController {
    brandsService = new BrandsService();
    async add(req, res) {
        const dto = req.body;
        const result = await this.brandsService.add(dto);
        return res.json(result);
    }
    async getAll(req, res) {
        const result = await this.brandsService.getAll();
        res.send(result);
    }
}
