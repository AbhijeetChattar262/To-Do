import { TodoDbManager } from "../DbManager/TodoDbManager"; 
import { TodoAttributes } from "../db/Types/TaskType"; 

class TodoServices {
  
  // Add a new todo
 public static async addTodo(userId: number, task: string): Promise<TodoAttributes> {
    const newTodo = await TodoDbManager.createTodo(userId, task);
    return newTodo.get({ plain: true }) as TodoAttributes;
  }

  // Delete a todo by ID
  public  static async deleteTodo(id: number, userId: number): Promise<boolean> {
    const result = await TodoDbManager.deleteTodoById(id, userId);
    return result !== 0;
  }

  // Get all todos by user ID
  public  static async getTodos(userId: number): Promise<object[]> {
    return await TodoDbManager.getTodosByUserId(userId);
  }

  // Toggle the completion status of a todo
  public  static async toggleTodoCompletion(todoId: number, userId: number): Promise<object | null> {
    const todo = await TodoDbManager.findTodoByIdAndUserId(todoId, userId);

    if (!todo) return null;

    const updatedStatus = !todo.get("completed");
    await TodoDbManager.updateTodoCompletionStatus(todoId, userId, updatedStatus);

    const updatedTodo = await TodoDbManager.findTodoByIdAndUserId(todoId, userId);
    return updatedTodo?.get({ plain: true }) || null;
  }

  // Update a todo task by ID
  public static async updateTodoTask(todoId: number, userId: number, task: string): Promise<object | null> {
    const todo = await TodoDbManager.findTodoByIdAndUserId(todoId, userId);

    if (!todo) return null;

    const result = await TodoDbManager.updateTodoTask(todoId, userId, task);
    if (result === 0) return null;

    const updatedTodo = await TodoDbManager.findTodoByIdAndUserId(todoId, userId);
    return updatedTodo?.get({ plain: true }) || null;
  }
}

export { TodoServices };
