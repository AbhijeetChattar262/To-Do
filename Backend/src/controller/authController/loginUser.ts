import { Request, Response } from "express";
import { LoginService } from "../../services/LoginService";
import { LOGIN_MESSAGES } from "../../constants/AUTH/loginConstants";

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send(LOGIN_MESSAGES.CREDENTIALS_NEEDED);
  }

  try {
    const token = await LoginService.login(username, password);
    if (token) {
      res.json({ message: LOGIN_MESSAGES.LOGIN_SUCCESS, token });
    } else {
      res.status(400).json({ message: LOGIN_MESSAGES.INVALID_CREDENTIALS });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: LOGIN_MESSAGES.SERVER_ERROR });
  }
};

export  default loginUser ;