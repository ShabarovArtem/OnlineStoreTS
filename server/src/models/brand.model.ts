import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Device } from './device.model';
import { Type } from './type.model';
import { TypeBrand } from './typeBrand.model';

interface BrandCreationAttrs {
    name: string;
}

@Table({ updatedAt: false })
export class Brand extends Model<Brand, BrandCreationAttrs> {
    @Column({ unique: true, allowNull: false })
    name!: string;

    @HasMany(() => Device)
    devices!: Device[];

    @BelongsToMany(() => Type, () => TypeBrand)
    types!: Type[];
}

export default Brand;
