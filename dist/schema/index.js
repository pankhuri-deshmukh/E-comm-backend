"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const Products_1 = require("./queries/Products");
const Products_2 = require("./mutations/Products");
const User_1 = require("./mutations/User");
const CartItems_1 = require("./mutations/CartItems");
const Cart_1 = require("./queries/Cart");
const OrderItems_1 = require("./mutations/OrderItems");
const Orders_1 = require("./queries/Orders");
const User_2 = require("./queries/User");
const Reviews_1 = require("./queries/Reviews");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllProducts: Products_1.GET_ALL_PRODUCTS,
        getProductById: Products_1.GET_PRODUCT_BY_ID,
        getUserById: User_2.GET_USER_BY_ID,
        viewCart: Cart_1.VIEW_CART,
        viewOrders: Orders_1.VIEW_ALL_ORDERS,
        viewOrderDetails: Orders_1.VIEW_ORDER_DETAILS,
        checkIfAdmin: User_2.CHECK_IF_ADMIN,
        viewReviews: Reviews_1.VIEW_REVIEWS,
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addProduct: Products_2.ADD_PRODUCT,
        deleteProduct: Products_2.DELETE_PRODUCT,
        updateProduct: Products_2.UPDATE_PRODUCT,
        addUser: User_1.ADD_USER,
        loginUser: User_1.LOGIN_USER,
        addItemToCart: CartItems_1.ADD_ITEM_TO_CART,
        removeItemFromCart: CartItems_1.REMOVE_ITEM_FROM_CART,
        createOrder: OrderItems_1.CREATE_ORDER,
        cancelOrder: OrderItems_1.CANCEL_ORDER,
    }
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
//# sourceMappingURL=index.js.map