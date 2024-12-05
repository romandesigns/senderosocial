import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  schema: "./app/[lang]/db/schema/*.ts",
  out: "./app/[lang]/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
