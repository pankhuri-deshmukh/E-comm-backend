"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartType = void 0;
const graphql_1 = require("graphql");
exports.CartType = new graphql_1.GraphQLObjectType({
    name: "Cart",
    fields: () => ({
        cart_id: { type: graphql_1.GraphQLID },
        total_amount: { type: graphql_1.GraphQLFloat },
    })
});
//# sourceMappingURL=Cart.js.map