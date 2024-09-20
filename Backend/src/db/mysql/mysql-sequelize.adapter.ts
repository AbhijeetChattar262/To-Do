import { Model, Sequelize, Transaction, ModelStatic, UpdateOptions, CreateOptions, FindOptions } from "sequelize";
import sequelize from "../connect-db"; // Adjust the path to your config file
import { DbModels } from "../models";
import { DbModelsEnum } from "../../enums";

// An adapter for Sequelize specific to MySql
export class MysqlSequelizeAdapter {
    private static _instance: MysqlSequelizeAdapter;
    private static mySqlModels: DbModels;
    private readonly _sequelize: Sequelize;

    private constructor() {
        this._sequelize = sequelize;
        MysqlSequelizeAdapter.mySqlModels = DbModels.getInstance();
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

    public create(model: DbModelsEnum, values: object, options?: object): Promise<Model> {
        return this.getModel(model).create(values, options);
    }
    
    public findOne(model: DbModelsEnum, options:any): Promise<Model | null> {
        return this.getModel(model).findOne(options);
    }

    public async update(model: DbModelsEnum, values: object, options: object): Promise<number> {
        const numberOfAffectedRows: number[] = await this.getModel(model).update(values, options);
        return numberOfAffectedRows[0];
    }

    public findAll(model: DbModelsEnum, options: object): Promise<Array<Model>> {
        return this.getModel(model).findAll(options);
    }


    public destroy(model: DbModelsEnum, options: object): Promise<number> {
        return this.getModel(model).destroy(options);
    }
    

    public getModel(model: DbModelsEnum) {
        const modelDemo = MysqlSequelizeAdapter.mySqlModels[model];
        return modelDemo;
    }
}