import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to verify token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(
      token,
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
