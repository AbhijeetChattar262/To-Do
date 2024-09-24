import { TodoDbManager } from "../../db/db-managers/todo.db-manager";
import { TodoAttributes } from "../../types/db-types";

class TodoServices {

  // Add a new todo
  public static async addTodo(userId: string, task: string): Promise<TodoAttributes> {
    const newTodo = await TodoDbManager.createTodo(userId, task);
    return newTodo; 
  }

  // Delete a todo by ID
  public static async deleteTodo(id: string, userId: string): Promise<boolean> {
    const result = await TodoDbManager.deleteTodoById(id, userId);
    return result; 
  }

  // Get all todos by user ID
  public static async getTodos(userId: string): Promise<TodoAttributes[]> {
    return await TodoDbManager.getTodosByUserId(userId);
  }

  // Toggle the completion status of a todo
  public static async toggleTodoCompletion(todoId: string, userId: string): Promise<TodoAttributes | null> {
    const todo = await TodoDbManager.findTodoByIdAndUserId(todoId, userId);

    if (!todo) return null;

    const updatedStatus = !todo.completed;
    const updateSuccess = await TodoDbManager.updateTodoCompletionStatus(todoId, userId, updatedStatus);

    if (!updateSuccess) return null;

    const updatedTodo = await TodoDbManager.findTodoByIdAndUserId(todoId, userId);
    return updatedTodo || null;
  }

  // Update a todo task by ID
  public static async updateTodoTask(todoId: string, userId: string, task: string): Promise<TodoAttributes | null> {
    const todo = await TodoDbManager.findTodoByIdAndUserId(todoId, userId);

    if (!todo) return null;

    const updateSuccess = await TodoDbManager.updateTodoTask(todoId, userId, task);
    if (!updateSuccess) return null;

    const updatedTodo = await TodoDbManager.findTodoByIdAndUserId(todoId, userId);
    return updatedTodo || null;
  }
}

export { TodoServices };
