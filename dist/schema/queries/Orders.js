"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEW_ORDER_DETAILS = exports.VIEW_ALL_ORDERS = void 0;
const graphql_1 = require("graphql");
const Orders_1 = require("../typedefs/Orders");
const Orders_2 = require("../../entities/Orders");
const Order_Item_1 = require("../typedefs/Order_Item");
const Order_Items_1 = require("../../entities/Order_Items");
const authorize_1 = require("../../services/authorize");
exports.VIEW_ALL_ORDERS = {
    type: new graphql_1.GraphQLList(Orders_1.OrderType),
    args: {
        token: { type: graphql_1.GraphQLString }
    },
    async resolve(parent, args) {
        const { token } = args;
        try {
            const obj = await (0, authorize_1.isAuthorized)(token);
            const user_id = obj.user_id;
            if (user_id === -1) {
                throw new Error("Unauthorized action");
            }
            return Orders_2.Orders.find({
                relations: ['user',],
                where: {
                    user: {
                        user_id: user_id
                    }
                }
            });
        }
        catch (_a) {
            throw new Error("Unsuccessful!");
        }
    }
};
exports.VIEW_ORDER_DETAILS = {
    type: new graphql_1.GraphQLList(Order_Item_1.OrderItemType),
    args: {
        order_id: { type: graphql_1.GraphQLInt },
        token: { type: graphql_1.GraphQLString }
    },
    async resolve(parent, args) {
        const { order_id, token } = args;
        console.log(args);
        try {
            const obj = await (0, authorize_1.isAuthorized)(token);
            const user_id = obj.user_id;
            if (user_id === -1) {
                throw new Error("Unauthorized action");
            }
            return Order_Items_1.OrderItem.find({
                relations: ['order', 'product'],
                where: {
                    order: {
                        order_id: order_id
                    }
                }
            });
        }
        catch (_a) {
            throw new Error("Unsuccessful!");
        }
    }
};
//# sourceMappingURL=Orders.js.map