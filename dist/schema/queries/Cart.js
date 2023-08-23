"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEW_CART = void 0;
const graphql_1 = require("graphql");
const Cart_Item_1 = require("../typedefs/Cart_Item");
const Cart_Items_1 = require("../../entities/Cart_Items");
const authorize_1 = require("../../services/authorize");
exports.VIEW_CART = {
    type: new graphql_1.GraphQLList(Cart_Item_1.CartItemType),
    args: {
        token: { type: graphql_1.GraphQLString }
    },
    async resolve(parent, args) {
        const { token } = args;
        try {
            const obj = await (0, authorize_1.isAuthorized)(token);
            const user_id = obj.user_id;
            if (user_id === -1) {
                throw new Error("Unauthorized action");
            }
            return Cart_Items_1.Cart_Items.find({
                relations: ['cart', 'product'],
                where: {
                    cart: {
                        cart_id: user_id
                    }
                }
            });
        }
        catch (_a) {
            throw new Error("Unsuccessful!");
        }
    }
};
//# sourceMappingURL=Cart.js.map