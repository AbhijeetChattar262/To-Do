import { Request, Response, NextFunction } from "express";
import { UserAuthService } from "../services/db-services/user-auth.service";
import { LOGIN_MESSAGES, REGISTER_MESSAGES } from "../constants/auth";
import { ApiResponseService } from "../services/api-response.service";

class UserAuthController {
  // Login method
  static async loginUser(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    try {
      const token = await UserAuthService.login(username, password);
      if (!token) {
        return ApiResponseService.apiResponse(res, 401, LOGIN_MESSAGES.INVALID_CREDENTIALS);
      } 
      return ApiResponseService.apiResponse(res, 200, LOGIN_MESSAGES.LOGIN_SUCCESS, { token });

    } catch (err) {
      next(err);
    }
  }

  // Register method
  static async registerUser(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const newUser = await UserAuthService.register(username, password);
      if (!newUser) {
        return ApiResponseService.apiResponse(res, 400, REGISTER_MESSAGES.USER_ALREADY_EXISTS);
      } 
      return ApiResponseService.apiResponse(res, 200, REGISTER_MESSAGES.REGISTER_SUCCESS);
    } catch (err: any) {
        next(err);
      }
    }
  }


export default UserAuthController;
function next(err: unknown) {
  throw new Error("Function not implemented.");
}

