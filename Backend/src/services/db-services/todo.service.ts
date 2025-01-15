import { NextFunction } from "express";
import { TodoDbManager } from "../../db/db-managers/todo.db-manager";
import { TodoAttributes } from "../../types/db-types";

class TodoServices {

  // Add a new todo
  public static async addTodo(userId: number, task: string, next: NextFunction): Promise<TodoAttributes> {
    return await TodoDbManager.createTodo(userId, task, next);
  }

  // Delete a todo by ID
  public static async deleteTodo(id: number, userId: number, next: NextFunction): Promise<TodoAttributes> {
    return await TodoDbManager.deleteTodoById(id, userId, next);
  }

  // Get all todos by user ID
  public static async getTodos(userId: number, next: NextFunction): Promise<TodoAttributes[]> {
    return await TodoDbManager.getTodosByUserId(userId, next);
  }

  // Toggle the completion status of a todo
  public static async toggleTodoCompletion(todoId: number, userId: number, next: NextFunction): Promise<TodoAttributes | null> {
    const todo = await TodoDbManager.findTodoByIdAndUserId(todoId, userId, next);

    if (!todo) return null;

    const updatedStatus = !todo.completed;
    const updateSuccess = await TodoDbManager.updateTodoCompletionStatus(todoId, userId, updatedStatus, next);

    if (!updateSuccess) return null;

    const updatedTodo = await TodoDbManager.findTodoByIdAndUserId(todoId, userId, next);
    return updatedTodo || null;
  }

  // Update a todo task by ID
  public static async updateTodoTask(todoId: number, userId: number, task: string, next: NextFunction): Promise<TodoAttributes | null> {
    const todo = await TodoDbManager.findTodoByIdAndUserId(todoId, userId, next);

    if (!todo) return null;

    const updateSuccess = await TodoDbManager.updateTodoTask(todoId, userId, task, next);
    if (!updateSuccess) return null;

    const updatedTodo = await TodoDbManager.findTodoByIdAndUserId(todoId, userId, next);
    return updatedTodo || null;
  }
}

export { TodoServices };
