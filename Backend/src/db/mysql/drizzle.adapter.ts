import { eq, Column } from "drizzle-orm";
import dbPromise from "../connect-db";


export class DrizzleAdapter {
  private static _instance: DrizzleAdapter;
  private db!: Awaited<typeof dbPromise>;
  private constructor() {}

  public static async getInstance() {
    if (!DrizzleAdapter._instance) {
      DrizzleAdapter._instance = new DrizzleAdapter();
      DrizzleAdapter._instance.db = await dbPromise;
    }
    return DrizzleAdapter._instance;
  }

  public async create(table: any, values: object): Promise<void> {
    await this.db.insert(table).values(values);
    console.log("Data inserted successfully!");
  }

  public async findOne(table: any, column: Column<any>, value: any): Promise<object | null> {
    const result = await this.db.select().from(table).where(eq(column, value));
    return result.length > 0 ? result[0] : null;
  }

  public async update(table: any, values: object, column: Column<any>, value: any): Promise<boolean> {
    try {
      await this.db.update(table).set(values).where(eq(column, value));
      return true;
    } catch (error) {
      console.error("Update failed:", error);
      return false; 
    }
  }

  public async findAll(table: any, column: Column<any>, value: any): Promise<object[]> {
    
    const result = await this.db.select().from(table).where(eq(column, value));
    return result;
  }

  public async destroy(table: any, column: Column<any>, value: any): Promise<boolean> {
    try {
      await this.db.delete(table).where(eq(column, value));
      return true; 
    } catch (error) {
      console.error("Delete failed:", error);
      return false; 
    }
  }
}
