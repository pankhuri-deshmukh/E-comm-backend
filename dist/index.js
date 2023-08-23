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
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const Products_1 = require("./entities/Products");
const Password_Reset_1 = require("./entities/Password_Reset");
const Review_1 = require("./entities/Review");
const Users_1 = require("./entities/Users");
const Orders_1 = require("./entities/Orders");
const Order_Items_1 = require("./entities/Order_Items");
const Cart_1 = require("./entities/Cart");
const Cart_Items_1 = require("./entities/Cart_Items");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const main = async () => {
    const connectDB = await new typeorm_1.DataSource({
        type: "mysql",
        database: process.env.DATABASE,
        host: process.env.HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [Products_1.Products, Password_Reset_1.Password_Reset, Review_1.Review, Users_1.Users, Orders_1.Orders, Order_Items_1.OrderItem, Cart_1.Cart, Cart_Items_1.Cart_Items],
        connectTimeout: 60000,
    });
    connectDB.initialize()
        .then(() => {
        console.log("Data Source has been initialized!");
    })
        .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
        schema: schema_1.schema,
        graphiql: true,
    }));
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`SERVER RUNNING ON PORT ${PORT}...`);
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map