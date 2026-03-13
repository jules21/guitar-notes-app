// src/hooks/useLocalPosts.js
// Merges seed data with anything saved in localStorage.
// New posts and edits are stored locally so the user
// doesn't lose work between sessions.

import { useState, useCallback } from 'react';
import { POSTS } from '../data/posts';

const LS_KEY = 'guitar_notes_posts_v1';

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function save(posts) {
  localStorage.setItem(LS_KEY, JSON.stringify(posts));
}

export function useLocalPosts() {
  const [posts, setPosts] = useState(() => {
    const local = load();
    if (!local) return [...POSTS];
    // Merge: local overrides seed, keeps order by part
    const byId = Object.fromEntries(local.map(p => [p.id, p]));
    const seedIds = new Set(POSTS.map(p => p.id));
    const merged = POSTS.map(p => byId[p.id] || p);
    const extras = local.filter(p => !seedIds.has(p.id));
    return [...merged, ...extras].sort((a, b) => a.part - b.part);
  });

  const upsertPost = useCallback((post) => {
    setPosts(prev => {
      const exists = prev.find(p => p.id === post.id);
      const next = exists
        ? prev.map(p => p.id === post.id ? post : p)
        : [...prev, post].sort((a, b) => a.part - b.part);
      save(next);
      return next;
    });
  }, []);

  const deletePost = useCallback((id) => {
    setPosts(prev => {
      const next = prev.filter(p => p.id !== id);
      save(next);
      return next;
    });
  }, []);

  const getPost = useCallback((id) => {
    return posts.find(p => p.id === id) || null;
  }, [posts]);

  const getAdjacent = useCallback((id) => {
    const idx = posts.findIndex(p => p.id === id);
    return {
      prev: idx > 0 ? posts[idx - 1] : null,
      next: idx < posts.length - 1 ? posts[idx + 1] : null,
    };
  }, [posts]);

  return { posts, upsertPost, deletePost, getPost, getAdjacent };
}
