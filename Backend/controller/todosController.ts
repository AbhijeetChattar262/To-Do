import { Request, Response } from "express";
import { db } from "../db/connectDB";
import mysql, { RowDataPacket } from "mysql2";

export const addTodo = (req: Request, res: Response) => {
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

export const getTodos = (req: Request, res: Response) => {
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

export const updateTodo = (req: Request, res: Response) => {
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

export const deleteTodo = (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;
  const userId = req.user.id;

  db.query(
    "DELETE FROM todos WHERE id = ? AND user_id = ?",
    [id, userId],
    (err) => {
      if (err) return res.status(500).json({ message: "Error deleting task" });
      res.json({ message: "Task deleted successfully" });
    }
  );
};

export const toggleComplete = (req: Request, res: Response) => {
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
