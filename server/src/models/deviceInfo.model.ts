import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Device } from './device.model';

interface DeviceInfoCreationAttrs {
    title: string;
    description: string;
    deviceId: number;
}

@Table({ updatedAt: false })
export class DeviceInfo extends Model<DeviceInfo, DeviceInfoCreationAttrs> {
    @Column({ allowNull: false })
    title!: string;

    @Column({ allowNull: false })
    description!: string;

    @ForeignKey(() => Device)
    @Column
    deviceId!: number;

    @BelongsTo(() => Device)
    device!: Device;
}

export default DeviceInfo;
