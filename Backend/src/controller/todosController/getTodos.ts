import { Request, Response } from "express";
import { MysqlSequelizeAdapter } from "../../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../../db/enums";
import { MESSAGES } from "../../constants/TODO/todoConstants";

const getTodos = async (req: Request, res: Response) => {
  // Check if the user is authorized
  if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

  const userId = req.user.id;

  try {
    // Instantiate the MySQL adapter
    const adapter = MysqlSequelizeAdapter.getInstance();

    // Fetch todos from the database using the adapter
    const todos = await adapter.findAll(DbModelsEnum.TODOS, {
      where: {
        user_id_FK: userId,
      },
    });

    // Return the todos
    res.json(todos);
  } catch (err) {
    // Log the error and send a 500 error response
    console.error(MESSAGES.ERROR_FETCHING_TASKS, err);
    res.status(500).json({ message: MESSAGES.ERROR_FETCHING_TASKS });
  }
};

export default getTodos;
