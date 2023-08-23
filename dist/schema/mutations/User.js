"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN_USER = exports.ADD_USER = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../typedefs/User");
const Users_1 = require("../../entities/Users");
const Cart_1 = require("../../entities/Cart");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/.env' });
exports.ADD_USER = {
    type: User_1.UserType,
    args: {
        name: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString }
    },
    async resolve(parent, args) {
        const { name, username, password, email } = args;
        const existingUser = await Users_1.Users.findOne({ where: {
                email: email
            } });
        if (existingUser) {
            throw new Error("This email already exists.");
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const cart = await Cart_1.Cart.create({
            total_amount: 0,
        });
        await Cart_1.Cart.insert(cart);
        const uid = cart.cart_id;
        const user = await Users_1.Users.create({
            name,
            username,
            password: hashedPassword,
            email,
            user_id: uid,
        });
        const secret_string = process.env.PROTECTED_STRING;
        const token = jsonwebtoken_1.default.sign({ user_id: user.user_id, email, role: user.role }, secret_string, {
            expiresIn: "3h"
        });
        user.cart = cart;
        user.token = token;
        await Users_1.Users.insert(user);
        return user;
    }
};
exports.LOGIN_USER = {
    type: User_1.UserLoginType,
    args: {
        password: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString }
    },
    async resolve(parent, args) {
        const { password, email } = args;
        const user = await Users_1.Users.findOne({ where: {
                email: email
            } });
        if (user && (await bcryptjs_1.default.compare(password, user.password))) {
            const secret_string = process.env.PROTECTED_STRING;
            const token = jsonwebtoken_1.default.sign({ user_id: user.user_id, email, role: user.role }, secret_string, {
                expiresIn: "3h"
            });
            user.token = token;
            await Users_1.Users.save(user);
            return user;
        }
        else {
            throw new Error("Login failed.");
        }
    }
};
//# sourceMappingURL=User.js.map