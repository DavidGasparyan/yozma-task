import "reflect-metadata";
import { DataSource } from "typeorm";
import {Question} from "./entity/Question.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5440,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [Question],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});
