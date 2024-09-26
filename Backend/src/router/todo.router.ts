import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middlewares";
import TodoController from "../controller/todo.controller";
import { ValidationMiddlewares } from "../middleware/validations.middleware";

const todosRouter = Router();

// Todo Routes
todosRouter.post("/todos", AuthMiddleware.authenticateUser, ValidationMiddlewares.validateTaskBody, TodoController.addTodo);
todosRouter.get("/todos", AuthMiddleware.authenticateUser, TodoController.getTodos);
todosRouter.put("/todos/:id", AuthMiddleware.authenticateUser, ValidationMiddlewares.validateTaskId, ValidationMiddlewares.validateTaskBody, TodoController.updateTodo);
todosRouter.delete("/todos/:id", AuthMiddleware.authenticateUser, ValidationMiddlewares.validateTaskId, TodoController.deleteTodo);
todosRouter.put("/todos/toggle/:id",AuthMiddleware.authenticateUser, ValidationMiddlewares.validateTaskId, TodoController.toggleComplete);

export default todosRouter;
