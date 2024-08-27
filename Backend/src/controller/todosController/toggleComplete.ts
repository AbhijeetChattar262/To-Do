import { Request, Response } from "express";
import { db } from "../../db/connectDB";

const toggleComplete = (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;
  const userId = req.user.id;

  db.query(
    "UPDATE todos SET completed = NOT completed WHERE id = ? AND user_id = ?",
    [id, userId],
    (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error toggling task completion status" });
      res.json({ message: "Task completion status updated" });
    }
  );
};

export default toggleComplete;
