import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabase } from "./db/connect-db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import todosRouter from "./router/todo.router";
import userRouter from "./router/user.router";

app.use(userRouter);
app.use(todosRouter);

const PORT = process.env.PORT;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})