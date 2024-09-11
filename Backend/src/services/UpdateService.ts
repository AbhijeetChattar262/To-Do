import { UpdateManager } from "../DbManager/UpdateManager";


class UpdateService {
  // Update the task of a todo
  static async updateTodoTask(todoId: number, userId: number, task: string): Promise<object | null> {
    // Find the todo
    const todo = await UpdateManager.findTodoByIdAndUserId(todoId, userId);

    if (!todo) {
      return null;
    }

    // Update the todo task
    const result = await UpdateManager.updateTodoTask(todoId, userId, task);

    if (result === 0) {
      return null;
    }

    // Fetch the updated todo
    const updatedTodo = await UpdateManager.findTodoByIdAndUserId(todoId, userId);

    return updatedTodo?.get({ plain: true }) || null; // Return the plain object format of the updated todo
  }
}

export { UpdateService };
