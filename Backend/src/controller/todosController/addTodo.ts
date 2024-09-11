import { Request, Response } from "express";
<<<<<<< HEAD
import { MESSAGES } from "../../constants/TODO/todoConstants";
import { MysqlSequelizeAdapter } from "../../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../../db/enums"; 
import { TodoAttributes } from "../../db/Types/TaskType"; // Assuming TodoType is in Types folder

import { Model } from "sequelize"; // Import the Sequelize Model type

const addTodo = async (req: Request, res: Response) => {
  // Check for unauthorized user
=======
import Todo from "../../models/todoModel";
import { MESSAGES } from "../../constants/TODO/todoConstants"; 

const addTodo = async (req: Request, res: Response) => {
>>>>>>> 2686a4986f10e170daa992b0d0cb6d4d8eabfd91
  if (!req.user) {
    console.error(MESSAGES.UNAUTHORIZED); // Debug output
    return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });
  }

  const { task } = req.body;
  const userId = req.user.id;

<<<<<<< HEAD
  // Check if task is provided
=======
>>>>>>> 2686a4986f10e170daa992b0d0cb6d4d8eabfd91
  if (!task) {
    return res.status(400).json({ message: MESSAGES.TASK_REQUIRED });
  }

  try {
<<<<<<< HEAD
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
=======
    const newTodo = await Todo.create({
      user_id_FK: userId,
      task,
      completed: false,
    });

    res.status(201).json({
      id: newTodo.id,
      task: newTodo.task,
      completed: newTodo.completed,
>>>>>>> 2686a4986f10e170daa992b0d0cb6d4d8eabfd91
    });
  } catch (err) {
    console.error(MESSAGES.ERROR_ADDING_TASK, err); // Debug output
    res.status(500).json({ message: MESSAGES.ERROR_ADDING_TASK });
  }
};

<<<<<<< HEAD
export default addTodo;
=======
export default addTodo;
>>>>>>> 2686a4986f10e170daa992b0d0cb6d4d8eabfd91
