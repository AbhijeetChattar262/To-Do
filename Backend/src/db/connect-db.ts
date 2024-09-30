import { PrismaClient } from '@prisma/client';
import { DB_MESSAGES } from '../constants/db';
import { CustomError } from '../utils/custom-error.util';


const prisma = new PrismaClient();

async function initializeDatabase() {
  try {
    // Test the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log(DB_MESSAGES.CONNECTION_SUCCESS);

    return prisma;
  } catch (err) {
    throw new CustomError(DB_MESSAGES.CONNECTION_ERROR, 500);
  }
}

const db = initializeDatabase();
export default db;
