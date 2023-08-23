"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CANCEL_ORDER = exports.CREATE_ORDER = void 0;
const graphql_1 = require("graphql");
const Cart_1 = require("../../entities/Cart");
const Orders_1 = require("../typedefs/Orders");
const Orders_2 = require("../../entities/Orders");
const Users_1 = require("../../entities/Users");
const Cart_Items_1 = require("../../entities/Cart_Items");
const Order_Items_1 = require("../../entities/Order_Items");
const Products_1 = require("../../entities/Products");
const authorize_1 = require("../../services/authorize");
exports.CREATE_ORDER = {
    type: Orders_1.OrderType,
    args: {
        payment_status: { type: graphql_1.GraphQLString },
        token: { type: graphql_1.GraphQLString }
    },
    async resolve(parent, args) {
        const { payment_status, token } = args;
        try {
            const obj = await (0, authorize_1.isAuthorized)(token);
            const user_id = obj.user_id;
            if (user_id === -1) {
                throw new Error("Unauthorized action");
            }
            const userCart = await Cart_1.Cart.findOneOrFail({ where: {
                    cart_id: user_id
                }
            });
            const user = await Users_1.Users.findOneOrFail({ where: {
                    user_id: user_id
                }
            });
            const newOrder = await Orders_2.Orders.create({
                payment_status,
                total_amount: userCart.total_amount,
                user: user,
                order_status: 'confirmed'
            });
            Orders_2.Orders.insert(newOrder);
            await Cart_1.Cart.update({ cart_id: user_id }, { total_amount: 0.00 });
            const cartItems = await Cart_Items_1.Cart_Items.find({
                relations: ['cart', 'product'],
                where: {
                    cart: {
                        cart_id: user_id
                    }
                }
            });
            console.log(cartItems);
            for (const cartItem of cartItems) {
                if (!(cartItem.product.quantity >= cartItem.quantity)) {
                    continue;
                }
                const orderItem = Order_Items_1.OrderItem.create({
                    product: cartItem.product,
                    quantity: cartItem.quantity,
                    subtotal: cartItem.subtotal,
                    order: newOrder,
                });
                await Order_Items_1.OrderItem.insert(orderItem);
                await Products_1.Products.update({ product_id: cartItem.product.product_id }, { quantity: cartItem.product.quantity - cartItem.quantity });
            }
            await Cart_Items_1.Cart_Items.delete({
                cart: {
                    cart_id: user_id
                }
            });
            return newOrder;
        }
        catch (_a) {
            throw new Error("Unsuccessful!");
        }
    }
};
exports.CANCEL_ORDER = {
    type: Orders_1.OrderType,
    args: {
        order_id: { type: graphql_1.GraphQLInt },
        token: { type: graphql_1.GraphQLString }
    },
    async resolve(parent, args) {
        const { order_id, token } = args;
        try {
            const obj = await (0, authorize_1.isAuthorized)(token);
            const user_id = obj.user_id;
            if (user_id === -1) {
                throw new Error("Unauthorized action");
            }
            const canOrder = await Orders_2.Orders.update({ order_id: order_id }, { order_status: 'cancelled' });
            const orderItems = await Order_Items_1.OrderItem.find({
                relations: ['order', 'product'],
                where: {
                    order: {
                        order_id: order_id
                    }
                }
            });
            for (const orderItem of orderItems) {
                await Products_1.Products.update({ product_id: orderItem.product.product_id }, { quantity: orderItem.product.quantity + orderItem.quantity });
            }
            return canOrder;
        }
        catch (_a) {
            throw new Error("Unsuccessful!");
        }
    }
};
//# sourceMappingURL=OrderItems.js.map