import { Request, Response, NextFunction } from "express";
import { MESSAGES } from "../constants/todo";
import { TodoServices } from "../services/db-services/todo.service";
import { ApiResponseService } from "../services/api-response.service";
import { CustomError } from "../utils/custom-error.util";
class TodoController {
  // Add a new todo
  public static async addTodo(req: Request, res: Response, next: NextFunction) {
    const { task } = req.body;
    //@ts-ignore
    const userId = req.user.id;

    try {
      const newTodo = await TodoServices.addTodo(userId, task, next);
      if (!newTodo) {
        throw new CustomError(MESSAGES.TODO_NOT_CREATED, 404);
      }
      ApiResponseService.apiResponse(res, 201, MESSAGES.TASK_ADDED, {task: newTodo.task});
    } catch (err) {
      next(err);
    }
  }

  // Delete a todo
  public static async deleteTodo(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    //@ts-ignore
    const userId = req.user.id;

    try {
      const isDeleted = await TodoServices.deleteTodo(Number(id), userId, next);

      if (!isDeleted) {
        throw new CustomError(MESSAGES.TODO_NOT_FOUND, 404);
      }

      ApiResponseService.apiResponse(res, 200, MESSAGES.TASK_DELETED, {task: isDeleted.task});
    } catch (err) {
      next(err);
    }
  }

  // Get all todos
  public static async getTodos(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    const userId = req.user.id;

    try {
      const todos = await TodoServices.getTodos(userId, next);
      ApiResponseService.apiResponse(res, 200, MESSAGES.TASKS_FETCHED, todos);
    } catch (err) {
      next(err);
    }
  }

  // Toggle todo completion
  public static async toggleComplete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    //@ts-ignore
    const userId = req.user.id;

    try {
      const updatedTodo = await TodoServices.toggleTodoCompletion(Number(id), userId, next);

      if (!updatedTodo) {
        return ApiResponseService.apiResponse(res, 404, MESSAGES.TODO_NOT_FOUND);
      }

      ApiResponseService.apiResponse(res, 200, MESSAGES.TASK_UPDATED, {task: updatedTodo.task});
    } catch (err) {
      next(err);
    }
  }

  // Update a todo task
  public static async updateTodo(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { task } = req.body;
    //@ts-ignore
    const userId = req.user.id;

    try {
      const updatedTodo = await TodoServices.updateTodoTask(Number(id), userId, task, next);

      if (!updatedTodo) {
        return ApiResponseService.apiResponse(res, 404, MESSAGES.TODO_NOT_FOUND);
      }

      ApiResponseService.apiResponse(res, 200, MESSAGES.TASK_UPDATED, {task: updatedTodo.task});
    } catch (err) {
      next(err);
    }
  }
}

export default TodoController;
