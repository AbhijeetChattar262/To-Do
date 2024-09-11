import { MysqlSequelizeAdapter } from "../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../db/enums";

class GetTodoManager {
  static async getTodosByUserId(userId: number): Promise<object[]> {
    const adapter = MysqlSequelizeAdapter.getInstance();

    // Fetch todos based on the user ID using the adapter
    const todos = await adapter.findAll(DbModelsEnum.TODOS, {
      where: {
        user_id_FK: userId,
      },
    });

    return todos;
  }
}

export { GetTodoManager};