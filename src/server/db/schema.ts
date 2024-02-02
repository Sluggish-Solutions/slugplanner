// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { randomUUID } from "crypto";
import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  int,
  mysqlTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `slugplanner_${name}`);

export const posts = createTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const courses = createTable(
  "courses",
  {
    id: varchar('id', { length: 128 }).$defaultFn(() => randomUUID()).primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    // okay we are cooking
    dept_num: varchar("dept_num", { length: 20 }),
    title: varchar("title", {length: 256}),
    description: text("description"),
    erlw: boolean("erlw").notNull().default(true),
    lower_cred_limit: int("lower_cred_limit").notNull().default(0),
    upper_cred_limit: int("upper_cred_limit").notNull().default(500),
    prereq_text: text("prereq_test"),
    class_notes: text("class_notes"),
    career: varchar("career", {length: 50}),
    gen_ed_code: varchar("gen_ed_code", {length: 50}),
    type: varchar("type", {length: 100}),
    order: int("order")
  },
);
