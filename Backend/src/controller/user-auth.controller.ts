import { Request, Response, NextFunction } from "express";
import { UserAuthService } from "../services/db-services/user-auth.service";
import { ApiResponseService } from "../services/api-response.service";
import { CustomError } from "../utils/custom-error.util";
import { API_RESPONSES } from "../constants";

class UserAuthController {
  // Login method
  static async loginUser(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    try {
      const token = await UserAuthService.login(username, password, next);
      if (!token) {
        throw new CustomError(API_RESPONSES.CONTROLLER.INVALID_CREDENTIALS.message, API_RESPONSES.CONTROLLER.INVALID_CREDENTIALS.code);
      }

      return ApiResponseService.apiResponse(res, API_RESPONSES.CONTROLLER.LOGIN_SUCCESS.code, API_RESPONSES.CONTROLLER.LOGIN_SUCCESS.message, { token });
    } catch (err) {
      if (err instanceof CustomError) {
        next(err);
      }
      next(new CustomError(API_RESPONSES.CONTROLLER.LOGIN_FAILED.message, API_RESPONSES.CONTROLLER.LOGIN_FAILED.code));
    }
  }

  // Register method
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    try {
      const newUser = await UserAuthService.register(username, password, next);
      if (!newUser) {
        throw new CustomError(API_RESPONSES.CONTROLLER.USER_ALREADY_EXISTS.message, API_RESPONSES.CONTROLLER.USER_ALREADY_EXISTS.code);
      }

      return ApiResponseService.apiResponse(res, API_RESPONSES.CONTROLLER.REGISTER_SUCCESS.code, API_RESPONSES.CONTROLLER.REGISTER_SUCCESS.message, { username: newUser.username });
    } catch (err) {
      if (err instanceof CustomError) {
        next(err);
      }
      next(new CustomError(API_RESPONSES.CONTROLLER.REGISTER_FAILED.message, API_RESPONSES.CONTROLLER.REGISTER_FAILED.code));
    }
  }
}

export default UserAuthController;
