import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { MysqlSequelizeAdapter } from "../../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../../db/enums";
import { UserAttributes } from "../../db/Types/UserType"; // Ensure this path is correct
import { REGISTER_MESSAGES } from "../../constants/AUTH/registerConstants";
import { Model } from "sequelize";

const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validate the incoming request
  if (!username || !password) {
    return res.status(400).send(REGISTER_MESSAGES.CREDENTIALS_NEEDED);
  }

  try {
    // Instantiate the MySQL adapter
    const adapter = MysqlSequelizeAdapter.getInstance();

    // Check if user already exists
    const existingUser = await adapter.findOne(DbModelsEnum.USERS, {
      where: { username },
    });

    if (existingUser) {
      return res.status(409).json({ message: REGISTER_MESSAGES.USER_ALREADY_EXISTS });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and cast it to Model<UserAttributes>
    const newUser = await adapter.create(DbModelsEnum.USERS, {
      username,
      password: hashedPassword,
    }) as Model<UserAttributes>;

    // Extract the user data from the Sequelize model instance
    const userData = newUser.get({ plain: true }) as UserAttributes;

    // Return the newly created user data
    res.status(201).json({
      id: userData.id,
      username: userData.username,
    });
  } catch (err) {
    console.error(REGISTER_MESSAGES.ERROR_REGISTERING_USER, err);
    res.status(500).json({ message: REGISTER_MESSAGES.ERROR_REGISTERING_USER });
  }
};

export default registerUser;
