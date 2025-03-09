import {
    pgTable,
    serial,
    varchar,
    boolean,
    uuid,
    timestamp,
  } from "drizzle-orm/pg-core";

  export const USER_TABLE = pgTable("users", {
    id: serial().primaryKey(),
    userName: varchar().notNull(),
    email: varchar().notNull(),
    isMember: boolean().default(false),
  });



  export const STUDY_MATERIAL_TABLE = pgTable("studyMaterial", {
    id: serial().primaryKey(),
    worksheetId: uuid().notNull(),
    grade: varchar().notNull(),
    subject: varchar().notNull(),
    topic: varchar().notNull(),
    createdBy: uuid().notNull(), // If referencing users
    status: varchar().default("Generating"),
    createdAt: timestamp("created_at").defaultNow(), // Tracks creation time
  });