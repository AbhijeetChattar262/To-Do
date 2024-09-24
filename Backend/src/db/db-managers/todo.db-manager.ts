import { PrismaAdapter } from "../mongoDb/prisma.adapter";
import { TodoAttributes } from "../../types/db-types";
import { ObjectId } from 'bson'; 

class TodoDbManager {
  private static adapter = PrismaAdapter.getInstance();

  // Add Todo
  public static async createTodo(userId: string, task: string): Promise<TodoAttributes> {
    try {
      const newTodo = await this.adapter.create('todo', {
        task,
        completed: false,
        user: { connect: { id: new ObjectId(userId) } } 
      });

      return newTodo as TodoAttributes;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  }

  public static async getTodosByUserId(userId: string): Promise<TodoAttributes[]> {
    try {
      const todosList = await this.adapter.findAll('todo', { userId: new ObjectId(userId) });
      return todosList as TodoAttributes[];
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }

  public static async findTodoByIdAndUserId(todoId: string, userId: string): Promise<TodoAttributes | null> {
    try {
      const todo = await this.adapter.findOne('todo', { 
        id: new ObjectId(todoId), 
        userId: new ObjectId(userId) 
      });
      return todo as TodoAttributes | null;
    } catch (error) {
      console.error("Error finding todo:", error);
      throw error;
    }
  }

  // Toggle Todo Completion Status
  public static async updateTodoCompletionStatus(todoId: string, userId: string, completed: boolean): Promise<boolean> {
    try {
      await this.adapter.update('todo', { completed }, { 
        id: new ObjectId(todoId), 
        userId: new ObjectId(userId)
      });
      return true;
    } catch (error) {
      console.error("Error updating todo completion status:", error);
      return false;
    }
  }

  // Update Todo Task
  public static async updateTodoTask(todoId: string, userId: string, task: string): Promise<boolean> {
    try {
      await this.adapter.update('todo', { task }, { 
        id: new ObjectId(todoId), 
        userId: new ObjectId(userId) 
      });
      return true;
    } catch (error) {
      console.error("Error updating todo task:", error);
      return false;
    }
  }

  // Delete Todo
  public static async deleteTodoById(todoId: string, userId: string): Promise<boolean> {
    try {
      await this.adapter.destroy('todo', { 
        id: new ObjectId(todoId), 
        userId: new ObjectId(userId) 
      });
      return true;
    } catch (error) {
      console.error("Error deleting todo:", error);
      return false;
    }
  }
}

export { TodoDbManager };
