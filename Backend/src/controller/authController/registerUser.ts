import { Request, Response } from "express";
import { db } from "../../db/connectDB";
import bcrypt from "bcrypt";
import mysql, { RowDataPacket } from "mysql2";

//User Register
const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Credentials Needed");
  }

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

export default registerUser;
