import { integer, pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: varchar("createdAt", { length: 255 }).notNull(),
  updatedAt: varchar("updatedAt", { length: 255 }).notNull(),
  deletedAt: varchar("deletedAt", { length: 255 }),
});
