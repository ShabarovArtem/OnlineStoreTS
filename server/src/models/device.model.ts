import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';
import { Type } from './type.model';
import { Brand } from './brand.model';
import { Rating } from './rating.model';
import { BasketDevice } from './basketDevice.model';
import { DeviceInfo } from './deviceInfo.model';

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
}

export default Device;
