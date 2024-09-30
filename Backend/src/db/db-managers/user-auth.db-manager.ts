import { PrismaAdapter } from "../mssql/prisma.adapter";
import { UserAttributes } from "../../types/db-types";
import { NextFunction } from "express";

export class UserAuthManager {
  private static adapter = PrismaAdapter.getInstance();

  // Find a user by username
  public static async findUserByUsername(username: string, next: NextFunction): Promise<UserAttributes | null> {
    try{const userRecord = await this.adapter.findOne('User', { username }, next);
    return userRecord as UserAttributes | null;}
    catch(error) {
      next(error);
      return Promise.reject(error);
    }
  }

  // Create a new user
  public static async createUser(username: string, password: string, next: NextFunction): Promise<UserAttributes | null> {
    try {
      // Insert new user
      const newUser = await this.adapter.create('User', { username, password }, next);
      return newUser as UserAttributes;
    } catch (error) {
      next(error);
      return Promise.reject(error);
    }
  }
}

