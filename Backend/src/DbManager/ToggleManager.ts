import { MysqlSequelizeAdapter } from "../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../db/enums";
import { Model } from "sequelize";
import { TodoAttributes } from "../db/Types/TaskType";

class ToggleManager {
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
  static async updateTodoCompletionStatus(todoId: number, userId: number, completed: boolean): Promise<number> {
    const adapter = MysqlSequelizeAdapter.getInstance();

    // Update the completed status
    const result = await adapter.update(DbModelsEnum.TODOS, { completed }, {
      where: {
        id: todoId,
        user_id_FK: userId,
      },
    });

    return result;
  }
}

export { ToggleManager };
