import {
  uuid,
  pgTable,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enum for Roles
enum Roles {
  ADMIN = "coordinator",
  EXCURSIONISTA = "excursionist",
  STAFF = "staff",
  DEVELOPER = "developer",
}

// User Auth Table (must be created first)
export const userAuthTable = pgTable("user_auth", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  phone: varchar("phone", { length: 255 }),
  phoneVerified: boolean("phone_verified").default(false),
  email: varchar("email", { length: 255 }).unique().notNull(),
  emailVerified: boolean("email_verified").default(false),
  password: varchar("password", { length: 255 }).notNull(),
  locale: varchar("locale", { length: 10 }).notNull(),
  createdOn: timestamp("created_on").notNull().defaultNow(),
  lastLogin: timestamp("last_login"),
  logins: timestamp("logins")
    .array()
    .notNull()
    .default(sql`ARRAY[]::timestamp[]`),
  updatedLog: timestamp("updates")
    .array()
    .notNull()
    .default(sql`ARRAY[]::timestamp[]`),
  // New optional fields
  twillioLocale: varchar("twillio_locale", { length: 10 }),
  phoneNumber: varchar("phone_number", { length: 255 }),
  countryCode: varchar("country_code", { length: 2 }), // ISO Alpha-2 country code
  countryCallingCode: varchar("country_calling_code", { length: 5 }),
  nationalNumber: varchar("national_number", { length: 15 }),
  internationalNumber: varchar("international_number", { length: 255 }),
  possibleCountries: varchar("possible_countries", { length: 255 }),
  isValid: boolean("is_valid").default(false),
  isPossible: boolean("is_possible").default(false),
  uri: varchar("uri", { length: 255 }),
  type: varchar("type", { length: 50 }),
});

// Users Table (depends on userAuthTable)
export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  dateOfBirth: timestamp("date_of_birth").notNull(),
  role: varchar("role", { length: 100 }).notNull().default(Roles.EXCURSIONISTA),
  userAuthId: uuid("auth_id")
    .notNull()
    .references(() => userAuthTable.id, { onDelete: "cascade" }),
});

export const User = userTable;
export const UserAuth = userAuthTable;
