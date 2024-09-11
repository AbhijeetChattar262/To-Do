import { ToggleManager } from "../DbManager/ToggleManager";

class ToggleService {
  // Toggle the completion status of a todo
  static async toggleTodoCompletion(todoId: number, userId: number): Promise<object | null> {
    // Find the todo
    const todo = await ToggleManager.findTodoByIdAndUserId(todoId, userId);

    if (!todo) {
      return null;
    }

    // Toggle the completion status
    const updatedStatus = !todo.get("completed"); // Access the `completed` attribute using `get`
    await ToggleManager.updateTodoCompletionStatus(todoId, userId, updatedStatus);

    // Return the updated todo
    const updatedTodo = await ToggleManager.findTodoByIdAndUserId(todoId, userId);

    return updatedTodo?.get({ plain: true }) || null; // Return the plain object format of the updated todo
  }
}

export { ToggleService };
