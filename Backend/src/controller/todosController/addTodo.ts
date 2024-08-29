import { Request, Response } from "express";
import { db } from "../../db/connectDB";
import mysql from "mysql2";

const addTodo = (req: Request, res: Response) => {
  if (!req.user) {
    console.error("Unauthorized access attempt"); // Debug output
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { task } = req.body;
  const userId = req.user.id;

  db.query(
    "INSERT INTO todos (user_id_FK, task, completed) VALUES (?, ?, ?)",
    [userId, task, 0],
    (err, result) => {
      if (err) {
        console.error("Database Error:", err); // Debug output
        return res.status(500).json({ message: "Error adding task" });
      }
      res.status(201).json({
        id: (result as mysql.ResultSetHeader).insertId,
        task,
        completed: false,
      });
    }
  );
};

export default addTodo;
