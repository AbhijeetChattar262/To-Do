import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../connect-db";  // Assuming this exports the Sequelize instance
import { UserDbModel } from "./user.model";
import { TodoDbModel } from "./todo.model";

export class DbModels {
    private static _instance: DbModels;

    private static _user : any;
    private static _todo : any;

    private constructor() {
        DbModels._user = UserDbModel.getModel(sequelize, DataTypes);
        DbModels._todo = TodoDbModel.getModel(sequelize, DataTypes);

        
    }

    public static getInstance(): DbModels {
        if (!DbModels._instance) {
            DbModels._instance = new DbModels();
        }
        return DbModels._instance;
    }

    public get user() {
        return DbModels._user;
    }

    public get todo() {
        return DbModels._todo;
    }
}

// Export the DbModels class and models
export const dbModels = DbModels.getInstance();

