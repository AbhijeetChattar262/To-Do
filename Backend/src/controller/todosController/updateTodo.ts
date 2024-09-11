import { Request, Response } from "express";
import { MysqlSequelizeAdapter } from "../../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../../db/enums";
import { MESSAGES } from "../../constants/TODO/todoConstants";

const updateTodo = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

  const { id } = req.params;
  const { task } = req.body;
  const userId = req.user.id;

  try {
    // Instantiate the MySQL adapter
    const adapter = MysqlSequelizeAdapter.getInstance();

    // Find the todo item using the adapter
    const todo = await adapter.findOne(DbModelsEnum.TODOS, {
      where: {
        id,
        user_id_FK: userId,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: MESSAGES.TODO_NOT_FOUND });
    }

    // Update the todo item
    const result = await adapter.update(DbModelsEnum.TODOS, { 
      task 
    }, {
      where: {
        id,
        user_id_FK: userId,
      },
    });

    if (result === 0) {
      return res.status(404).json({ message: MESSAGES.TODO_NOT_FOUND });
    }

    // Fetch the updated todo to return
    const updatedTodo = await adapter.findOne(DbModelsEnum.TODOS, {
      where: {
        id,
        user_id_FK: userId,
      },
    });

    res.json(updatedTodo);
  } catch (err) {
    // Log the error and send a 500 error response
    console.error(MESSAGES.ERROR_UPDATING_TASK, err); // Debug output
    res.status(500).json({ message: MESSAGES.ERROR_UPDATING_TASK });
  }
};

export default updateTodo;
