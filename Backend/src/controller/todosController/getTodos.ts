import { Request, Response } from "express";
import Todo from "../../models/todoModel";
import { MESSAGES } from "../../constants/TODO/todoConstants";

const getTodos = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

  const userId = req.user.id;

  try {
    const todos = await Todo.findAll({
      where: {
        user_id_FK: userId,
      },
    });

    res.json(todos);
  } catch (err) {
    console.error(MESSAGES.ERROR_FETCHING_TASKS, err); // Debug output
    res.status(500).json({ message: MESSAGES.ERROR_FETCHING_TASKS });
  }
};

export default getTodos;
