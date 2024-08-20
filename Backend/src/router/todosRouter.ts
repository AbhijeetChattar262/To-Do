import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  getTodos,
  toggleComplete,
} from "../controller/todosController/todosController";

const todosRouter = Router();

// Todo Routes
todosRouter.post("/todos", verifyToken, addTodo);
todosRouter.get("/todos", verifyToken, getTodos);
todosRouter.put("/todos/:id", verifyToken, updateTodo);
todosRouter.delete("/todos/:id", verifyToken, deleteTodo);
todosRouter.put("/todos/toggle/:id", verifyToken, toggleComplete);

export default todosRouter;
