import { UserAuthManager } from "../../db/db-managers/user-auth.db-manager"; 
import bcrypt from "bcrypt";
import { UserAttributes } from "../../types/db-types";
import { TokenUtils } from "../../utils/token.util";
import { NextFunction } from "express";
 export class UserAuthService {
   public  static async login(username: string, password: string, next: NextFunction): Promise<string | null> {
        const user: UserAttributes | null = await UserAuthManager.findUserByUsername(username, next);
    
        if (!user) {
          return null;  // User not found
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;
    
        // Generate JWT token
        const token = TokenUtils.generateToken(user.id);
        return token;
      }

    public static async register(username: string, password: string, next: NextFunction): Promise<UserAttributes | null> {
        // Check if the user already exists
        const existingUser = await UserAuthManager.findUserByUsername(username, next);
    
        if (existingUser) {
          return null;
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const newUser = await UserAuthManager.createUser(username, hashedPassword, next);
    
        return newUser;
      }
    }
    
    