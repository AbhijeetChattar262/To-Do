// services/AuthService.ts
import { UserManager } from "../DbManager/UserManager";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {  JWT_SECRET } from "../constants/AUTH/loginConstants";
import { UserAttributes } from "../db/Types/UserType";

class AuthService {
  static async login(username: string, password: string): Promise<string | null> {
    const user: UserAttributes | null = await UserManager.findUserByUsername(username);

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
}

export { AuthService };
