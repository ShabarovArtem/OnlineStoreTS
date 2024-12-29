var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './user.model'; // Укажите корректный путь к модели User
import { BasketDevice } from './basketDevice.model'; // Укажите корректный путь к модели BasketDevice
let Basket = class Basket extends Model {
    userId;
    user;
    basketDevices;
};
__decorate([
    ForeignKey(() => User),
    Column,
    __metadata("design:type", Number)
], Basket.prototype, "userId", void 0);
__decorate([
    BelongsTo(() => User),
    __metadata("design:type", User)
], Basket.prototype, "user", void 0);
__decorate([
    HasMany(() => BasketDevice),
    __metadata("design:type", Array)
], Basket.prototype, "basketDevices", void 0);
Basket = __decorate([
    Table({ updatedAt: false })
], Basket);
export { Basket };
export default Basket;
