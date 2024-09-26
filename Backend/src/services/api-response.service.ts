import { Response } from 'express';
import { ApiResponseType } from '../types';

export class ApiResponseService {
    public static apiResponse(res: Response, code: number, message: string, data?: any) {
        const response: ApiResponseType = {
            success: data ? true : false,
            code: code,
            message: message,
            data: data
        };
        return res.status(200).json(response);
    }
    
}
