import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middlewares";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  getTodos,
  toggleComplete,
} from "../controller/todosController";

const todosRouter = Router();

// Todo Routes
todosRouter.post("/todos", AuthMiddleware.authenticateUser, addTodo);
todosRouter.get("/todos", AuthMiddleware.authenticateUser, getTodos);
todosRouter.put("/todos/:id", AuthMiddleware.authenticateUser, updateTodo);
todosRouter.delete("/todos/:id", AuthMiddleware.authenticateUser, deleteTodo);
todosRouter.put(
  "/todos/toggle/:id",
  AuthMiddleware.authenticateUser,
  toggleComplete
);

export default todosRouter;
