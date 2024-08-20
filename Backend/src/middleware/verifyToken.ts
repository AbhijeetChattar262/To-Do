import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to verify token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(
      token as string,
      process.env.JWT_SECRET || "defaultSecret"
    );
    req.user = verified as { id: number };
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
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
