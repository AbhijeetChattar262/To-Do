import { Request, Response, NextFunction } from "express";
import { TokenUtils } from "../utils/token.util";
import { ApiResponseService } from "../services/api-response.service";
import { API_RESPONSES } from "../constants";

// Extend the Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}

export class AuthMiddleware {
  static authenticateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = TokenUtils.getToken(req);
    if (!token) {
      return ApiResponseService.apiResponse(res, API_RESPONSES.UNAUTHORIZED.code, API_RESPONSES.UNAUTHORIZED.message);
    }

    const verified = TokenUtils.verifyToken(res, token);
    req.user = verified as { id: number };
    if (!req.user) {
      return ApiResponseService.apiResponse(res, API_RESPONSES.UNAUTHORIZED.code, API_RESPONSES.UNAUTHORIZED.message);
    }
    next();
  }
}
