"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemType = void 0;
const graphql_1 = require("graphql");
const Products_1 = require("./Products");
const Orders_1 = require("./Orders");
exports.OrderItemType = new graphql_1.GraphQLObjectType({
    name: "Order_Items",
    fields: () => ({
        item_id: { type: graphql_1.GraphQLID },
        quantity: { type: graphql_1.GraphQLInt },
        subtotal: { type: graphql_1.GraphQLFloat },
        product: { type: Products_1.ProductType },
        order: { type: Orders_1.OrderType }
    })
});
//# sourceMappingURL=Order_Item.js.map