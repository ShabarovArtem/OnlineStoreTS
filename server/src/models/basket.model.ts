import { Table, Column, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './user.model'; // Укажите корректный путь к модели User
import { BasketDevice } from './basketDevice.model'; // Укажите корректный путь к модели BasketDevice

interface BasketCreationAttrs {
    userId: number;
}

@Table({ updatedAt: false })
export class Basket extends Model<Basket, BasketCreationAttrs> {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => BasketDevice)
    basketDevices!: BasketDevice[];
}

export default Basket;
