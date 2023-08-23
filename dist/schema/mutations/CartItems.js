"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_ITEM_FROM_CART = exports.ADD_ITEM_TO_CART = void 0;
const graphql_1 = require("graphql");
const Cart_Item_1 = require("../typedefs/Cart_Item");
const Cart_Items_1 = require("../../entities/Cart_Items");
const Products_1 = require("../../entities/Products");
const calcTotal_1 = require("../../services/calcTotal");
const Cart_1 = require("../../entities/Cart");
const authorize_1 = require("../../services/authorize");
exports.ADD_ITEM_TO_CART = {
    type: Cart_Item_1.CartItemType,
    args: {
        product_id: { type: graphql_1.GraphQLInt },
        quantity: { type: graphql_1.GraphQLInt },
        token: { type: graphql_1.GraphQLString }
    },
    async resolve(parent, args) {
        const { product_id, quantity, token } = args;
        console.log(args);
        try {
            const obj = await (0, authorize_1.isAuthorized)(token);
            const user_id = obj.user_id;
            if (user_id === -1) {
                throw new Error("Unauthorized action");
            }
            const reqProduct = await Products_1.Products.findOneOrFail({ where: {
                    product_id: product_id
                }
            });
            const itsCart = await Cart_1.Cart.findOneOrFail({
                where: {
                    cart_id: user_id
                }
            });
            itsCart.total_amount += (0, calcTotal_1.calcTotal)(reqProduct.price, quantity);
            await Cart_1.Cart.update({ cart_id: user_id }, { total_amount: itsCart.total_amount });
            let initial = 0;
            const existingItem = await Cart_Items_1.Cart_Items.findOne({
                relations: ['cart', 'product'],
                where: {
                    cart: {
                        cart_id: user_id
                    },
                    product: {
                        product_id: product_id
                    }
                }
            });
            if (existingItem) {
                initial = existingItem.quantity;
                if ((initial + quantity) > reqProduct.quantity) {
                    throw new Error("quantity exceeds available");
                }
                const newQ = existingItem.quantity + quantity;
                const newS = (0, calcTotal_1.calcTotal)(reqProduct.price, newQ);
                const updItem = await Cart_Items_1.Cart_Items.update({ cart_item_id: existingItem.cart_item_id }, { quantity: newQ, subtotal: newS });
                return updItem;
            }
            else {
                if ((initial + quantity) > reqProduct.quantity) {
                    throw new Error("quantity exceeds available");
                }
                const cartItem = await Cart_Items_1.Cart_Items.create({
                    quantity,
                    subtotal: (0, calcTotal_1.calcTotal)(reqProduct.price, quantity),
                    product: reqProduct,
                    cart: itsCart,
                });
                await Cart_Items_1.Cart_Items.insert(cartItem);
                return cartItem;
            }
        }
        catch (_a) {
            throw new Error("Unsuccessful!");
        }
    }
};
exports.REMOVE_ITEM_FROM_CART = {
    type: Cart_Item_1.CartItemType,
    args: {
        cart_item_id: { type: graphql_1.GraphQLInt },
        token: { type: graphql_1.GraphQLString }
    },
    async resolve(parent, args) {
        const { cart_item_id, token } = args;
        try {
            const obj = await (0, authorize_1.isAuthorized)(token);
            const user_id = obj.user_id;
            if (user_id === -1) {
                throw new Error("Unauthorized action");
            }
            const item = await Cart_Items_1.Cart_Items.findOneOrFail({ where: {
                    cart_item_id: cart_item_id
                } });
            const itsCart = await Cart_1.Cart.findOneOrFail({
                where: {
                    cart_id: user_id
                }
            });
            const updatedAmt = itsCart.total_amount - item.subtotal;
            await Cart_1.Cart.update({ cart_id: user_id }, { total_amount: updatedAmt });
            await Cart_Items_1.Cart_Items.delete({ cart_item_id: cart_item_id });
            return { success: true, message: "Item successfully removed from the cart" };
        }
        catch (_a) {
            throw new Error("Unsuccessful!");
        }
    }
};
//# sourceMappingURL=CartItems.js.map