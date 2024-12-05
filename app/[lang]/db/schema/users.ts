import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", [
  "coordinator",
  "leader",
  "staff",
  "admin",
  "developer",
  "participant",
]);

const timestamps = {
  updated_at: timestamp().defaultNow(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const usersMigration = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar().notNull(),
  lastName: varchar().notNull(),
  email: varchar().unique().notNull(),
  role: rolesEnum().default("participant"),
  ...timestamps,
});
