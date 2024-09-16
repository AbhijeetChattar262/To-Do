import { DrizzleAdapter } from "../mysql/drizzle.adapter";
import { todosTable } from "../models/schema";
import { TodoAttributes } from "../../types/db-types";

class TodoDbManager {

  // Add Todo
  public static async createTodo(userId: number, task: string): Promise<TodoAttributes> {
    const adapter = await DrizzleAdapter.getInstance();
    await adapter.create(todosTable, {
      user_id_FK: userId,
      task,
      completed: false,
    });

    // Retrieve the newly created Todo
    const newTodo = await adapter.findOne(todosTable, todosTable.task, task);
    
    if (newTodo && typeof newTodo === 'object' && 'user_id_FK' in newTodo) {
      return newTodo as TodoAttributes;
    }
    throw new Error('Failed to create and retrieve Todo');
  }

  // Delete Todo
  public static async deleteTodoById(id: number, userId: number): Promise<boolean> {
    const adapter = await DrizzleAdapter.getInstance();
    const result = await adapter.destroy(todosTable, todosTable.id, id);
    return result; 
  }

  // Get Todos by User ID
  public static async getTodosByUserId(userId: number): Promise<TodoAttributes[]> {
    const adapter = await DrizzleAdapter.getInstance();
    const todosList = await adapter.findAll(todosTable, todosTable.user_id_FK, userId);
    return todosList as TodoAttributes[];
  }

  // Find Todo by ID and User ID (for Toggle and Update)
  public static async findTodoByIdAndUserId(todoId: number, userId: number): Promise<TodoAttributes | null> {
    const adapter = await DrizzleAdapter.getInstance();
    const todo = await adapter.findOne(todosTable, todosTable.id, todoId);

    if (todo && typeof todo === 'object' && 'user_id_FK' in todo && (todo as TodoAttributes).user_id_FK === userId) {
      return todo as TodoAttributes;
    }
    return null;
  }

  // Toggle Todo Completion Status
  public static async updateTodoCompletionStatus(todoId: number, userId: number, completed: boolean): Promise<boolean> {
    const adapter = await DrizzleAdapter.getInstance();
    const result = await adapter.update(todosTable, { completed }, todosTable.id, todoId);
    return result; 
  }

  // Update Todo Task
  public static async updateTodoTask(todoId: number, userId: number, task: string): Promise<boolean> {
    const adapter = await DrizzleAdapter.getInstance();
    const result = await adapter.update(todosTable, { task }, todosTable.id, todoId);
    return result;
  }
}

export { TodoDbManager };
