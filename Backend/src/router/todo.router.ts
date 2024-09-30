import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import TodoController from "../controller/todo.controller";
import { ValidationMiddleware } from "../middleware/validation.middleware";

const todosRouter = Router();

// Todo Routes
todosRouter.post("/todos", AuthMiddleware.authenticateUser, ValidationMiddleware.validateTodo, TodoController.addTodo);
todosRouter.get("/todos", AuthMiddleware.authenticateUser, TodoController.getTodos);
todosRouter.put("/todos/:id", AuthMiddleware.authenticateUser, ValidationMiddleware.validateId, ValidationMiddleware.validateTodo, TodoController.updateTodo);
todosRouter.delete("/todos/:id", AuthMiddleware.authenticateUser, ValidationMiddleware.validateId, TodoController.deleteTodo);
todosRouter.put("/todos/toggle/:id",AuthMiddleware.authenticateUser, ValidationMiddleware.validateId, TodoController.toggleComplete);

export default todosRouter;
