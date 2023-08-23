"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEW_REVIEWS = void 0;
const graphql_1 = require("graphql");
const Reviews_1 = require("../typedefs/Reviews");
const Review_1 = require("../../entities/Review");
exports.VIEW_REVIEWS = {
    type: new graphql_1.GraphQLList(Reviews_1.ReviewType),
    args: {
        product_id: { type: graphql_1.GraphQLInt },
    },
    async resolve(parent, args) {
        const { product_id } = args;
        const reviews = await Review_1.Review.find({
            where: {
                product: { product_id },
            },
        });
        return reviews;
    },
};
//# sourceMappingURL=Reviews.js.map