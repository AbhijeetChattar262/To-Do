import { PrismaAdapter } from "../mssql/prisma.adapter";
import { TodoAttributes } from "../../types/db-types";
import { NextFunction } from "express";

class TodoDbManager {
  private static adapter = PrismaAdapter.getInstance();

  // Add Todo
  public static async createTodo(userId: number, task: string, next: NextFunction): Promise<TodoAttributes> {
    try {
      const newTodo = await this.adapter.create('todo', {
        task,
        completed: false,
        user: { connect: { id: userId } }
      }, next);

      return newTodo as TodoAttributes;
    } catch (error) {
      next(error);
      return Promise.reject(error);
    }
  }

  // Get Todos by User ID
  public static async getTodosByUserId(userId: number, next: NextFunction): Promise<TodoAttributes[]> {
    try {
      const todosList = await this.adapter.findAll('todo', { userId: userId }, next);
      return todosList as TodoAttributes[];
    } catch (error) {
      next(error);
      return Promise.reject(error);
    }
  }

  // Find Todo by ID and User ID (for Toggle and Update)
  public static async findTodoByIdAndUserId(todoId: number, userId: number, next: NextFunction): Promise<TodoAttributes | null> {
    try {
      const todo = await this.adapter.findOne('todo', { id: todoId, userId: userId }, next);
      return todo as TodoAttributes | null;
    } catch (error) {
      next(error);
      return Promise.reject(error);
    }
  }

  // Toggle Todo Completion Status
  public static async updateTodoCompletionStatus(todoId: number, userId: number, completed: boolean, next: NextFunction): Promise<TodoAttributes> {
    try {
      const todo = await this.adapter.update('todo', { completed }, { id: todoId, userId: userId }, next);
      return todo as TodoAttributes;
    } catch (error) {
      next(error);
      return Promise.reject(error);
    }
  }

  // Update Todo Task
  public static async updateTodoTask(todoId: number, userId: number, task: string, next: NextFunction): Promise<TodoAttributes> {
    try {
      const updatedTodo = await this.adapter.update('todo', { task }, { id: todoId, userId: userId }, next);
      return updatedTodo as TodoAttributes;
    } catch (error) {
      next(error);
      return Promise.reject(error);
    }
  }

  // Delete Todo
  public static async deleteTodoById(id: number, userId: number, next: NextFunction): Promise<TodoAttributes> {
    try {
      const deletedTodo = await this.adapter.destroy('todo', { id, userId }, next);
      return deletedTodo as TodoAttributes;
    } catch (error) {
      next(error);
      return Promise.reject(error);
    }
  }
}

export { TodoDbManager };