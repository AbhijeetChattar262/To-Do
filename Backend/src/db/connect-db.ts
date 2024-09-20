import * as dotenv from 'dotenv';
import { DB_MESSAGES } from '../constants/DB/dbConstants';
import {User,} from "./models/user.entity";
import {Todo} from "./models/todo.entity";
import { DataSource } from 'typeorm';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error(DB_MESSAGES.MISSING_ENV_VARS);
}

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: 3306,
  username: DB_USER,
  password: DB_PASSWORD || '',
  database: DB_NAME,
  synchronize: true, 
  logging: true,
  entities: [User, Todo], 
  migrations: [], 
  subscribers: [] 
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log(DB_MESSAGES.CONNECTION_SUCCESS);
  } catch (err) {
    console.error(DB_MESSAGES.CONNECTION_ERROR, err);
    throw err;
  }
};