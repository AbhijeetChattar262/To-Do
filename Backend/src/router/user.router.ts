import { Router } from "express";
import UserController from "../controller/user.controller";
const userRouter = Router();

// Route for user registration
userRouter.post("/register",UserController.registerUser);

// Route for user login
userRouter.post("/login", UserController.loginUser);

export default userRouter;
