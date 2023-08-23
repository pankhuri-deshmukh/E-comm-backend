"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginType = exports.UserType = void 0;
const graphql_1 = require("graphql");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: "Users",
    fields: () => ({
        user_id: { type: graphql_1.GraphQLID },
        role: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        token: { type: graphql_1.GraphQLString },
    })
});
exports.UserLoginType = new graphql_1.GraphQLObjectType({
    name: "UserLoginInput",
    fields: () => ({
        password: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        token: { type: graphql_1.GraphQLString },
    })
});
//# sourceMappingURL=User.js.map