import { db } from "../db/db.connect";
import bcrypt from "bcrypt";
import mysql, { RowDataPacket } from "mysql2";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

//User Register
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });

      const userResults = results as RowDataPacket[];
      if (userResults.length > 0)
        return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err, result) => {
          if (err)
            return res.status(500).json({ message: "Error registering user" });
          res
            .status(201)
            .json({ id: (result as mysql.OkPacket).insertId, username });
        }
      );
    }
  );
};

// User Login
export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });

      const userResults = results as RowDataPacket[];
      if (userResults.length === 0)
        return res.status(400).json({ message: "User not found" });

      const user = userResults[0] as {
        id: number;
        username: string;
        password: string;
      };

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "defaultSecret",
        { expiresIn: "1h" }
      );
      res.json({
        message: "Login successful",
        token: token,
      });
    }
  );
};
