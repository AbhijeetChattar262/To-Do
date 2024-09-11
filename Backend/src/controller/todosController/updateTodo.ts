import { Request, Response } from "express";
import { MESSAGES } from "../../constants/TODO/todoConstants";
import { UpdateService } from "../../services/UpdateService";

const updateTodo = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

  const { id } = req.params;
  const { task } = req.body;
  const userId = req.user.id;

  try {
    // Call the UpdateService to update the todo
    const updatedTodo = await UpdateService.updateTodoTask(Number(id), userId, task);

    if (!updatedTodo) {
      return res.status(404).json({ message: MESSAGES.TODO_NOT_FOUND });
    }

    // Return the updated todo
    res.json(updatedTodo);
  } catch (err) {
    // Log the error and send a 500 error response
    console.error(MESSAGES.ERROR_UPDATING_TASK, err); // Debug output
    res.status(500).json({ message: MESSAGES.ERROR_UPDATING_TASK });
  }
};

export default updateTodo;
