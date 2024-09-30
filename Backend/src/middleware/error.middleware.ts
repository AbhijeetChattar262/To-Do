import { Request, Response, NextFunction } from "express";
import { ApiResponseService } from "../services/api-response.service";
import { CustomError } from "../utils/custom-error.util";
import { API_RESPONSES } from "../constants";

export class ErrorMiddleware {
    public static errorHandler = ((err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof CustomError) {
            return ApiResponseService.apiResponse(res, err.code, err.message);
        }
        console.log(err);
        return ApiResponseService.apiResponse(res, API_RESPONSES.SOMETHING_WENT_WRONG.code, API_RESPONSES.SOMETHING_WENT_WRONG.message);
    })
}
    