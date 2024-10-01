import { PrismaAdapter } from "../mssql/prisma.adapter";
import { TodoAttributes } from "../../types/db-types";
import { CustomError } from "../../utils/custom-error.util";
import { NextFunction } from "express";
import { API_RESPONSES } from "../../constants";

class TodoDbManager {
  private static adapter = PrismaAdapter.getInstance();

  // Add Todo
  public static async createTodo(userId: number, task: string, next: NextFunction): Promise<TodoAttributes> {
    try {
      const newTodo = await this.adapter.create('todo', {
        task,
        completed: false,
        user: { connect: { id: userId } }
      });

      return newTodo as TodoAttributes;
    } catch (error) {
      throw new CustomError(API_RESPONSES.DB.CREATE_TODO_FAILED.message, API_RESPONSES.DB.CREATE_TODO_FAILED.code);
    }
  }

  // Get Todos by User ID
  public static async getTodosByUserId(userId: number, next: NextFunction): Promise<TodoAttributes[]> {
    try {
      const todosList = await this.adapter.findAll('todo', { userId: userId });
      return todosList as TodoAttributes[];
    } catch (error) {
      throw new CustomError(API_RESPONSES.DB.GET_TODOS_BY_USER_ID_FAILED.message, API_RESPONSES.DB.GET_TODOS_BY_USER_ID_FAILED.code);
    }
  }

  // Find Todo by ID and User ID (for Toggle and Update)
  public static async findTodoByIdAndUserId(todoId: number, userId: number, next: NextFunction): Promise<TodoAttributes | null> {
    try {
      const todo = await this.adapter.findOne('todo', { id: todoId, userId: userId });
      return todo as TodoAttributes | null;
    } catch (error) {
      throw new CustomError(API_RESPONSES.DB.GET_TODOS_BY_ID_AND_USER_ID_NOT_FOUND.message, API_RESPONSES.DB.GET_TODOS_BY_ID_AND_USER_ID_NOT_FOUND.code);
    }
  }

  // Toggle Todo Completion Status
  public static async updateTodoCompletionStatus(todoId: number, userId: number, completed: boolean, next: NextFunction): Promise<TodoAttributes> {
    try {
      const todo = await this.adapter.update('todo', { completed }, { id: todoId, userId: userId });
      return todo as TodoAttributes;
    } catch (error) {
      throw new CustomError(API_RESPONSES.DB.UPDATE_COMPLETE_STATUS_TASK_FAILED.message, API_RESPONSES.DB.UPDATE_COMPLETE_STATUS_TASK_FAILED.code);
    }
  }

  // Update Todo Task
  public static async updateTodoTask(todoId: number, userId: number, task: string, next: NextFunction): Promise<TodoAttributes> {
    try {
      const updatedTodo = await this.adapter.update('todo', { task }, { id: todoId, userId: userId });
      return updatedTodo as TodoAttributes;
    } catch (error) {
      throw new CustomError(API_RESPONSES.DB.UPDATE_TASK_FAILED.message, API_RESPONSES.DB.UPDATE_TASK_FAILED.code);
    }
  }

  // Delete Todo
  public static async deleteTodoById(id: number, userId: number, next: NextFunction): Promise<TodoAttributes> {
    try {
      const deletedTodo = await this.adapter.destroy('todo', { id, userId });
      return deletedTodo as TodoAttributes;
    } catch (error) {
      throw new CustomError(API_RESPONSES.DB.DELETE_TODO_FAILED.message, API_RESPONSES.DB.DELETE_TODO_FAILED.code);
    }
  }
}

export { TodoDbManager };