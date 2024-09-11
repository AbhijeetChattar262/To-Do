import { Request, Response } from "express";
import { MESSAGES } from "../../constants/TODO/todoConstants";
import { AddTodoService } from "../../services/AddTodoService";

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
    // Use the service to add the new todo
    const newTodo = await AddTodoService.addTodo(userId, task);

    // Return the newly created todo
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
