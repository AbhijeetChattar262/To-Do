import { Request, Response, NextFunction } from "express";
import { ApiResponseService } from "../services/api-response.service";
import { CustomError } from "../utils/custom-error";

export class ErrorMiddleware {  
    public static globalErrorHandler = ((err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof CustomError) {
            return ApiResponseService.apiResponse(res, err.code, err.message);
        }
        return ApiResponseService.apiResponse(res, 500, "Something went wrong");
    })
}