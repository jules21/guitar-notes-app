// src/lib/auth-db.js
// Users table + auth queries via Neon serverless

import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const sql = neon(import.meta.env.VITE_DATABASE_URL);

// ── Schema ────────────────────────────────────────────────
export async function ensureUsersTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id         SERIAL PRIMARY KEY,
      email      TEXT UNIQUE NOT NULL,
      password   TEXT NOT NULL,          -- bcrypt hash
      name       TEXT NOT NULL DEFAULT '',
      role       TEXT NOT NULL DEFAULT 'member', -- 'admin' | 'member'
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

// ── Login: returns user row (without password) or null ────
export async function dbLogin(email, plainPassword) {
  const rows = await sql`
    SELECT * FROM users WHERE email = ${email.toLowerCase().trim()} LIMIT 1
  `;
  if (rows.length === 0) return null;

  const user = rows[0];
  const ok = await bcrypt.compare(plainPassword, user.password);
  if (!ok) return null;

  // Never return the hash
  const { password: _, ...safeUser } = user;
  return safeUser;
}

// ── Get user by id (for token verification) ───────────────
export async function dbGetUserById(id) {
  const rows = await sql`
    SELECT id, email, name, role FROM users WHERE id = ${id} LIMIT 1
  `;
  return rows[0] || null;
}

// ── Utility: hash a password (use in browser console to create users) ──
export async function hashPassword(plain) {
  return bcrypt.hash(plain, 12);
}

// ── Insert a new invited user ─────────────────────────────
export async function dbCreateUser(email, plainPassword, name, role = 'member') {
  const hash = await bcrypt.hash(plainPassword, 12);
  const rows = await sql`
    INSERT INTO users (email, password, name, role)
    VALUES (${email.toLowerCase().trim()}, ${hash}, ${name}, ${role})
    ON CONFLICT (email) DO NOTHING
    RETURNING id, email, name, role
  `;
  return rows[0] || null;
}
