import "reflect-metadata";
import { DataSource } from "typeorm";

console.log(`${__dirname}/entity/`);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5440,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/**/migrations/*{.ts,.js}`],
});
