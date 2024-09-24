import { PrismaAdapter } from "../mongoDb/prisma.adapter";
import { UserAttributes } from "../../types/db-types";

export class AuthManager {
  private static adapter = PrismaAdapter.getInstance();

  // Find a user by username
  public static async findUserByUsername(username: string): Promise<UserAttributes | null> {
    const userRecord = await this.adapter.findOne('User', { username });
    return userRecord as UserAttributes | null;
  }

  // Create a new user
  public static async createUser(username: string, password: string): Promise<UserAttributes | null> {
    try {
      // Insert new user
      const newUser = await this.adapter.create('User', { username, password });
      return newUser as UserAttributes;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  }
}