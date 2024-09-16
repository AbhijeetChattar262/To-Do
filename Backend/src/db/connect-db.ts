import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import { DB_MESSAGES } from "../constants/DB/dbConstants";


dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error(DB_MESSAGES.MISSING_ENV_VARS);
}

async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD || '',
      database: DB_NAME,
    });

    const db = drizzle(connection);

    // Test the connection
    await connection.query('SELECT 1');
    console.log(DB_MESSAGES.CONNECTION_SUCCESS);

    return db;
  } catch (err) {
    console.error(DB_MESSAGES.CONNECTION_ERROR, err);
    throw err;
  }
}

const db = initializeDatabase();
export default db;
