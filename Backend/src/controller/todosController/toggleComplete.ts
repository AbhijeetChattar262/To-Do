import { Request, Response } from "express";
import Todo from "../../models/todoModel";
import { MESSAGES } from "../../constants/TODO/todoConstants"; // Adjust path as needed

const toggleComplete = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

  const { id } = req.params;
  const userId = req.user.id;

  try {
    const todo = await Todo.findOne({ where: { id, user_id_FK: userId } });
    
    if (!todo) {
      return res.status(404).json({ message: MESSAGES.TODO_NOT_FOUND });
    }

    const updatedTodo = await todo.update({ completed: !todo.completed });
    
    res.json(updatedTodo);
  } catch (err) {
    console.error(MESSAGES.ERROR_TOGGLING_TASK, err); // Debug output
    res.status(500).json({ message: MESSAGES.ERROR_TOGGLING_TASK });
  }
};

export default toggleComplete;
