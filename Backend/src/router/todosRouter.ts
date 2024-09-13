import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import TodoController from "../controller/TodosController";

const todosRouter = Router();

// Todo Routes
todosRouter.post("/todos", verifyToken, TodoController.addTodo);
todosRouter.get("/todos", verifyToken,TodoController.getTodos);
todosRouter.put("/todos/:id", verifyToken, TodoController.updateTodo);
todosRouter.delete("/todos/:id", verifyToken, TodoController.deleteTodo);
todosRouter.put("/todos/toggle/:id", verifyToken, TodoController.toggleComplete);

export default todosRouter;
