import { MysqlSequelizeAdapter } from "../db/Mysql/MysqlDbAdapter";
import { DbModelsEnum } from "../db/enums";
import { UserAttributes } from "../db/Types/UserType";
import { Model } from "sequelize";

export class AuthManager {
    public static async findUserByUsername(username: string): Promise<UserAttributes | null> {
        const adapter = MysqlSequelizeAdapter.getInstance();
        const userRecord = await adapter.findOne(DbModelsEnum.USERS, { where: { username } });
    
        if (userRecord && typeof userRecord.get === 'function') {
          return userRecord.get() as UserAttributes; 
        }
    
        return null;
      }
   
    public  static async createUser(username: string, password: string): Promise<UserAttributes | null> {
        const adapter = MysqlSequelizeAdapter.getInstance();
        const newUser = await adapter.create(DbModelsEnum.USERS, { username, password }) as Model<UserAttributes>;
    
        if (newUser && typeof newUser.get === 'function') {
          return newUser.get({ plain: true }) as UserAttributes;
        }
        return null;
      }
    }
    