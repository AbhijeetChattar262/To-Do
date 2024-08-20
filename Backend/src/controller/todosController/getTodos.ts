import { Request, Response } from "express";
import { db } from "../../db/connectDB";
import { RowDataPacket } from "mysql2";

const getTodos = (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const userId = req.user.id;

  db.query(
    "SELECT * FROM todos WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Error fetching tasks" });
      res.json(results as RowDataPacket[]);
    }
  );
};

export default getTodos;
