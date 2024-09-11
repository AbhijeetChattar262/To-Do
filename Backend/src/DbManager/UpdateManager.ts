import { MysqlSequelizeAdapter } from "../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../db/enums";
import { Model } from "sequelize";
import { TodoAttributes } from "../db/Types/TaskType"; 

class UpdateManager {
  // Find a todo by its ID and user ID
  static async findTodoByIdAndUserId(todoId: number, userId: number): Promise<Model<TodoAttributes> | null> {
    const adapter = MysqlSequelizeAdapter.getInstance();

    // Fetch the todo based on the id and user_id_FK
    const todo = await adapter.findOne(DbModelsEnum.TODOS, {
      where: {
        id: todoId,
        user_id_FK: userId,
      },
    });

    return todo as Model<TodoAttributes> | null;
  }

  // Update a todo
  static async updateTodoTask(todoId: number, userId: number, task: string): Promise<number> {
    const adapter = MysqlSequelizeAdapter.getInstance();

    // Update the task
    const result = await adapter.update(DbModelsEnum.TODOS, { task }, {
      where: {
        id: todoId,
        user_id_FK: userId,
      },
    });

    return result;
  }
}

export { UpdateManager };
