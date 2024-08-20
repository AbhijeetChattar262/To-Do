import { Router } from "express";
import {
  registerUser,
  loginUser,
} from "../controller/authController/authController";

const authRouter = Router();

// Route for user registration
authRouter.post("/register", registerUser);

// Route for user login
authRouter.post("/login", loginUser);

export default authRouter;
