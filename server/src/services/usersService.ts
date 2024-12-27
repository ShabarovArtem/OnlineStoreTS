// services/usersService.ts
import { CreateUserDto } from "../dto";
import { User, Basket } from "../models";
import { ApiError } from "../errors/ApiError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateJwt = (id: number, email: string, role: string): string => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error("SECRET_KEY is not defined");
    }

    return jwt.sign(
        { id, email, role },
        secretKey,
        { expiresIn: '24h' }
    );
};

export class UsersService {
    // Регистрация пользователя
    async registration(dto: CreateUserDto) {
        const { email, password, role } = dto;

        if (!email || !password) {
            throw ApiError.badRequest('Некорректный email или password');
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            throw ApiError.badRequest('Пользователь с таким email уже существует');
        }

        const hashPassword = await bcrypt.hash(password, 6);
        const user = await User.create({ email, role, password: hashPassword });
        await Basket.create({ userId: user.id });

        const token = generateJwt(user.id, user.email, user.role);
        return token;
    }

    // Логин пользователя
    async login(email: string, password: string) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw ApiError.internal('Пользователь не найден');
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw ApiError.internal('Указан неверный пароль');
        }

        const token = generateJwt(user.id, user.email, user.role);
        return token;
    }

    // Проверка токена
    async check(user: any) {
        const token = generateJwt(user.id, user.email, user.role);
        return token;
    }
}
