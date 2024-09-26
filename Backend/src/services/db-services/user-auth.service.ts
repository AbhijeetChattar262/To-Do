import { UserAuthManager } from "../../db/db-managers/user-auth.db-manager"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { REGISTER_MESSAGES,JWT_SECRET } from "../../constants/auth";
import { UserAttributes } from "../../types/db-types";
 export class UserAuthService {
   public  static async login(username: string, password: string): Promise<string | null> {
        const user: UserAttributes | null = await UserAuthManager.findUserByUsername(username);
    
        if (!user) {
          return null;  // User not found
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;
    
        // Generate JWT token
        const token = jwt.sign(
          { id: user.id },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
    
        return token;
      }

    public   static async register(username: string, password: string): Promise<UserAttributes | null> {
        // Check if the user already exists
        const existingUser = await UserAuthManager.findUserByUsername(username);
    
        if (existingUser) {
          
          throw new Error(REGISTER_MESSAGES.USER_ALREADY_EXISTS);
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const newUser = await UserAuthManager.createUser(username, hashedPassword);
    
        return newUser;
      }
    }
    
    