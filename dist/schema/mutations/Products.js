"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_PRODUCT = exports.UPDATE_PRODUCT = exports.ADD_PRODUCT = void 0;
const graphql_1 = require("graphql");
const Products_1 = require("../typedefs/Products");
const Products_2 = require("../../entities/Products");
const authorize_1 = require("../../services/authorize");
exports.ADD_PRODUCT = {
    type: Products_1.ProductType,
    args: {
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLFloat },
        category: { type: graphql_1.GraphQLString },
        quantity: { type: graphql_1.GraphQLInt },
        image: { type: graphql_1.GraphQLString },
        token: { type: graphql_1.GraphQLString },
    },
    async resolve(parent, args) {
        const { name, description, price, category, quantity, image, token } = args;
        try {
            const obj = await (0, authorize_1.isAuthorized)(token);
            const user_id = obj.user_id;
            if (user_id === -1) {
                throw new Error("Unauthorized action");
            }
            if (obj.role === 'admin' && name && price && quantity)
                await Products_2.Products.insert({ name, description, price, category, quantity, image });
            return args;
        }
        catch (_a) {
            throw new Error("Unsuccessful!");
        }
    }
};
exports.UPDATE_PRODUCT = {
    type: Products_1.ProductType,
    args: {
        id: { type: graphql_1.GraphQLID },
        input: { type: Products_1.UpdateProductInputType },
        token: { type: graphql_1.GraphQLString },
    },
    async resolve(parent, args) {
        const id = args.id;
        const { token } = args;
        try {
            const obj = await (0, authorize_1.isAuthorized)(token);
            const user_id = obj.user_id;
            if (user_id === -1) {
                throw new Error("Unauthorized action");
            }
            const oldProduct = await Products_2.Products.findOne({ where: {
                    product_id: id
                },
            });
            if (obj.role === 'admin')
                await Products_2.Products.update({ product_id: id }, Object.assign(Object.assign({}, oldProduct), args.input));
            return args;
        }
        catch (_a) {
            throw new Error("Unsuccessful!");
        }
    }
};
exports.DELETE_PRODUCT = {
    type: Products_1.ProductType,
    args: {
        id: { type: graphql_1.GraphQLID },
        token: { type: graphql_1.GraphQLString },
    },
    async resolve(parent, args) {
        const id = args.id;
        const token = args.token;
        try {
            const obj = await (0, authorize_1.isAuthorized)(token);
            const user_id = obj.user_id;
            if (user_id === -1) {
                throw new Error("Unauthorized action");
            }
            if (obj.role === 'admin')
                await Products_2.Products.delete({ product_id: id });
            return args;
        }
        catch (_a) {
            throw new Error("Unsuccessful!");
        }
    }
};
//# sourceMappingURL=Products.js.map