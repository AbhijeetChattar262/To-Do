import { Router } from "express";
import UserAuthController from "../controller/user-auth.controller";
import { ValidationMiddleware } from "../middleware/validation.middleware";
const userRouter = Router();

// Route for user registration
userRouter.post("/register", ValidationMiddleware.validateUser, UserAuthController.registerUser);

// Route for user login
userRouter.post("/login", ValidationMiddleware.validateUser, UserAuthController.loginUser);

export default userRouter;
