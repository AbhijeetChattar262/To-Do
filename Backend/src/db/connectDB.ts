import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { DB_MESSAGES, DB_DEFAULTS } from '../constants/DB/dbConstants'; // Adjust path as needed

dotenv.config();

// Check if required environment variables are set
const {
  DB_DIALECT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

if (!DB_DIALECT || !DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error(DB_MESSAGES.MISSING_ENV_VARS);
}

export const sequelize = new Sequelize({
  dialect: DB_DIALECT as typeof DB_DEFAULTS.DIALECT,
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD || DB_DEFAULTS.PASSWORD, // Fallback to 'root' if DB_PASSWORD is not set
  database: DB_NAME,
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log(DB_MESSAGES.CONNECTION_SUCCESS);
  })
  .catch((err) => {
    console.error(DB_MESSAGES.CONNECTION_ERROR, err);
  });

  
// Synchronize the models with the database
sequelize.sync({ alter: true }).then(() => {
  console.log(DB_MESSAGES.TABLES_CREATED_OR_UPDATED);
}).catch((error) => {
  console.error(DB_MESSAGES.SYNC_ERROR, error);
});

export default sequelize;
