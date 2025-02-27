import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';
import { Device } from './device.model';

interface RatingCreationAttrs {
    rate: number;
    userId: number;
    deviceId: number;
}

@Table({ updatedAt: false })
export class Rating extends Model<Rating, RatingCreationAttrs> {
    @Column({ allowNull: false })
    rate!: number;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Device)
    @Column
    deviceId!: number;

    @BelongsTo(() => Device)
    device!: Device;
}

export default Rating;
