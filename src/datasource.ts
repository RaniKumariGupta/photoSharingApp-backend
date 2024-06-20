import "reflect-metadata"
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./entity/UserEntity";
import { Photo } from "./entity/photoEntity";

dotenv.config();

export const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Photo ],
    logging: false,
    synchronize: true,
   
});


