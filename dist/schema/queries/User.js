"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHECK_IF_ADMIN = exports.GET_USER_BY_ID = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../typedefs/User");
const Users_1 = require("../../entities/Users");
const authorize_1 = require("../../services/authorize");
exports.GET_USER_BY_ID = {
    type: User_1.UserType,
    args: {
        id: { type: graphql_1.GraphQLInt },
    },
    async resolve(parent, args) {
        const id = args.id;
        const reqUser = await Users_1.Users.findOne({ where: {
                user_id: id
            },
        });
        return reqUser;
    }
};
exports.CHECK_IF_ADMIN = {
    type: User_1.UserType,
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
            const reqUser = await Users_1.Users.findOne({ where: {
                    user_id: user_id
                },
            });
            return reqUser;
        }
        catch (_a) {
            throw new Error("Unsuccessful!");
        }
    }
};
//# sourceMappingURL=User.js.map