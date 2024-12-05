import { db } from "../connection";
import { users } from "../schema/users";
import { migrate } from "drizzle-orm/pg-core";

const main = async () => {
  await migrate(db, users);
  const output = await db.select().from(users);
  console.log(output);
};
