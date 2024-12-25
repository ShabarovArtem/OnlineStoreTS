var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';
import { Type } from './type.model'; // Укажите корректный путь к модели Type
import { Brand } from './brand.model'; // Укажите корректный путь к модели Brand
import { Rating } from './rating.model'; // Укажите корректный путь к модели Rating
import { BasketDevice } from './basketDevice.model'; // Укажите корректный путь к модели BasketDevice
import { DeviceInfo } from './deviceInfo.model'; // Укажите корректный путь к модели DeviceInfo
let Device = class Device extends Model {
    name;
    price;
    rating;
    img;
    typeId;
    type;
    brandId;
    brand;
    ratings;
    basketDevices;
    deviceInfos;
};
__decorate([
    Column({ unique: true, allowNull: false }),
    __metadata("design:type", String)
], Device.prototype, "name", void 0);
__decorate([
    Column({ allowNull: false }),
    __metadata("design:type", Number)
], Device.prototype, "price", void 0);
__decorate([
    Column({ type: DataType.DECIMAL(2, 1), defaultValue: 0 }),
    __metadata("design:type", Number)
], Device.prototype, "rating", void 0);
__decorate([
    Column({ allowNull: false }),
    __metadata("design:type", String)
], Device.prototype, "img", void 0);
__decorate([
    ForeignKey(() => Type),
    Column,
    __metadata("design:type", Number)
], Device.prototype, "typeId", void 0);
__decorate([
    BelongsTo(() => Type),
    __metadata("design:type", Type)
], Device.prototype, "type", void 0);
__decorate([
    ForeignKey(() => Brand),
    Column,
    __metadata("design:type", Number)
], Device.prototype, "brandId", void 0);
__decorate([
    BelongsTo(() => Brand),
    __metadata("design:type", Brand)
], Device.prototype, "brand", void 0);
__decorate([
    HasMany(() => Rating),
    __metadata("design:type", Array)
], Device.prototype, "ratings", void 0);
__decorate([
    HasMany(() => BasketDevice),
    __metadata("design:type", Array)
], Device.prototype, "basketDevices", void 0);
__decorate([
    HasMany(() => DeviceInfo, { as: 'info' }),
    __metadata("design:type", Array)
], Device.prototype, "deviceInfos", void 0);
Device = __decorate([
    Table({ updatedAt: false })
], Device);
export { Device };
export default Device;
