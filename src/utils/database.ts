import Knex from "knex";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} from "./env";

const db = Knex({
  client: 'postgres',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    ssl: false,
  }
});

export { db };