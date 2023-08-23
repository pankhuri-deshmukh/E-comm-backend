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
exports.Cart_Items = void 0;
const typeorm_1 = require("typeorm");
const Cart_1 = require("./Cart");
const Products_1 = require("./Products");
let Cart_Items = exports.Cart_Items = class Cart_Items extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cart_Items.prototype, "cart_item_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Cart_Items.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Cart_Items.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cart_1.Cart, cart => cart.cartItems),
    (0, typeorm_1.JoinColumn)({ name: 'cart_id' }),
    __metadata("design:type", Cart_1.Cart)
], Cart_Items.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Products_1.Products, product => product.cItems),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", Products_1.Products)
], Cart_Items.prototype, "product", void 0);
exports.Cart_Items = Cart_Items = __decorate([
    (0, typeorm_1.Entity)()
], Cart_Items);
//# sourceMappingURL=Cart_Items.js.map