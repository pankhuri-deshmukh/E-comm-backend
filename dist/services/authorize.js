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
exports.isAuthorized = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const Users_1 = require("../entities/Users");
dotenv.config({ path: __dirname + '/.env' });
const isAuthorized = async (token) => {
    const secret_string = process.env.PROTECTED_STRING;
    const decodedToken = jsonwebtoken_1.default.verify(token, secret_string);
    const user_id = decodedToken.user_id;
    const itsUser = await Users_1.Users.findOneOrFail({ where: {
            user_id: user_id
        } });
    if (decodedToken.email !== itsUser.email) {
        const returnObj = {
            user_id: -1,
            role: itsUser.role,
        };
        return returnObj;
    }
    return {
        user_id: user_id,
        role: itsUser.role,
    };
};
exports.isAuthorized = isAuthorized;
//# sourceMappingURL=authorize.js.map