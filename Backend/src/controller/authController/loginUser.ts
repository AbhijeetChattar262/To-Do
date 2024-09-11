import { Request, Response } from "express";
import User from "../../models/userModel"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LOGIN_MESSAGES, JWT_SECRET } from "../../constants/AUTH/loginConstants";

// User Login
const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send(LOGIN_MESSAGES.CREDENTIALS_NEEDED);
  }

  try {
    // Query user by username using Sequelize
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: LOGIN_MESSAGES.USER_NOT_FOUND });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: LOGIN_MESSAGES.INVALID_CREDENTIALS });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: LOGIN_MESSAGES.LOGIN_SUCCESS,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: LOGIN_MESSAGES.SERVER_ERROR });
  }
};

export default loginUser;
