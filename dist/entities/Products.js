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
exports.Products = void 0;
const typeorm_1 = require("typeorm");
const Review_1 = require("./Review");
const Cart_Items_1 = require("./Cart_Items");
const Order_Items_1 = require("./Order_Items");
let Products = exports.Products = class Products extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Products.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Products.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Products.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Review_1.Review, review => review.product),
    __metadata("design:type", Array)
], Products.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cart_Items_1.Cart_Items, citems => citems.product),
    __metadata("design:type", Array)
], Products.prototype, "cItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_Items_1.OrderItem, oitems => oitems.product),
    __metadata("design:type", Array)
], Products.prototype, "oItems", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)()
], Products);
//# sourceMappingURL=Products.js.map