import { AddTodoManager } from "../DbManager/AddTodoManager"; 
import { TodoAttributes } from "../db/Types/TaskType"; 

class AddTodoService {
  static async addTodo(userId: number, task: string): Promise<TodoAttributes> {
    // Call the DB manager to create a new Todo
    const newTodo = await AddTodoManager.createTodo(userId, task);

    // Extract the plain object data from the Sequelize Model instance
    const todoData = newTodo.get({ plain: true }) as TodoAttributes;

    return todoData;
  }
}

export {  AddTodoService };
