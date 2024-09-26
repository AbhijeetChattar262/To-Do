import { Request, Response, NextFunction } from "express";
import { ApiResponseService } from "../services/api-response.service";

export class ValidationMiddlewares {

  public static validateUser(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return ApiResponseService.apiResponse(res, 401, "Unauthorized");
    }
    next();
  }

  public static validateAuthBody(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    if (!username || !password) {
      return ApiResponseService.apiResponse(res, 400, "Invalid credentials");
    }
    next();
  }

  public static validateTaskBody(req: Request, res: Response, next: NextFunction) {
    const { task } = req.body;
    if (!task) {
      return ApiResponseService.apiResponse(res, 400, "Invalid task");
    }
    next();
  }

  public static validateTaskId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      return ApiResponseService.apiResponse(res, 400, "Invalid id");
    }
    next();
  }
}
