import { Request, Response, NextFunction } from "express";
import { ApiResponseService } from "../services/api-response.service";

export class ValidationMiddleware {
    static validateTodo(req: Request, res: Response, next: NextFunction) {
        const { task } = req.body;
        if (!task) {
            return ApiResponseService.apiResponse(res, 400, "Task is required");
        }
        next();
    }

    static validateUser(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        if (!username || !password) {
            return ApiResponseService.apiResponse(res, 400, "Username and password are required");
        }
        next();
    }

    static validateId(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        if (!id) {
            return ApiResponseService.apiResponse(res, 400, "Id is required");
        }
        next();
    }
}