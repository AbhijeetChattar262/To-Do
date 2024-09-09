import { Request, Response } from "express";
import Todo from "../../models/todoModel";
import { MESSAGES } from "../../constants/TODO/todoConstants"; 

const addTodo = async (req: Request, res: Response) => {
  if (!req.user) {
    console.error(MESSAGES.UNAUTHORIZED); // Debug output
    return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });
  }

  const { task } = req.body;
  const userId = req.user.id;

  if (!task) {
    return res.status(400).json({ message: MESSAGES.TASK_REQUIRED });
  }

  try {
    const newTodo = await Todo.create({
      user_id_FK: userId,
      task,
      completed: false,
    });

    res.status(201).json({
      id: newTodo.id,
      task: newTodo.task,
      completed: newTodo.completed,
    });
  } catch (err) {
    console.error(MESSAGES.ERROR_ADDING_TASK, err); // Debug output
    res.status(500).json({ message: MESSAGES.ERROR_ADDING_TASK });
  }
};

export default addTodo;
