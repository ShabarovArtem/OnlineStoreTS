import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Basket } from './basket.model';
import { Rating } from './rating.model';

interface UserCreationAttrs {
    email: string;
    password: string;
    role?: string;
}

@Table({ updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {
    @Column({ unique: true })
    email!: string;

    @Column
    password!: string;

    @Column({ defaultValue: 'USER' })
    role!: string;

    @HasMany(() => Basket)
    baskets!: Basket[];

    @HasMany(() => Rating)
    ratings!: Rating[];
}

export default User;
