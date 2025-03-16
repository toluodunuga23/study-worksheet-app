import {
  pgTable,
  serial,
  varchar,
  json,
  boolean,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  isMember: boolean().default(false),
});

export const STUDY_MATERIAL_TABLE = pgTable("studyMaterial", {
  id: serial().primaryKey(),
  worksheetId: uuid().notNull(),
  gradeLevel: varchar().notNull(),
  subject: varchar().notNull(),
  topic: varchar().notNull(),
  worksheetLayout: json(),
  createdBy: varchar().notNull(),
  // status: varchar().default("Generating"),
  // createdAt: timestamp("created_at").defaultNow(), // Tracks creation time
});

// npx drizzle-kit push
// npx drizzle-kit studio
