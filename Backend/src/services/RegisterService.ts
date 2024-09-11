import { RegisterManager } from "../DbManager/RegisterManager";
import bcrypt from "bcrypt";
import { UserAttributes } from "../db/Types/UserType";
import { REGISTER_MESSAGES } from "../constants/AUTH/registerConstants";

class RegisterService{
    static async register(username: string, password: string): Promise<UserAttributes | null> {
      // Check if the user already exists
      const existingUser = await RegisterManager.findUserByUsername(username);
  
      if (existingUser) {
        
        throw new Error(REGISTER_MESSAGES.USER_ALREADY_EXISTS);
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = await RegisterManager.createUser(username, hashedPassword);
  
      return newUser;
    }
  }
  
  export { RegisterService};
