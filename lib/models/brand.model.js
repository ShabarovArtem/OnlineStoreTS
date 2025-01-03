var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Device } from './device.model';
import { Type } from './type.model';
import { TypeBrand } from './typeBrand.model';
let Brand = class Brand extends Model {
    name;
    devices;
    types;
};
__decorate([
    Column({ unique: true, allowNull: false }),
    __metadata("design:type", String)
], Brand.prototype, "name", void 0);
__decorate([
    HasMany(() => Device),
    __metadata("design:type", Array)
], Brand.prototype, "devices", void 0);
__decorate([
    BelongsToMany(() => Type, () => TypeBrand),
    __metadata("design:type", Array)
], Brand.prototype, "types", void 0);
Brand = __decorate([
    Table({ updatedAt: false })
], Brand);
export { Brand };
export default Brand;
