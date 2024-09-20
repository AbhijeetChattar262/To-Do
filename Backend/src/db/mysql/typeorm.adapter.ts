import { User } from '../models/user.entity';
import { Todo } from '../models/todo.entity';

export class TypeORMAdapter {
  private static _instance: TypeORMAdapter;
  private dataSource: any;
  private entities: any[];

  private constructor(dataSource: any) {
    this.dataSource = dataSource;
    this.entities = [User, Todo];
  }

  public static getInstance(dataSource: any): TypeORMAdapter {
    if (!TypeORMAdapter._instance) {
      TypeORMAdapter._instance = new TypeORMAdapter(dataSource);
    }
    return TypeORMAdapter._instance;
  }

  private getRepository(entityName: string) {
    const entity = this.entities.find((entity) => entity.name === entityName);
    if (!entity) {
      throw new Error(`Entity ${entityName} not found`);
    }
    return this.dataSource.getRepository(entity);
  }

  public async create(entityName: string, values: object): Promise<any> {
    try {
      const repository = this.getRepository(entityName);
      return await repository.save(values);
    } catch (error) {
      console.error(`Error creating ${entityName}:`, error);
      throw error;
    }
  }

  public async findOne(entityName: string, where: object): Promise<any | null> {
    try {
      const repository = this.getRepository(entityName);
      return await repository.findOne(where);
    } catch (error) {
      console.error(`Error finding ${entityName}:`, error);
      throw error;
    }
  }

  public async findAll(entityName: string, where: object): Promise<any[]> {
    try {
      const repository = this.getRepository(entityName);
      return await repository.find(where);
    } catch (error) {
      console.error(`Error finding all ${entityName}:`, error);
      throw error;
    }
  }

  public async update(entityName: string, where: object, data: object): Promise<any> {
    try {
      const repository = this.getRepository(entityName);
      const result = await repository.update(where, data);
      return result;
    } catch (error) {
      console.error(`Error updating ${entityName}:`, error);
      throw error;
    }
  }

  public async destroy(entityName: string, where: object): Promise<any> {
    try {
      const repository = this.getRepository(entityName);
      return await repository.delete(where);
    } catch (error) {
      console.error(`Error deleting ${entityName}:`, error);
      throw error;
    }
  }
}