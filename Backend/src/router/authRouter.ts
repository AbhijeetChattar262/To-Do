import { Router } from "express";
import AuthController from "../controller/AuthController";
const authRouter = Router();

// Route for user registration
authRouter.post("/register",AuthController.registerUser);

// Route for user login
authRouter.post("/login", AuthController.loginUser);

export default authRouter;
