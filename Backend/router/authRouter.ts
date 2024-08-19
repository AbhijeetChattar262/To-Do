import { Router } from "express";
import { loginUser, registerUser } from "../controller/authController";

const authRouter = Router();

// Route for user registration
authRouter.post("/register", registerUser);

// Route for user login
authRouter.post("/login", loginUser);

export default authRouter;
