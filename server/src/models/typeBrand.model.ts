import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Type } from './type.model'; // Укажите корректный путь к модели Type
import { Brand } from './brand.model'; // Укажите корректный путь к модели Brand

interface TypeBrandCreationAttrs {
    typeId: number;
    brandId: number;
}

@Table({ updatedAt: false })
export class TypeBrand extends Model<TypeBrand, TypeBrandCreationAttrs> {
    @ForeignKey(() => Type)
    @Column
    typeId!: number;

    @ForeignKey(() => Brand)
    @Column
    brandId!: number;
}

export default TypeBrand;
