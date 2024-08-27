import { Request, Response } from "express";
import { db } from "../../db/connectDB";
import mysql from "mysql2";

const addTodo = (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { task } = req.body;
  const userId = req.user.id;

  db.query(
    "INSERT INTO todos (user_id, task) VALUES (?, ?)",
    [userId, task],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error adding task" });
      res.status(201).json({
        id: (result as mysql.OkPacket).insertId,
        task,
        completed: false,
      });
    }
  );
};

export default addTodo;
