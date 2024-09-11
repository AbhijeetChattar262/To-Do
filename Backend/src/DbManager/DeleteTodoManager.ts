import { MysqlSequelizeAdapter } from "../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../db/enums";


class DeleteTodoManager {
    static async deleteTodoById(id: number, userId: number): Promise<number> {
        const adapter = MysqlSequelizeAdapter.getInstance();
    
        // Perform the delete operation using the adapter
        const result = await adapter.destroy(DbModelsEnum.TODOS, {
          where: {
            id,
            user_id_FK: userId,
          },
        });
    
        return result;
      }
    }

export { DeleteTodoManager }