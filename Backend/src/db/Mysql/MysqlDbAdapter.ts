import { Model, Sequelize, Transaction, ModelStatic, UpdateOptions, CreateOptions, FindOptions } from "sequelize";
import sequelize from "../connectDB"; // Adjust the path to your config file
import { DbModels } from "../../models";
import { DbModelsEnum } from "../enums";
import { UserAttributes } from "../../db/Types/UserType";

// An adapter for Sequelize specific to MySql
export class MysqlSequelizeAdapter {
    private static _instance: MysqlSequelizeAdapter;
    private static mySqlModels: DbModels;
    private readonly _sequelize: Sequelize;
    private transaction: Transaction | null;

    private constructor() {
        this._sequelize = sequelize;
        MysqlSequelizeAdapter.mySqlModels = DbModels.getInstance();
        this.transaction = null;
    }



    public static getInstance() {
        if (!MysqlSequelizeAdapter._instance) {
            MysqlSequelizeAdapter._instance = new MysqlSequelizeAdapter();
        }
        return MysqlSequelizeAdapter._instance;
    }

    public getSequelizeInstance(): Sequelize {
        return this._sequelize;
    }

    // Builds a new model instance and calls save on it.
    public create(model: DbModelsEnum, values: object, options?: object): Promise<Model> {
        return this.getModel(model).create(values, options);
    }


    public bulkCreate(model: DbModelsEnum, values: object[], options?: object): Promise<Array<Model>> {
        return this.getModel(model).bulkCreate(values, options);
    }

    // Find all the rows matching your query, within a specified offset / limit, and get the total number of rows matching your query.
    public findAndCountAll(model: DbModelsEnum, options: object): Promise<{ count: number | number[]; rows: Model[] }> {
        return this.getModel(model).findAndCountAll(options);
    }

    // Search for a single instance by its primary key.
    public findByPk(model: DbModelsEnum, param: number | string | Buffer, options: object) {
        return this.getModel(model).findByPk(param, options);
    }

    // Search for a single instance.
    public findOne(model: DbModelsEnum, options:any): Promise<Model | null> {
        return this.getModel(model).findOne(options);
    }

    // Update multiple instances that match the where options.
    public async update(model: DbModelsEnum, values: object, options: object): Promise<number> {
        //sequelize update query return the Array of size 1
        // array[0] contain the number of affected rows
        const numberOfAffectedRows: number[] = await this.getModel(model).update(values, options);
        return numberOfAffectedRows[0];
    }

    // Search for multiple instances.
    public findAll(model: DbModelsEnum, options: object): Promise<Array<Model>> {
        return this.getModel(model).findAll(options);
    }

    public count(model: DbModelsEnum, options: object): Promise<Array<Model>> {
        return this.getModel(model).count(options);
    }
    public destroy(model: DbModelsEnum, options: object): Promise<number> {
        // sequelize destroy query returns the number of affected rows
        return this.getModel(model).destroy(options);
    }
    

    public getModel(model: DbModelsEnum) {
        const modelDemo = MysqlSequelizeAdapter.mySqlModels[model];
        return modelDemo;
    }
}