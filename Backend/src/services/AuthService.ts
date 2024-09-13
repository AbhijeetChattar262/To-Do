import {AuthManager} from "../DbManager/AuthManager";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {  JWT_SECRET } from "../constants/AUTH/loginConstants";
import { REGISTER_MESSAGES } from "../constants/AUTH/registerConstants";
import { UserAttributes } from "../db/Types/UserType";
 export class AuthService {
   public  static async login(username: string, password: string): Promise<string | null> {
        const user: UserAttributes | null = await AuthManager.findUserByUsername(username);
    
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
        const existingUser = await AuthManager.findUserByUsername(username);
    
        if (existingUser) {
          
          throw new Error(REGISTER_MESSAGES.USER_ALREADY_EXISTS);
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const newUser = await AuthManager.createUser(username, hashedPassword);
    
        return newUser;
      }
    }
    
    