"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_PRODUCT_BY_ID = exports.GET_ALL_PRODUCTS = void 0;
const graphql_1 = require("graphql");
const Products_1 = require("../typedefs/Products");
const Products_2 = require("../../entities/Products");
exports.GET_ALL_PRODUCTS = {
    type: new graphql_1.GraphQLList(Products_1.ProductType),
    resolve() {
        return Products_2.Products.find();
    }
};
exports.GET_PRODUCT_BY_ID = {
    type: Products_1.ProductType,
    args: {
        id: { type: graphql_1.GraphQLInt },
    },
    async resolve(parent, args) {
        const id = args.id;
        const reqProduct = await Products_2.Products.findOne({ where: {
                product_id: id
            },
        });
        return reqProduct;
    }
};
//# sourceMappingURL=Products.js.map