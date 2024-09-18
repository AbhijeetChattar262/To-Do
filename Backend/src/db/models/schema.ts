import { mysqlSchema, int, text, boolean } from "drizzle-orm/mysql-core";

// Define the schema
export const mySchema = mysqlSchema("task");


export const usersTable = mySchema.table("users", {
  id: int("id").primaryKey().autoincrement(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});


export const todosTable = mySchema.table("todos", {
  id: int("id").primaryKey().autoincrement(),
  task: text("task").notNull(),
  completed: boolean("completed").notNull(),
  user_id_FK: int("user_id_FK").notNull().references(() => usersTable.id),
});
