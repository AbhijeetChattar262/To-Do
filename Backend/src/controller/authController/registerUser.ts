import { Request, Response } from "express";
import User from "../../models/userModel";
import bcrypt from "bcrypt";
import { REGISTER_MESSAGES } from "../../constants/AUTH/registerConstants";

// User Register
const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send(REGISTER_MESSAGES.CREDENTIALS_NEEDED);
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: REGISTER_MESSAGES.USER_ALREADY_EXISTS });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ id: user.id, username: user.username });
  } catch (err) {
    console.error(REGISTER_MESSAGES.ERROR_REGISTERING_USER," ", err);
    res.status(500).json({ message: REGISTER_MESSAGES.ERROR_REGISTERING_USER });
  }
};

export default registerUser;
