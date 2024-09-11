import { Request, Response } from "express";
import { RegisterService  } from "../../services/RegisterService";
import { REGISTER_MESSAGES } from "../../constants/AUTH/registerConstants";

const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validate the incoming request
  if (!username || !password) {
    return res.status(400).send(REGISTER_MESSAGES.CREDENTIALS_NEEDED);
  }

  try {
    const newUser = await RegisterService.register(username, password);

    res.status(201).json({
      id: newUser?.id,
      username: newUser?.username,
    });
  } catch (err : any) {
    if (err.message === REGISTER_MESSAGES.USER_ALREADY_EXISTS) {
      return res.status(400).json({ message: REGISTER_MESSAGES.USER_ALREADY_EXISTS });
    }

    console.error(REGISTER_MESSAGES.ERROR_REGISTERING_USER, err);
    res.status(500).json({ message: REGISTER_MESSAGES.ERROR_REGISTERING_USER });
  }
};

export default registerUser;