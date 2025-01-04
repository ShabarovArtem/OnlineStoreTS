import {CreateUserDto, UserDto} from "../dto";
import { User, Basket } from "../models";
import  ApiError  from "../errors/ApiError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateJwt = (id: number, email: string, role: string): string => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw ApiError.BadRequest("SECRET_KEY не определён");
    }

    return jwt.sign(
        { id, email, role },
        secretKey,
        { expiresIn: '24h' }
    );
};

export class UsersService {
    async registration(dto: CreateUserDto) {
        const { email, password } = dto;
        let { role } = dto;

        if (!email || !password) {
            throw ApiError.BadRequest('Некорректный email или password');
        }

        if (!role) {
            role = 'USER';
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с таким email уже существует');
        }

        const hashPassword = await bcrypt.hash(password, 6);
        const user = await User.create({ email, role, password: hashPassword });
        await Basket.create({ userId: user.id });

        const token = generateJwt(user.id, user.email, user.role);
        return token;
    }


    async login(dto: CreateUserDto) {
        const { email, password } = dto;
        let { role } = dto;
        if (!role) {
            role = 'USER';
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw ApiError.NotFound('Пользователь не найден');
        }

        const comparePassword = await bcrypt.compare(password, user.dataValues.password);
        if (!comparePassword) {
            throw ApiError.BadRequest('Указан неверный пароль');
        }

        const token = generateJwt(user.id, user.email, user.role);
        return token;
    }


    async check(userId: number) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.NotFound('Пользователь не найден');
        }

        const token = generateJwt(user.id, user.email, user.role);
        return token;
    }
}
