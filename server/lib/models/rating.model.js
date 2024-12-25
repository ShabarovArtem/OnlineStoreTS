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
import { User } from './user.model'; // Укажите корректный путь к модели User
import { Device } from './device.model'; // Укажите корректный путь к модели Device
let Rating = class Rating extends Model {
    rate;
    userId;
    user;
    deviceId;
    device;
};
__decorate([
    Column({ allowNull: false }),
    __metadata("design:type", Number)
], Rating.prototype, "rate", void 0);
__decorate([
    ForeignKey(() => User),
    Column,
    __metadata("design:type", Number)
], Rating.prototype, "userId", void 0);
__decorate([
    BelongsTo(() => User),
    __metadata("design:type", User)
], Rating.prototype, "user", void 0);
__decorate([
    ForeignKey(() => Device),
    Column,
    __metadata("design:type", Number)
], Rating.prototype, "deviceId", void 0);
__decorate([
    BelongsTo(() => Device),
    __metadata("design:type", Device)
], Rating.prototype, "device", void 0);
Rating = __decorate([
    Table({ updatedAt: false })
], Rating);
export { Rating };
export default Rating;
