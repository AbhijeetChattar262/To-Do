import { MysqlSequelizeAdapter } from "../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../db/enums";
import { UserAttributes } from "../db/Types/UserType";

class LoginManager {
  static async findUserByUsername(username: string): Promise<UserAttributes | null> {
    const adapter = MysqlSequelizeAdapter.getInstance();
    const userRecord = await adapter.findOne(DbModelsEnum.USERS, { where: { username } });

    if (userRecord && typeof userRecord.get === 'function') {
      return userRecord.get() as UserAttributes; 
    }

    return null;
  }
}

export { LoginManager}