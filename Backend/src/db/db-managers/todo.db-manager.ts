import { PrismaAdapter } from "../mysql/prisma.adapter";
import { TodoAttributes } from "../../types/db-types";

class TodoDbManager {
  private static adapter = PrismaAdapter.getInstance();

  // Add Todo
  public static async createTodo(userId: number, task: string): Promise<TodoAttributes> {
    try {
      const newTodo = await this.adapter.create('todo', {
        task,
        completed: false,
        user: { connect: { id: userId } }
      });

      return newTodo as TodoAttributes;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  }

  // Get Todos by User ID
  public static async getTodosByUserId(userId: number): Promise<TodoAttributes[]> {
    try {
      const todosList = await this.adapter.findAll('todo', { userId: userId });
      return todosList as TodoAttributes[];
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }

  // Find Todo by ID and User ID (for Toggle and Update)
  public static async findTodoByIdAndUserId(todoId: number, userId: number): Promise<TodoAttributes | null> {
    try {
      const todo = await this.adapter.findOne('todo', { id: todoId, userId: userId });
      return todo as TodoAttributes | null;
    } catch (error) {
      console.error("Error finding todo:", error);
      throw error;
    }
  }

  // Toggle Todo Completion Status
  public static async updateTodoCompletionStatus(todoId: number, userId: number, completed: boolean): Promise<boolean> {
    try {
      await this.adapter.update('todo', { completed }, { id: todoId, userId: userId });
      return true;
    } catch (error) {
      console.error("Error updating todo completion status:", error);
      return false;
    }
  }

  // Update Todo Task
  public static async updateTodoTask(todoId: number, userId: number, task: string): Promise<boolean> {
    try {
      await this.adapter.update('todo', { task }, { id: todoId, userId: userId });
      return true;
    } catch (error) {
      console.error("Error updating todo task:", error);
      return false;
    }
  }

  // Delete Todo
  public static async deleteTodoById(id: number, userId: number): Promise<boolean> {
    try {
      await this.adapter.destroy('todo', { id, userId });
      return true;
    } catch (error) {
      console.error("Error deleting todo:", error);
      return false;
    }
  }
}

export { TodoDbManager };