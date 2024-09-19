import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../connect-db";  // Assuming this exports the Sequelize instance
import { UserDbModel } from "./user.model";
import { TodoDbModel } from "./todo.model";

export class DbModels {
    private static _instance: DbModels;

    private static _user : any;
    private static _todo : any;

    // Private constructor to enforce singleton pattern
    private constructor() {
        // Initialize models
        DbModels._user = UserDbModel.getModel(sequelize, DataTypes);
        DbModels._todo = TodoDbModel.getModel(sequelize, DataTypes);

        // Define model relationships here if necessary
        // Example:
        // DbModels._user.hasMany(DbModels._todo, { foreignKey: 'userId' });
        // DbModels._todo.belongsTo(DbModels._user, { foreignKey: 'userId' });
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

