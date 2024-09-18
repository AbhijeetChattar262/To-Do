import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { DB_MESSAGES } from '../constants/DB/dbConstants';

dotenv.config();

const prisma = new PrismaClient();

async function initializeDatabase() {
  try {
    // Test the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log(DB_MESSAGES.CONNECTION_SUCCESS);

    return prisma;
  } catch (err) {
    console.error(DB_MESSAGES.CONNECTION_ERROR, err);
    throw err;
  }
}

const db = initializeDatabase();
export default db;