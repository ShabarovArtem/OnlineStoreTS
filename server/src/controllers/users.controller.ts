import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/usersService";
import  ApiError  from "../errors/ApiError";
import {CreateUserDto, UserDto} from "../dto";

export interface AuthenticatedRequest extends Request {
    user?: UserDto;
}

export class UsersController {
    private usersService = new UsersService();

    async registration(req: Request, res: Response, next: NextFunction) {
        const dto: CreateUserDto = req.body;
        const token = await this.usersService.registration(dto);
        res.json({token});
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const dto: CreateUserDto = req.body;
        const token = await this.usersService.login(dto);
        res.json({token});
    }

    async check(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                throw ApiError.Unauthorized('Пользователь не авторизован');
            }

            const token = await this.usersService.check(req.user.id);
            return res.json({token});
        } catch (error) {
            next(error);
        }
    }
}

