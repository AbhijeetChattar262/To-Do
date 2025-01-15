import { PrismaAdapter } from "../mssql/prisma.adapter";
import { UserAttributes } from "../../types/db-types";
import { NextFunction } from "express";
import { CustomError } from "../../utils/custom-error.util";
import { API_RESPONSES } from "../../constants";

export class UserAuthManager {
  private static adapter = PrismaAdapter.getInstance();

  // Find a user by username
  public static async findUserByUsername(username: string, next: NextFunction): Promise<UserAttributes | null> {
    try{const userRecord = await this.adapter.findOne('User', { username });
    return userRecord as UserAttributes | null;}
    catch(error) {
      throw new CustomError(API_RESPONSES.DB.FIND_USER_BY_USERNAME_FAILED.message, API_RESPONSES.DB.FIND_USER_BY_USERNAME_FAILED.code);
    }
  }

  // Create a new user
  public static async createUser(username: string, password: string, next: NextFunction): Promise<UserAttributes | null> {
    try {
      // Insert new user
      const newUser = await this.adapter.create('User', { username, password });
      return newUser as UserAttributes;
    } catch (error) {
      throw new CustomError(API_RESPONSES.DB.CREATE_USER_FAILED.message, API_RESPONSES.DB.CREATE_USER_FAILED.code);;
    }
  }
}

