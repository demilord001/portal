import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

const getOwner = async () => (process.env.CLERK_SECRET_KEY ? (await auth()).userId : "local-demo");
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export async function GET() {
  const userId = await getOwner();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!sql) return Response.json({ chats: [], configured: false });
  const chats = await sql`SELECT c.id, c.title, c.updated_at AS "updatedAt", COALESCE(json_agg(json_build_object('role', m.role, 'content', m.content) ORDER BY m.created_at) FILTER (WHERE m.id IS NOT NULL), '[]') AS messages FROM portal_chats c LEFT JOIN portal_messages m ON m.chat_id = c.id WHERE c.user_id = ${userId} GROUP BY c.id ORDER BY c.updated_at DESC`;
  return Response.json({ chats, configured: true });
}

export async function POST(request: NextRequest) {
  const userId = await getOwner();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!sql) return Response.json({ saved: false });
  const { chat } = await request.json();
  if (!chat?.id || !chat?.title) return Response.json({ error: "Invalid chat" }, { status: 400 });
  await sql`INSERT INTO portal_chats (id, user_id, title, updated_at) VALUES (${chat.id}, ${userId}, ${chat.title}, NOW()) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, updated_at = NOW() WHERE portal_chats.user_id = ${userId}`;
  for (const [index, message] of (chat.messages ?? []).entries()) await sql`INSERT INTO portal_messages (id, chat_id, role, content) VALUES (${`${chat.id}-${index}`}, ${chat.id}, ${message.role}, ${message.content}) ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content`;
  return Response.json({ saved: true });
}
