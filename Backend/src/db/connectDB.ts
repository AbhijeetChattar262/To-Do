import { Sequelize } from 'sequelize';
import  * as dotenv from 'dotenv';

dotenv.config();

// Check if required environment variables are set
const {
  DB_DIALECT,
  DB_HOST,
  DB_USER, // Updated variable name
  DB_PASSWORD,
  DB_NAME,
} = process.env;

if (!DB_DIALECT || !DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Missing required environment variables.');
}

export const sequelize = new Sequelize({
  dialect: DB_DIALECT as 'mysql',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD || 'root', // Fallback to 'root' if DB_PASSWORD is not set
  database: DB_NAME,
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
