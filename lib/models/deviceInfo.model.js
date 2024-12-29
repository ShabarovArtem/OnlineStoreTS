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
import { Device } from './device.model';
let DeviceInfo = class DeviceInfo extends Model {
    title;
    description;
    deviceId;
    device;
};
__decorate([
    Column({ allowNull: false }),
    __metadata("design:type", String)
], DeviceInfo.prototype, "title", void 0);
__decorate([
    Column({ allowNull: false }),
    __metadata("design:type", String)
], DeviceInfo.prototype, "description", void 0);
__decorate([
    ForeignKey(() => Device),
    Column,
    __metadata("design:type", Number)
], DeviceInfo.prototype, "deviceId", void 0);
__decorate([
    BelongsTo(() => Device),
    __metadata("design:type", Device)
], DeviceInfo.prototype, "device", void 0);
DeviceInfo = __decorate([
    Table({ updatedAt: false })
], DeviceInfo);
export { DeviceInfo };
export default DeviceInfo;
