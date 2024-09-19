import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./db/connect-db";
import todosRouter from "./router/todo.router";
import userRouter from "./router/user.router";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(todosRouter);

sequelize.authenticate();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
