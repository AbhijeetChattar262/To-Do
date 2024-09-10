import { Request, Response } from "express";
import { MysqlSequelizeAdapter } from "../../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../../db/enums";
import { MESSAGES } from "../../constants/TODO/todoConstants";
import { TodoAttributes } from "../../db/Types/TaskType"; // Ensure this path is correct

const toggleComplete = async (req: Request, res: Response) => {
  // Check if the user is authorized
  if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

  const { id } = req.params;
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

    // Toggle the completed status
    const result = await adapter.update(DbModelsEnum.TODOS, { 
      completed: !todo.get("completed") // Use `get` to access properties if necessary
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
    console.error(MESSAGES.ERROR_TOGGLING_TASK, err); // Debug output
    res.status(500).json({ message: MESSAGES.ERROR_TOGGLING_TASK });
  }
};

export default toggleComplete;
