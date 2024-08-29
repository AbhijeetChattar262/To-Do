import { Request, Response } from "express";
import User from "../../models/userModel"; // Adjust path as needed
import bcrypt from "bcrypt";

// User Register
const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Credentials Needed");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ id: user.id, username: user.username });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: "Error registering user" });
  }
};

export default registerUser;
