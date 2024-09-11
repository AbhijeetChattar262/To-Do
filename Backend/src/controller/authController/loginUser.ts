import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MysqlSequelizeAdapter } from "../../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../../db/enums";
import { LOGIN_MESSAGES, JWT_SECRET } from "../../constants/AUTH/loginConstants";
import { UserAttributes } from "../../db/Types/UserType"; // Adjust this path as necessary

// Type guard to check if an object is UserAttributes
function isUserAttributes(obj: any): obj is UserAttributes {
  return obj && typeof obj.id === 'number' && typeof obj.username === 'string' && typeof obj.password === 'string';
}

// User Login
const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send(LOGIN_MESSAGES.CREDENTIALS_NEEDED);
  }

  try {
    const adapter = MysqlSequelizeAdapter.getInstance();

    // Query user by username using MysqlSequelizeAdapter
    const userRecord = await adapter.findOne(DbModelsEnum.USERS, { where: { username } });

    if (!userRecord) {
      return res.status(400).json({ message: LOGIN_MESSAGES.USER_NOT_FOUND });
    }

    // Use type guard to ensure userRecord conforms to UserAttributes
    if (!isUserAttributes(userRecord)) {
      return res.status(500).json({ message: LOGIN_MESSAGES.SERVER_ERROR });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, userRecord.password);
    if (!isMatch) {
      return res.status(400).json({ message: LOGIN_MESSAGES.INVALID_CREDENTIALS });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: userRecord.id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: LOGIN_MESSAGES.LOGIN_SUCCESS,
      token,
    });
  } catch (err) {
    console.error("Error during login:", err); // Improved error logging
    res.status(500).json({ message: LOGIN_MESSAGES.SERVER_ERROR });
  }
};

export default loginUser;
