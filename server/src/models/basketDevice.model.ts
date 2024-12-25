import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Basket } from './basket.model';
import { Device } from './device.model';

interface BasketDeviceCreationAttrs {
    basketId: number;
    deviceId: number;
}

@Table({ updatedAt: false })
export class BasketDevice extends Model<BasketDevice, BasketDeviceCreationAttrs> {
    @ForeignKey(() => Basket)
    @Column
    basketId!: number;

    @BelongsTo(() => Basket)
    basket!: Basket;

    @ForeignKey(() => Device)
    @Column
    deviceId!: number;

    @BelongsTo(() => Device)
    device!: Device;
}

export default BasketDevice;
