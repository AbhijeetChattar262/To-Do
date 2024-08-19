import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../db/db.connect";

import todosRouter from "../router/todosRouter";
import authRouter from "../router/authRouter";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(todosRouter);

connectDB();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
