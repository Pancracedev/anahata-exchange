import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const profiles = mysqlTable("profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  displayName: varchar("displayName", { length: 120 }).notNull(),
  initials: varchar("initials", { length: 8 }).notNull(),
  bio: text("bio"),
  location: varchar("location", { length: 120 }),
  languages: varchar("languages", { length: 120 }),
  skills: text("skills"),
  availability: varchar("availability", { length: 80 }),
  rating: int("rating").default(0).notNull(),
  reviewCount: int("reviewCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const opportunities = mysqlTable("opportunities", {
  id: int("id").autoincrement().primaryKey(),
  profileId: int("profileId"),
  type: mysqlEnum("type", ["offer", "request"]).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  credits: int("credits").notNull(),
  language: varchar("language", { length: 80 }),
  availability: varchar("availability", { length: 80 }),
  status: mysqlEnum("status", ["active", "paused", "closed"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const exchanges = mysqlTable("exchanges", {
  id: int("id").autoincrement().primaryKey(),
  opportunityId: int("opportunityId"),
  proposerProfileId: int("proposerProfileId"),
  recipientProfileId: int("recipientProfileId"),
  title: varchar("title", { length: 180 }).notNull(),
  message: text("message"),
  credits: int("credits").notNull(),
  status: mysqlEnum("status", ["proposed", "accepted", "progress", "done"]).default("proposed").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  exchangeId: int("exchangeId"),
  reviewerProfileId: int("reviewerProfileId"),
  reviewedProfileId: int("reviewedProfileId"),
  rating: int("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Profile = typeof profiles.$inferSelect;
export type Opportunity = typeof opportunities.$inferSelect;
export type Exchange = typeof exchanges.$inferSelect;
export type Review = typeof reviews.$inferSelect;
