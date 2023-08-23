"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_REVIEW = void 0;
const graphql_1 = require("graphql");
const Reviews_1 = require("../typedefs/Reviews");
const Review_1 = require("../../entities/Review");
const Products_1 = require("../../entities/Products");
const Users_1 = require("../../entities/Users");
exports.ADD_REVIEW = {
    type: Reviews_1.ReviewType,
    args: {
        product_id: { type: graphql_1.GraphQLInt },
        user_id: { type: graphql_1.GraphQLInt },
        rating: { type: graphql_1.GraphQLInt },
        comment: { type: graphql_1.GraphQLString },
    },
    async resolve(parent, args) {
        const { product_id, user_id, rating, comment } = args;
        const user = await Users_1.Users.findOne({ where: {
                user_id: user_id
            },
        });
        const product = await Products_1.Products.findOne({ where: {
                product_id: product_id
            },
        });
        if (!user || !product) {
            throw new Error('User or Product not found');
        }
        const newReview = Review_1.Review.create({
            rating,
            comment,
            user,
            product,
        });
        await Review_1.Review.insert(newReview);
        return newReview;
    },
};
//# sourceMappingURL=Reviews.js.map