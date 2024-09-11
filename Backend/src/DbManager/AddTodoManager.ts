import { MysqlSequelizeAdapter } from "../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../db/enums";
import { TodoAttributes } from "../db/Types/TaskType"; 
import { Model } from "sequelize";

class AddTodoManager  {
  static async createTodo(userId: number, task: string): Promise<Model<TodoAttributes>> {
    const adapter = MysqlSequelizeAdapter.getInstance();

    // Create the new Todo item in the database
    const newTodo = await adapter.create(DbModelsEnum.TODOS, {
      user_id_FK: userId,
      task,
      completed: false,
    }) as Model<TodoAttributes>;

    return newTodo;
  }
}

export { AddTodoManager };
