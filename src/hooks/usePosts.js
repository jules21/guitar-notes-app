// src/hooks/usePosts.js
// ─────────────────────────────────────────────────────────
// Replaces useLocalPosts.js — uses Neon Postgres.
// Falls back gracefully to seed data if DB isn't configured.
// ─────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { POSTS } from '../data/posts';
import { ensureSchema, dbGetAllPosts, dbUpsertPost, dbDeletePost } from '../lib/db';

const HAS_DB = !!import.meta.env.VITE_DATABASE_URL;

// ── Local-storage fallback (when no DB configured) ───────
const LS_KEY = 'guitar_notes_posts_v1';
function lsLoad() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || null; } catch { return null; }
}
function lsSave(posts) {
  localStorage.setItem(LS_KEY, JSON.stringify(posts));
}

export function usePosts() {
  const [posts, setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  // ── Initial load ────────────────────────────────────────
  useEffect(() => {
    async function init() {
      if (!HAS_DB) {
        // No DB — use localStorage + seed
        const local = lsLoad();
        if (local) {
          setPosts(local);
        } else {
          setPosts([...POSTS]);
          lsSave([...POSTS]);
        }
        setLoading(false);
        return;
      }

      try {
        await ensureSchema();
        let rows = await dbGetAllPosts();

        // First-time: seed the DB with existing posts
        if (rows.length === 0) {
          await Promise.all(POSTS.map(p => dbUpsertPost(p)));
          rows = await dbGetAllPosts();
        }

        setPosts(rows);
      } catch (e) {
        console.error('Neon error:', e);
        setError(e.message);
        // Fallback to seed data so UI doesn't break
        setPosts([...POSTS]);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  // ── Upsert ──────────────────────────────────────────────
  const upsertPost = useCallback(async (post) => {
    // Optimistic update
    setPosts(prev => {
      const exists = prev.find(p => p.id === post.id);
      const next = exists
        ? prev.map(p => p.id === post.id ? post : p)
        : [...prev, post];
      const sorted = next.sort((a, b) => a.part - b.part);
      if (!HAS_DB) lsSave(sorted);
      return sorted;
    });

    if (HAS_DB) {
      try { await dbUpsertPost(post); }
      catch (e) { console.error('upsert failed:', e); setError(e.message); }
    }
  }, []);

  // ── Delete ──────────────────────────────────────────────
  const deletePost = useCallback(async (id) => {
    setPosts(prev => {
      const next = prev.filter(p => p.id !== id);
      if (!HAS_DB) lsSave(next);
      return next;
    });

    if (HAS_DB) {
      try { await dbDeletePost(id); }
      catch (e) { console.error('delete failed:', e); setError(e.message); }
    }
  }, []);

  // ── Helpers ──────────────────────────────────────────────
  const getPost = useCallback((id) => posts.find(p => p.id === id) || null, [posts]);

  const getAdjacent = useCallback((id) => {
    const idx = posts.findIndex(p => p.id === id);
    return {
      prev: idx > 0 ? posts[idx - 1] : null,
      next: idx < posts.length - 1 ? posts[idx + 1] : null,
    };
  }, [posts]);

  return { posts, loading, error, upsertPost, deletePost, getPost, getAdjacent };
}
