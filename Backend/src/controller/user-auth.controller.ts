import { Request, Response, NextFunction } from "express";
import { UserAuthService } from "../services/db-services/user-auth.service";
import { LOGIN_MESSAGES, REGISTER_MESSAGES } from "../constants/auth";
import { ApiResponseService } from "../services/api-response.service";
import { CustomError } from "../utils/custom-error.util";

class UserAuthController {
  // Login method
  static async loginUser(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    try {
      const token = await UserAuthService.login(username, password, next);
      if (!token) {
        throw new CustomError(LOGIN_MESSAGES.INVALID_CREDENTIALS, 401);
      }

      return ApiResponseService.apiResponse(res, 200, LOGIN_MESSAGES.LOGIN_SUCCESS, { token });
    } catch (err) {
      next(err);  
    }
  }

  // Register method
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    try {
      const newUser = await UserAuthService.register(username, password, next);
      if (!newUser) {
        throw new CustomError(REGISTER_MESSAGES.REGISTER_FAILED, 400);
      }

      return ApiResponseService.apiResponse(res, 200, REGISTER_MESSAGES.REGISTER_SUCCESS, { username: newUser.username });
    } catch (err) {
      next(err); 
    }
  }
}

export default UserAuthController;
