import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./db/connectDB";
import todosRouter from "./router/todosRouter";
import authRouter from "./router/authRouter";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(todosRouter);

sequelize.authenticate();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
