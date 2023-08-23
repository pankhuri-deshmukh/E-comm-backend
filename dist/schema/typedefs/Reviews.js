"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewType = void 0;
const graphql_1 = require("graphql");
const User_1 = require("./User");
const Products_1 = require("./Products");
exports.ReviewType = new graphql_1.GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        review_id: { type: graphql_1.GraphQLInt },
        rating: { type: graphql_1.GraphQLInt },
        comment: { type: graphql_1.GraphQLString },
        user: { type: User_1.UserType },
        product: { type: Products_1.ProductType },
    }),
});
//# sourceMappingURL=Reviews.js.map