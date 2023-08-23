"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemType = void 0;
const graphql_1 = require("graphql");
const Products_1 = require("./Products");
const Cart_1 = require("./Cart");
exports.CartItemType = new graphql_1.GraphQLObjectType({
    name: "Cart_Items",
    fields: () => ({
        cart_item_id: { type: graphql_1.GraphQLID },
        quantity: { type: graphql_1.GraphQLInt },
        subtotal: { type: graphql_1.GraphQLFloat },
        product: { type: Products_1.ProductType },
        cart: { type: Cart_1.CartType },
    })
});
//# sourceMappingURL=Cart_Item.js.map