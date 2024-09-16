import { DrizzleAdapter } from "../mysql/drizzle.adapter";
import { usersTable } from "../models/schema";
import { UserAttributes } from "../../types/db-types";

export class AuthManager {
  // Find a user by username
  public static async findUserByUsername(username: string): Promise<UserAttributes | null> {
    const adapter = await DrizzleAdapter.getInstance();

    const userRecord = await adapter.findOne(usersTable, usersTable.username, username);

    if (userRecord) {
      return userRecord as UserAttributes;
    }
    
    return null;
  }

  // Create a new user
  public static async createUser(username: string, password: string): Promise<UserAttributes | null> {
    const adapter = await DrizzleAdapter.getInstance();

    // Insert new user
    await adapter.create(usersTable, { username, password });

    const newUser = await adapter.findOne(usersTable, usersTable.username, username);

    if (newUser) {
      return newUser as UserAttributes;
    }
    
    return null;
  }
}
