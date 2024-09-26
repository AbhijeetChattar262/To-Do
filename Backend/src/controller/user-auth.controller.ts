import { Request, Response } from "express";
import { UserAuthService } from "../services/db-services/user-auth.service";
import { LOGIN_MESSAGES, REGISTER_MESSAGES } from "../constants/auth";
import { ApiResponseService } from "../services/api-response.service";

class UserAuthController {
  // Login method
  static async loginUser(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const token = await UserAuthService.login(username, password);
      if (token) {
        return ApiResponseService.apiResponse(res, 200, LOGIN_MESSAGES.LOGIN_SUCCESS, { token: token });
      }
      return ApiResponseService.apiResponse(res, 401, LOGIN_MESSAGES.INVALID_CREDENTIALS);
      
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: LOGIN_MESSAGES.SERVER_ERROR });
    }
  }

  // Register method
  static async registerUser(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const newUser = await UserAuthService.register(username, password);

      if (newUser) {
        res.status(201).json({
          id: newUser.id,
          username: newUser.username,
        });
      } else {
        res.status(400).json({ message: REGISTER_MESSAGES.USER_ALREADY_EXISTS });
      }
    } catch (err: any) {
      if (err.message === REGISTER_MESSAGES.USER_ALREADY_EXISTS) {
        return res.status(400).json({ message: REGISTER_MESSAGES.USER_ALREADY_EXISTS });
      }

      console.error(REGISTER_MESSAGES.ERROR_REGISTERING_USER, err);
      res.status(500).json({ message: REGISTER_MESSAGES.ERROR_REGISTERING_USER });
    }
  }
}

export default UserAuthController;
