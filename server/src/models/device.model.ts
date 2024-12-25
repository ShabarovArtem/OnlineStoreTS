import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';
import { Type } from './type.model'; // Укажите корректный путь к модели Type
import { Brand } from './brand.model'; // Укажите корректный путь к модели Brand
import { Rating } from './rating.model'; // Укажите корректный путь к модели Rating
import { BasketDevice } from './basketDevice.model'; // Укажите корректный путь к модели BasketDevice
import { DeviceInfo } from './deviceInfo.model'; // Укажите корректный путь к модели DeviceInfo

interface DeviceCreationAttrs {
    name: string;
    price: number;
    img: string;
    typeId: number;
    brandId: number;
}

@Table({ updatedAt: false })
export class Device extends Model<Device, DeviceCreationAttrs> {
    @Column({ unique: true, allowNull: false })
    name!: string;

    @Column({ allowNull: false })
    price!: number;

    @Column({ type: DataType.DECIMAL(2, 1), defaultValue: 0 })
    rating!: number;

    @Column({ allowNull: false })
    img!: string;

    @ForeignKey(() => Type)
    @Column
    typeId!: number;

    @BelongsTo(() => Type)
    type!: Type;

    @ForeignKey(() => Brand)
    @Column
    brandId!: number;

    @BelongsTo(() => Brand)
    brand!: Brand;

    @HasMany(() => Rating)
    ratings!: Rating[];

    @HasMany(() => BasketDevice)
    basketDevices!: BasketDevice[];

    @HasMany(() => DeviceInfo, { as: 'info' })
    deviceInfos!: DeviceInfo[];
}

export default Device;
