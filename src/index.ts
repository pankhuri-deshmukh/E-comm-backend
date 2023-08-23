import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import cors from "cors";
import { DataSource } from "typeorm";
import {Products} from './entities/Products'
import { Password_Reset } from "./entities/Password_Reset";
import { Review } from "./entities/Review";
import { Users } from "./entities/Users";
import { Orders } from "./entities/Orders";
import { OrderItem } from "./entities/Order_Items";
import { Cart } from "./entities/Cart";
import { Cart_Items } from "./entities/Cart_Items";
import * as dotenv from "dotenv"

dotenv.config()


const main = async () => {
  const connectDB = await new DataSource({
    type: "mysql",
    database: process.env.DATABASE,
    host: process.env.HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Products, Password_Reset, Review, Users, Orders, OrderItem, Cart, Cart_Items],
    connectTimeout: 60000,
  });

  connectDB.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}...`);
  });
};

main().catch((err) => {
  console.log(err);
});