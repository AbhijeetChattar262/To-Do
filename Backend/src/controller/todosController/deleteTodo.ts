import { Request, Response } from "express";
import Todo from "../../models/todoModel";
import { MESSAGES } from "../../constants/TODO/todoConstants"; // Adjust path as needed


const deleteTodo = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await Todo.destroy({
      where: {
        id,
        user_id_FK: userId,
      },
    });

    if (result === 0) {
      return res.status(404).json({ message: MESSAGES.TASK_NOT_FOUND });
    }

    res.json({ message: MESSAGES.TASK_DELETED });
  } catch (err) {
    console.error(MESSAGES.ERROR_DELETING_TASK, err); // Debug output
    res.status(500).json({ message: MESSAGES.ERROR_DELETING_TASK });
  }
};

export default deleteTodo;
