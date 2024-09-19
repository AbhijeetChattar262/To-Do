import { MysqlSequelizeAdapter } from "../mysql/mysql-sequelize.adapter";
import { DbModelsEnum } from "../../enums";
import { TodoAttributes } from "../../types/db-types"
import { Model } from "sequelize";

class TodoDbManager {
  
  // Add Todo
  public static async createTodo(userId: number, task: string): Promise<Model<TodoAttributes>> {
    const adapter = MysqlSequelizeAdapter.getInstance();
    const newTodo = await adapter.create(DbModelsEnum.TODOS, {
      user_id_FK: userId,
      task,
      completed: false,
    }) as Model<TodoAttributes>;
    return newTodo;
  }

  // Delete Todo
  public  static async deleteTodoById(id: number, userId: number): Promise<number> {
    const adapter = MysqlSequelizeAdapter.getInstance();
    const result = await adapter.destroy(DbModelsEnum.TODOS, {
      where: {
        id,
        user_id_FK: userId,
      },
    });
    return result;
  }

  // Get Todos by User ID
  public static async getTodosByUserId(userId: number): Promise<object[]> {
    const adapter = MysqlSequelizeAdapter.getInstance();
    const todos = await adapter.findAll(DbModelsEnum.TODOS, {
      where: {
        user_id_FK: userId,
      },
    });
    return todos;
  }

  // Find Todo by ID and User ID (for Toggle and Update)
  public static async findTodoByIdAndUserId(todoId: number, userId: number): Promise<Model<TodoAttributes> | null> {
    const adapter = MysqlSequelizeAdapter.getInstance();
    const todo = await adapter.findOne(DbModelsEnum.TODOS, {
      where: {
        id: todoId,
        user_id_FK: userId,
      },
    });
    return todo as Model<TodoAttributes> | null;
  }

  // Toggle Todo Completion Status
  public  static async updateTodoCompletionStatus(todoId: number, userId: number, completed: boolean): Promise<number> {
    const adapter = MysqlSequelizeAdapter.getInstance();
    const result = await adapter.update(DbModelsEnum.TODOS, { completed }, {
      where: {
        id: todoId,
        user_id_FK: userId,
      },
    });
    return result;
  }

  // Update Todo Task
  public static async updateTodoTask(todoId: number, userId: number, task: string): Promise<number> {
    const adapter = MysqlSequelizeAdapter.getInstance();
    const result = await adapter.update(DbModelsEnum.TODOS, { task }, {
      where: {
        id: todoId,
        user_id_FK: userId,
      },
    });
    return result;
  }
}

export { TodoDbManager };
