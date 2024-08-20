import { Request, Response } from "express";
import { db } from "../../db/connectDB";

const updateTodo = (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;
  const { task } = req.body;
  const userId = req.user.id;

  db.query(
    "UPDATE todos SET task = ? WHERE id = ? AND user_id = ?",
    [task, id, userId],
    (err) => {
      if (err) return res.status(500).json({ message: "Error updating task" });
      res.json({ message: "Task updated successfully" });
    }
  );
};

export default updateTodo;
