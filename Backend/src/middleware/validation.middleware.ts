import { Request, Response, NextFunction } from "express";
import { ApiResponseService } from "../services/api-response.service";
import { VALIDATION_MESSAGES } from "../constants";

export class ValidationMiddleware {
    static validateTodo(req: Request, res: Response, next: NextFunction) {
        const { task } = req.body;
        if (!task) {
            return ApiResponseService.apiResponse(res, VALIDATION_MESSAGES.TASK_REQUIRED.code, VALIDATION_MESSAGES.TASK_REQUIRED.message);
        }
        next();
    }

    static validateUser(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        if (!username || !password) {
            return ApiResponseService.apiResponse(res, VALIDATION_MESSAGES.USERNAME_AND_PASSWORD_REQUIRED.code, VALIDATION_MESSAGES.USERNAME_AND_PASSWORD_REQUIRED.message);
        }
        next();
    }

    static validateId(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        if (!id) {
            return ApiResponseService.apiResponse(res, VALIDATION_MESSAGES.TASK_REQUIRED.code, VALIDATION_MESSAGES.TASK_REQUIRED.message);
        }
        next();
    }
}