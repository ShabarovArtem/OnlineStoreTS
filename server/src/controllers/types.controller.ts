import { Request, Response } from "express";
import 'express-async-errors';
import { CreateTypeDto } from "../dto";
import { TypesService } from "../services/types.service";
import { validationResult } from "express-validator";

export class TypesController {

    private typesService = new TypesService();

    async add(req: Request<{}, {}, CreateTypeDto>, res: Response) {
        const dto = req.body;

        const result = await this.typesService.add(dto);

        return res.json(result)
    }

    async getAll(req: Request, res: Response) {
        const result = await this.typesService.getAll();
        res.send(result);
    }
}