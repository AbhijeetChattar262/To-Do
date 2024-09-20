import { TypeORMAdapter } from "../mysql/typeorm.adapter";
import { AppDataSource } from "../connect-db"; 
import { UserAttributes } from "../../types/db-types";

export class AuthManager {
  public static async findUserByUsername(username: string): Promise<UserAttributes | null> {
    const adapter = await TypeORMAdapter.getInstance(AppDataSource);

    const userRecord = await adapter.findOne('User', { where: { username } });

    if (userRecord) {
      return userRecord as UserAttributes;
    }
    
    return null;
  }

  public static async createUser(username: string, password: string): Promise<UserAttributes | null> {
    const adapter = await TypeORMAdapter.getInstance(AppDataSource);

    await adapter.create('User', { username, password });

    const newUser = await adapter.findOne('User', { where: { username } });

    if (newUser) {
      return newUser as UserAttributes;
    }
    
    return null;
  }
}