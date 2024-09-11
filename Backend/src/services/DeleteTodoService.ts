import { DeleteTodoManager } from "../DbManager/DeleteTodoManager";

class DeleteTodoService {
    static async deleteTodo(id: number, userId: number): Promise<boolean> {
        const result = await DeleteTodoManager.deleteTodoById(id, userId);
    
        if (result === 0) {
          return false;
        }
    
        return true;
      }
    }
    
export { DeleteTodoService }
