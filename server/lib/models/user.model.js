var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Basket } from './basket.model';
import { Rating } from './rating.model';
let User = class User extends Model {
    email;
    password;
    role;
    baskets;
    ratings;
};
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({ defaultValue: 'USER' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    HasMany(() => Basket),
    __metadata("design:type", Array)
], User.prototype, "baskets", void 0);
__decorate([
    HasMany(() => Rating),
    __metadata("design:type", Array)
], User.prototype, "ratings", void 0);
User = __decorate([
    Table({ updatedAt: false })
], User);
export { User };
export default User;
