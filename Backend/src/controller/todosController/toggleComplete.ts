import { Request, Response } from "express";
import { MESSAGES } from "../../constants/TODO/todoConstants";
import { ToggleService } from "../../services/ToggleService"; 

const toggleComplete = async (req: Request, res: Response) => {
  // Check if the user is authorized
  if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Use the service to toggle the completion status
    const updatedTodo = await ToggleService.toggleTodoCompletion(Number(id), userId);

    if (!updatedTodo) {
      return res.status(404).json({ message: MESSAGES.TODO_NOT_FOUND });
    }

    res.json(updatedTodo);
  } catch (err) {
    // Log the error and send a 500 error response
    console.error(MESSAGES.ERROR_TOGGLING_TASK, err);
    res.status(500).json({ message: MESSAGES.ERROR_TOGGLING_TASK });
  }
};

export default toggleComplete;
