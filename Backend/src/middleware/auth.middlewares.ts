import { Request, Response, NextFunction } from "express";
import {AUTH_MESSAGES,} from "../constants/middleware";
import { TokenUtils } from "../utils/token.utils";
import { ApiResponseService } from "../services/api-response.service";

// Extend the Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}

export class AuthMiddleware {
  static async authenticateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = TokenUtils.getToken(req);
    if (!token)
      return ApiResponseService.apiResponse(res, 401, AUTH_MESSAGES.UNAUTHORIZED);
    try {
      const verified = TokenUtils.verifyToken(token);
      req.user = verified as { id: number };
      if (!req.user.id)
        return ApiResponseService.apiResponse(res, 401, AUTH_MESSAGES.UNAUTHORIZED);
      next();
    } catch (err) {
      res.status(401).json({ message: AUTH_MESSAGES.UNAUTHORIZED });
    }
  }
} 
