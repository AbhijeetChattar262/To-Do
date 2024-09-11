import { Request, Response } from "express";
import { MESSAGES } from "../../constants/TODO/todoConstants";
import { DeleteTodoService } from "../../services/DeleteTodoService";
const deleteTodo = async (req: Request, res: Response) => {
  // Check if the user is authorized
  if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

  const { id } = req.params;
  const userId = req.user.id;
  try {
    // Use the service to delete the Todo item
    const isDeleted = await  DeleteTodoService.deleteTodo(Number(id), userId);

    // If the todo was not found, return a 404 error
    if (!isDeleted) {
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
