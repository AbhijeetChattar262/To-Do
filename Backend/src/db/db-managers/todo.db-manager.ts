import { TypeORMAdapter } from "../mysql/typeorm.adapter";
import { TodoAttributes } from "../../types/db-types";
import { AppDataSource } from "../connect-db"; 

class TodoDbManager {
  public static async createTodo(userId: number, task: string): Promise<TodoAttributes> {
    const adapter = await TypeORMAdapter.getInstance(AppDataSource);
    await adapter.create('Todo', {
      userId,
      task,
      completed: false,
    });

    const newTodo = await adapter.findOne('Todo', { where: { task } });
    
    if (newTodo) {
      return newTodo as TodoAttributes;
    }
    throw new Error('Failed to create and retrieve Todo');
  }

  public static async deleteTodoById(id: number, userId: number): Promise<boolean> {
    const adapter = await TypeORMAdapter.getInstance(AppDataSource);
    const todo = await adapter.findOne('Todo', { where: { id, userId } });
    if (todo) {
      const result = await adapter.destroy('Todo', todo);
      return result;
    }
    return false;
  }

  public static async getTodosByUserId(userId: number): Promise<TodoAttributes[]> {
    const adapter = await TypeORMAdapter.getInstance(AppDataSource);
    const todosList = await adapter.findAll('Todo', { where: { userId } });
    return todosList as TodoAttributes[];
  }

  public static async findTodoByIdAndUserId(todoId: number, userId: number): Promise<TodoAttributes | null> {
    const adapter = await TypeORMAdapter.getInstance(AppDataSource);
    const todo = await adapter.findOne('Todo', { where: { id: todoId, userId } });

    if (todo) {
      return todo as TodoAttributes;
    }
    return null;
  }


public static async updateTodoCompletionStatus(todoId: number, userId: number, completed: boolean): Promise<boolean> {
  try {
    const adapter = await TypeORMAdapter.getInstance(AppDataSource);
    await adapter.update('Todo', { id: todoId, userId }, { completed });
    return true;
  } catch (error) {
    console.error("Error updating todo completion status:", error);
    return false;
  }
}

public static async updateTodoTask(todoId: number, userId: number, task: string): Promise<boolean> {
  try {
    const adapter = await TypeORMAdapter.getInstance(AppDataSource);
    const result = await adapter.update('Todo', { id: todoId, userId }, { task });
    return result.affected > 0; 
  } catch (error) {
    console.error("Error updating todo task:", error);
    return false;
  }
}

}

export { TodoDbManager };