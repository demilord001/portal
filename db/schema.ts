import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const portalChats = pgTable("portal_chats", { id: text("id").primaryKey(), userId: text("user_id").notNull(), title: text("title").notNull(), createdAt: timestamp("created_at").defaultNow().notNull(), updatedAt: timestamp("updated_at").defaultNow().notNull() });
export const portalMessages = pgTable("portal_messages", { id: text("id").primaryKey(), chatId: text("chat_id").notNull().references(() => portalChats.id, { onDelete: "cascade" }), role: text("role").notNull(), content: text("content").notNull(), attachments: text("attachments"), createdAt: timestamp("created_at").defaultNow().notNull() });
export const portalNotebooks = pgTable("portal_notebooks", { id: text("id").primaryKey(), userId: text("user_id").notNull(), title: text("title").notNull(), description: text("description"), createdAt: timestamp("created_at").defaultNow().notNull(), updatedAt: timestamp("updated_at").defaultNow().notNull() });
export const portalNotebookSources = pgTable("portal_notebook_sources", { id: text("id").primaryKey(), notebookId: text("notebook_id").notNull().references(() => portalNotebooks.id, { onDelete: "cascade" }), name: text("name").notNull(), type: text("type").notNull(), content: text("content"), createdAt: timestamp("created_at").defaultNow().notNull() });
export type PortalChat = typeof portalChats.$inferSelect;
export type PortalMessage = typeof portalMessages.$inferSelect;
