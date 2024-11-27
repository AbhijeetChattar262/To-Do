import { Request, Response } from "express";
import { UserAuthService } from "../services/db-services/user-auth.service";
import { LOGIN_MESSAGES, REGISTER_MESSAGES } from "../constants/auth";

class UserAuthController {

  private static validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Login method
  static async loginUser(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send(LOGIN_MESSAGES.CREDENTIALS_NEEDED);
    }

    try {
      const token = await UserAuthService.login(username, password);
      if (token) {
        res.json({ message: LOGIN_MESSAGES.LOGIN_SUCCESS, token });
      } else {
        res.status(400).json({ message: LOGIN_MESSAGES.INVALID_CREDENTIALS });
      }
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: LOGIN_MESSAGES.SERVER_ERROR });
    }

    // Use this snippet when you want to check whether user is verified or not
    // try {
    //   const result = await UserAuthService.login(username, password);
    
    //   if (result) {
    //     // Check if the user is verified
    //     if (!result.verified) {
    //       return res.status(400).json({
    //         message: LOGIN_MESSAGES.EMAIL_NOT_VERIFIED_ALERT,
    //       });
    //     }
    //   } else {
    //     return res.status(400).json({ message: LOGIN_MESSAGES.INVALID_CREDENTIALS });
    //   }
    // } catch (err) {
    //   console.error("Error during login:", err);
    //   res.status(500).json({ message: LOGIN_MESSAGES.SERVER_ERROR });
    // }
    
}

  // Register method
  static async registerUser(req: Request, res: Response) {
    const { username, password, email } = req.body;

    if (!username || !password) {
      return res.status(400).send("Credentials needed");
    }

    if (!UserAuthController.validateEmail(username)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    try {
      const newUser = await UserAuthService.register(username, password);

      if (newUser) {
        res.status(201).json({
          id: newUser.id,
          username: newUser.username,
          message: "Registration successful. Please check your email for verification.",
        });
      } else {
        res.status(400).json({ message: REGISTER_MESSAGES.USER_ALREADY_EXISTS });
      }
    } catch (err: any) {
      if (err.message === REGISTER_MESSAGES.USER_ALREADY_EXISTS) {
        return res.status(409).json({ message: REGISTER_MESSAGES.USER_ALREADY_EXISTS });
      }

      console.error(REGISTER_MESSAGES.ERROR_REGISTERING_USER, err);
      res.status(500).json({ message: REGISTER_MESSAGES.ERROR_REGISTERING_USER });
    }
  }

  static async verifyEmail(req: Request, res: Response) {
    const { token } = req.params;

    try {
      const isValid = await UserAuthService.verifyEmail(token);
      if (isValid) {
        res.send(`
          <html>
            <body>
              <h1>Email Verified Successfully!</h1>
              <p>You can now close this window and login to your account.</p>
            </body>
          </html>
        `);
      } else {
        res.status(400).send(`
          <html>
            <body>
              <h1>Verification Failed</h1>
              <p>The verification link is invalid or has expired.</p>
            </body>
          </html>
        `);
      }
    } catch (err) {
      console.error("Error during email verification:", err);
      res.status(500).send("Error during email verification");
    }
  }
  
}

export default UserAuthController;
