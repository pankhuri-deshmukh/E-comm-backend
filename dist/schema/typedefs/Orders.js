"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderType = void 0;
const graphql_1 = require("graphql");
const User_1 = require("./User");
exports.OrderType = new graphql_1.GraphQLObjectType({
    name: "Orders",
    fields: () => ({
        order_id: { type: graphql_1.GraphQLID },
        payment_status: { type: graphql_1.GraphQLString },
        total_amount: { type: graphql_1.GraphQLFloat },
        order_status: { type: graphql_1.GraphQLString },
        user: { type: User_1.UserType }
    }),
});
//# sourceMappingURL=Orders.js.map