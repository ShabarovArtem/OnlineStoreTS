import { Request, Response } from "express";
import 'express-async-errors';
import { CreateBrandDto } from "../dto";
import { BrandsService } from "../services/brands.service";
import { validationResult } from "express-validator";

export class BrandsController {

    private brandsService = new BrandsService();

    async add(req: Request<{}, {}, CreateBrandDto>, res: Response) {
        const dto = req.body;

        const result = await this.brandsService.add(dto);

        return res.json(result)
    }

    async getAll(req: Request, res: Response) {
        const result = await this.brandsService.getAll();
        res.send(result);
    }
}