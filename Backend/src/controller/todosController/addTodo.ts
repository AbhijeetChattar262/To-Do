import { Request, Response } from "express";
import { MESSAGES } from "../../constants/TODO/todoConstants";
import { MysqlSequelizeAdapter } from "../../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../../db/enums"; 
import { TodoAttributes } from "../../db/Types/TaskType"; // Assuming TodoType is in Types folder

import { Model } from "sequelize"; // Import the Sequelize Model type

const addTodo = async (req: Request, res: Response) => {
  // Check for unauthorized user
  if (!req.user) {
    console.error(MESSAGES.UNAUTHORIZED); // Debug output
    return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });
  }

  const { task } = req.body;
  const userId = req.user.id;

  // Check if task is provided
  if (!task) {
    return res.status(400).json({ message: MESSAGES.TASK_REQUIRED });
  }

  try {
    // Instantiate the MySQL adapter
    const adapter = MysqlSequelizeAdapter.getInstance();

    // Create new todo using the adapter and cast it to Model<TodoAttributes>
    const newTodo = await adapter.create(DbModelsEnum.TODOS, {
      user_id_FK: userId,
      task,
      completed: false,
    }) as Model<TodoAttributes>;

    // Extract the data from the Sequelize model instance
    const todoData = newTodo.get({ plain: true }) as TodoAttributes;

    // Return the newly created todo
    res.status(201).json({
      id: todoData.id,
      task: todoData.task,
      completed: todoData.completed,
    });
  } catch (err) {
    console.error(MESSAGES.ERROR_ADDING_TASK, err); // Debug output
    res.status(500).json({ message: MESSAGES.ERROR_ADDING_TASK });
  }
};

export default addTodo;