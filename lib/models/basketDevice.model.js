var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Basket } from './basket.model';
import { Device } from './device.model';
let BasketDevice = class BasketDevice extends Model {
    basketId;
    basket;
    deviceId;
    device;
};
__decorate([
    ForeignKey(() => Basket),
    Column,
    __metadata("design:type", Number)
], BasketDevice.prototype, "basketId", void 0);
__decorate([
    BelongsTo(() => Basket),
    __metadata("design:type", Basket)
], BasketDevice.prototype, "basket", void 0);
__decorate([
    ForeignKey(() => Device),
    Column,
    __metadata("design:type", Number)
], BasketDevice.prototype, "deviceId", void 0);
__decorate([
    BelongsTo(() => Device),
    __metadata("design:type", Device)
], BasketDevice.prototype, "device", void 0);
BasketDevice = __decorate([
    Table({ updatedAt: false })
], BasketDevice);
export { BasketDevice };
export default BasketDevice;
