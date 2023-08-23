"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Order_Items_1 = require("./Order_Items");
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["SUCCESSFUL"] = "successful";
    PaymentStatus["FAILED"] = "failed";
})(PaymentStatus || (PaymentStatus = {}));
let Orders = exports.Orders = class Orders extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Orders.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Orders.prototype, "total_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PaymentStatus }),
    __metadata("design:type", String)
], Orders.prototype, "payment_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Orders.prototype, "order_status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, user => user.orders),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Users_1.Users)
], Orders.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_Items_1.OrderItem, orderItem => orderItem.order),
    __metadata("design:type", Array)
], Orders.prototype, "orderItems", void 0);
exports.Orders = Orders = __decorate([
    (0, typeorm_1.Entity)()
], Orders);
//# sourceMappingURL=Orders.js.map