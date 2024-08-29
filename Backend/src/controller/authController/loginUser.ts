import { Request, Response } from "express";
import User from "../../models/userModel"; // Adjust path as needed
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User Login
const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Credentials Needed");
  }

  try {
    // Query user by username using Sequelize
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "defaultSecret",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export default loginUser;
