import { Request, Response } from "express";
import { db } from "../../db/connectDB";

const deleteTodo = (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;
  const userId = req.user.id;

  db.query(
    "DELETE FROM todos WHERE id = ? AND user_id_FK = ?",
    [id, userId],
    (err) => {
      if (err) return res.status(500).json({ message: "Error deleting task" });
      res.json({ message: "Task deleted successfully" });
    }
  );
};

export default deleteTodo;
