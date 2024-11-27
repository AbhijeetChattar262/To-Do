import { UserAuthManager } from "../../db/db-managers/user-auth.db-manager";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { REGISTER_MESSAGES, JWT_SECRET } from "../../constants/auth";
import { UserAttributes } from "../../types/db-types";
import EmailSenderService from "../email-sender.service";  // Import the dynamic email sender
import { prepareEmail } from "../../utils/prepareEmail";

export class UserAuthService {
  private static emailSender = new EmailSenderService();  // Initialize dynamic email sender

  private static generateVerificationToken(email: string): string {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
  }

  public static async login(username: string, password: string): Promise<{ token: string; verified: boolean } | null> {
    const user: UserAttributes | null = await UserAuthManager.findUserByUsername(username);

    if (!user) {
        return null; // User not found
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // Generate JWT token
    const token = jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    // // Send welcome email dynamically if the user is verified and hasn't received it before
    // if (user.verified) {
    //     const emailSent = await this.emailSender.sendWelcomeEmail(username);
    //     if (emailSent) {
    //         // Update the user record to indicate the welcome email has been sent
    //         await UserAuthManager.update(user.id, { welcomeEmailSent: true });
    //     }
    // }

    return { token, verified: user.verified };
}

  public static async register(username: string, password: string): Promise<UserAttributes | null> {
    const existingUser = await UserAuthManager.findUserByUsername(username);
    const token = this.generateVerificationToken(username);
    const verificationLink = `${process.env.BACKEND_URL || 'https://todo-app-b-h20n.onrender.com'}/${token}`;


    if (existingUser) {
      throw new Error(REGISTER_MESSAGES.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserAuthManager.createUser(username, hashedPassword);
    
    // Sending verification email dynamically
    await this.emailSender.sendVerificationEmail(username,verificationLink);
    
    return newUser;
  }

  public static async verifyEmail(token: string): Promise<boolean> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
      const user = await UserAuthManager.findUserByUsername(decoded.email);
      
      if (!user) {
        return false;
      }

      // Update user's verified status
      await UserAuthManager.updateUserVerification(decoded.email);
      return true;
    } catch (error) {
      return false;
    }
  }
}
