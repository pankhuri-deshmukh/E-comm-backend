"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductInputType = exports.ProductType = void 0;
const graphql_1 = require("graphql");
exports.ProductType = new graphql_1.GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        product_id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLFloat },
        category: { type: graphql_1.GraphQLString },
        quantity: { type: graphql_1.GraphQLInt },
        image: { type: graphql_1.GraphQLString },
    }),
});
exports.UpdateProductInputType = new graphql_1.GraphQLInputObjectType({
    name: 'UpdateProductInput',
    fields: {
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLFloat },
        category: { type: graphql_1.GraphQLString },
        quantity: { type: graphql_1.GraphQLInt },
        image: { type: graphql_1.GraphQLString },
    },
});
//# sourceMappingURL=Products.js.map