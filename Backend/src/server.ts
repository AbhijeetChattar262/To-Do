import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mysql, { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// User Registration Route
app.post("/register", async (req: Request, res: Response) => {
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
});

// User Login Route
app.post("/login", (req: Request, res: Response) => {
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
});

// Middleware to verify token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(
      token as string,
      process.env.JWT_SECRET || "defaultSecret"
    );
    req.user = verified as { id: number };
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Todo Routes
app.post("/todos", verifyToken, (req: Request, res: Response) => {
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
});

app.get("/todos", verifyToken, (req: Request, res: Response) => {
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
});

app.put("/todos/:id", verifyToken, (req: Request, res: Response) => {
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
});

app.delete("/todos/:id", verifyToken, (req: Request, res: Response) => {
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
});

app.put("/todos/toggle/:id", verifyToken, (req: Request, res: Response) => {
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
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// Extend the Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}
