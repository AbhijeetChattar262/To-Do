import { Request, Response, NextFunction } from "express";
import { TodoServices } from "../services/db-services/todo.service";
import { ApiResponseService } from "../services/api-response.service";
import { CustomError } from "../utils/custom-error.util";
import { API_RESPONSES } from "../constants";
class TodoController {
  // Add a new todo
  public static async addTodo(req: Request, res: Response, next: NextFunction) {
    const { task } = req.body;
    //@ts-ignore
    const userId = req.user.id;

    try {
      const newTodo = await TodoServices.addTodo(userId, task, next);
      ApiResponseService.apiResponse(res, API_RESPONSES.CONTROLLER.CREATE_TODO_SUCCESS.code, API_RESPONSES.CONTROLLER.CREATE_TODO_SUCCESS.message, newTodo);
    } catch (err) {
      if (err instanceof CustomError) {
        next(err);
      }
      next(new CustomError(API_RESPONSES.CONTROLLER.CREATE_TODO_FAILED.message, API_RESPONSES.CONTROLLER.CREATE_TODO_FAILED.code));
    }
  }

  // Delete a todo
  public static async deleteTodo(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    //@ts-ignore
    const userId = req.user.id;

    try {
      const isDeleted = await TodoServices.deleteTodo(Number(id), userId, next);
      ApiResponseService.apiResponse(res, API_RESPONSES.CONTROLLER.DELETE_TODO_SUCCESS.code, API_RESPONSES.CONTROLLER.DELETE_TODO_SUCCESS.message, {task: isDeleted.task});
    } catch (err) {
      if (err instanceof CustomError) {
        next(err);
      }
      next(new CustomError(API_RESPONSES.CONTROLLER.DELETE_TODO_FAILED.message, API_RESPONSES.CONTROLLER.DELETE_TODO_FAILED.code));
    }
  }

  // Get all todos
  public static async getTodos(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    const userId = req.user.id;

    try {
      const todos = await TodoServices.getTodos(userId, next);
      ApiResponseService.apiResponse(res, API_RESPONSES.CONTROLLER.GET_TODOS_BY_USER_ID_SUCCESS.code, API_RESPONSES.CONTROLLER.GET_TODOS_BY_USER_ID_SUCCESS.message, todos);
    } catch (err) {
      if (err instanceof CustomError) {
        next(err);
      }
      next(new CustomError(API_RESPONSES.CONTROLLER.GET_TODOS_BY_USER_ID_FAILED.message, API_RESPONSES.CONTROLLER.GET_TODOS_BY_USER_ID_FAILED.code));
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
        throw new Error();
      }
      ApiResponseService.apiResponse(res, API_RESPONSES.CONTROLLER.UPDATE_COMPLETE_STATUS_TASK_SUCCESS.code, API_RESPONSES.CONTROLLER.UPDATE_COMPLETE_STATUS_TASK_SUCCESS.message, {task: updatedTodo.task});
    } catch (err) {
      if (err instanceof CustomError) {
        next(err);
      }
      next(new CustomError(API_RESPONSES.CONTROLLER.UPDATE_COMPLETE_STATUS_TASK_FAILED.message, API_RESPONSES.CONTROLLER.UPDATE_COMPLETE_STATUS_TASK_FAILED.code));
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
        throw new Error();
      }

      ApiResponseService.apiResponse(res, API_RESPONSES.CONTROLLER.UPDATE_TASK_SUCCESS.code, API_RESPONSES.CONTROLLER.UPDATE_TASK_SUCCESS.message, {task: updatedTodo.task});
    } catch (err) {
      if (err instanceof CustomError) {
        next(err);
      }
      next(new CustomError(API_RESPONSES.CONTROLLER.UPDATE_TASK_FAILED.message, API_RESPONSES.CONTROLLER.UPDATE_TASK_FAILED.code));
    }
  }
}

export default TodoController;
