import { Router } from "express";
import UserAuthController from "../controller/user-auth.controller";
import { ValidationMiddlewares } from "../middleware/validations.middleware";
const userRouter = Router();

// Route for user registration
userRouter.post("/register", ValidationMiddlewares.validateAuthBody, UserAuthController.registerUser);

// Route for user login
userRouter.post("/login", ValidationMiddlewares.validateAuthBody, UserAuthController.loginUser);

export default userRouter;
