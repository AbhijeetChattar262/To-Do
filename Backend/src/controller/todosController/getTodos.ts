import { Request, Response } from "express";
import { MESSAGES } from "../../constants/TODO/todoConstants";
import { GetTodoService } from "../../services/GetTodoServices"; 

const getTodos = async (req: Request, res: Response) => {
  // Check if the user is authorized
  if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

  const userId = req.user.id;

  try {
    // Use the service to fetch todos
    const todos = await GetTodoService.getTodos(userId);

    // Return the todos
    res.json(todos);
  } catch (err) {
    // Log the error and send a 500 error response
    console.error(MESSAGES.ERROR_FETCHING_TASKS, err);
    res.status(500).json({ message: MESSAGES.ERROR_FETCHING_TASKS });
  }
};

export default getTodos;
