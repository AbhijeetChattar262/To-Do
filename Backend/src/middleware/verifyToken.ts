import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AUTH_MESSAGES, AUTH_HEADERS, AUTH_PREFIXES, AUTH_DEFAULTS } from "../constants/MIDDLEWARE/middlewareConstants"; // Adjust path as needed

// Middleware to verify token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers[AUTH_HEADERS.AUTHORIZATION];
  
  // Ensure authHeader is a string before calling startsWith
  const token =
    typeof authHeader === "string" && authHeader.startsWith(AUTH_PREFIXES.BEARER)
      ? authHeader.split(" ")[1]
      : null;
      
  if (!token) return res.status(401).json({ message: AUTH_MESSAGES.ACCESS_DENIED });

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || AUTH_DEFAULTS.JWT_SECRET
    );
    req.user = verified as { id: number };
    next();
  } catch (err) {
    res.status(400).json({ message: AUTH_MESSAGES.INVALID_TOKEN });
  }
};

// Extend the Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}
