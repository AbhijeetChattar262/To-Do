import { GetTodoManager} from "../DbManager/GetTodoManager"; // Adjust the path

class GetTodoService {
  static async getTodos(userId: number): Promise<object[]> {
    // Call the DB manager to fetch todos
    const todos = await GetTodoManager.getTodosByUserId(userId);

    return todos;
  }
}

export { GetTodoService };