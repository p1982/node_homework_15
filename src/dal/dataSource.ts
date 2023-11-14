import { DataSource } from "typeorm";
import * as Entities from "./entity/index.ts";
import config from '../config/index.ts';
const DATABASE_URL = config.get('DATABASE_URL');
export const AppDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  url: DATABASE_URL,
  entities:[Entities.NewsPostEntity, Entities.UserEntity],
  // type: "postgres",
  // host: "localhost",
  // port: 5432,
  // username: "postgres",
  // password: "1",
  // database: "danit",
  // logging: true,
  // entities: ["src/dal/entity/*.ts"],
  synchronize: false,
  migrations: ["src/dal/migrations/*.ts"],
});
