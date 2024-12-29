export class CreateUserDto {
    email: string; // Обязательное поле
    password: string; // Обязательное поле
    role?: string; // Необязательное поле, если не указано, будет 'USER'
}