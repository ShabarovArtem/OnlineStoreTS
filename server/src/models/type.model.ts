import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Device } from './device.model';
import { Brand } from './brand.model';
import { TypeBrand } from './typeBrand.model';

interface TypeCreationAttrs {
    name: string;
}

@Table({ updatedAt: false })
export class Type extends Model<Type, TypeCreationAttrs> {
    @Column({ unique: true, allowNull: false })
    name!: string;

    @HasMany(() => Device)
    devices!: Device[];

    @BelongsToMany(() => Brand, () => TypeBrand)
    brands!: Brand[];
}

export default Type;
