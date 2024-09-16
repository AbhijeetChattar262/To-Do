import { Request, Response } from "express";
import { MysqlSequelizeAdapter } from "../../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../../db/enums";
import { MESSAGES } from "../../constants/TODO/todoConstants";

const deleteTodo = async (req: Request, res: Response) => {
  // Check if the user is authorized
  if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Instantiate the MySQL adapter
    const adapter = MysqlSequelizeAdapter.getInstance();

    // Use the adapter to delete the todo by id and user_id_FK
    const result = await adapter.destroy(DbModelsEnum.TODOS, {
      where: {
        id,
        user_id_FK: userId,
      },
    });

    // If no todo is deleted, return a 404 error
    if (result ===0) {
      return res.status(404).json({ message: MESSAGES.TASK_NOT_FOUND });
    }

    // If successful, return a success message
    res.json({ message: MESSAGES.TASK_DELETED });
  } catch (err) {
    // Log the error and send a 500 error response
    console.error(MESSAGES.ERROR_DELETING_TASK, err);
    res.status(500).json({ message: MESSAGES.ERROR_DELETING_TASK });
  }
};

export default deleteTodo;
