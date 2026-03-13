// src/lib/db.js
// ─────────────────────────────────────────────────────────
// Neon serverless driver.
// Set VITE_DATABASE_URL in your .env file:
//   VITE_DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require
// ─────────────────────────────────────────────────────────

import { neon } from '@neondatabase/serverless';

const sql = neon(import.meta.env.VITE_DATABASE_URL);

// ── Schema ───────────────────────────────────────────────
// Run once to create the table. Called from usePosts on first load.
export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id          TEXT PRIMARY KEY,
      part        INTEGER NOT NULL DEFAULT 0,
      title       TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      date        TEXT NOT NULL DEFAULT '',
      tags        TEXT NOT NULL DEFAULT '[]',
      content     TEXT NOT NULL DEFAULT '',
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

// ── CRUD ─────────────────────────────────────────────────

export async function dbGetAllPosts() {
  const rows = await sql`
    SELECT * FROM posts ORDER BY part ASC, created_at ASC
  `;
  return rows.map(deserialize);
}

export async function dbUpsertPost(post) {
  const p = serialize(post);
  await sql`
    INSERT INTO posts (id, part, title, description, date, tags, content, updated_at)
    VALUES (${p.id}, ${p.part}, ${p.title}, ${p.description}, ${p.date}, ${p.tags}, ${p.content}, NOW())
    ON CONFLICT (id) DO UPDATE SET
      part        = EXCLUDED.part,
      title       = EXCLUDED.title,
      description = EXCLUDED.description,
      date        = EXCLUDED.date,
      tags        = EXCLUDED.tags,
      content     = EXCLUDED.content,
      updated_at  = NOW()
  `;
}

export async function dbDeletePost(id) {
  await sql`DELETE FROM posts WHERE id = ${id}`;
}

// ── Serialization ─────────────────────────────────────────
// tags is stored as a JSON string in Postgres TEXT column

function serialize(post) {
  return { ...post, tags: JSON.stringify(post.tags ?? []) };
}

function deserialize(row) {
  return {
    ...row,
    part: Number(row.part),
    tags: (() => { try { return JSON.parse(row.tags); } catch { return []; } })(),
  };
}

export default sql;
