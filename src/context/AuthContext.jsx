// src/context/AuthContext.jsx
// JWT stored in localStorage. jose signs/verifies in-browser.
// Secret is VITE_JWT_SECRET from .env

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as jose from 'jose';
import { dbLogin, ensureUsersTable } from '../lib/auth-db';

const AuthContext = createContext(null);

const LS_TOKEN_KEY = 'guitar_notes_token';

// Must be 32+ chars. Set VITE_JWT_SECRET in .env
function getSecret() {
  const s = import.meta.env.VITE_JWT_SECRET || 'guitar-notes-fallback-secret-32ch!!';
  return new TextEncoder().encode(s);
}

async function signToken(user) {
  return new jose.SignJWT({ id: user.id, email: user.email, name: user.name, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(getSecret());
}

async function verifyToken(token) {
  try {
    const { payload } = await jose.jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);   // { id, email, name, role }
  const [authReady, setAuthReady] = useState(false);

  // Re-hydrate session from localStorage on mount
  useEffect(() => {
    async function restore() {
      // Ensure users table exists (idempotent)
      try { await ensureUsersTable(); } catch (e) { console.warn('ensureUsersTable:', e.message); }

      const token = localStorage.getItem(LS_TOKEN_KEY);
      if (token) {
        const payload = await verifyToken(token);
        if (payload) setUser({ id: payload.id, email: payload.email, name: payload.name, role: payload.role });
        else localStorage.removeItem(LS_TOKEN_KEY);
      }
      setAuthReady(true);
    }
    restore();
  }, []);

  const login = useCallback(async (email, password) => {
    const dbUser = await dbLogin(email, password);
    if (!dbUser) throw new Error('Invalid email or password');

    const token = await signToken(dbUser);
    localStorage.setItem(LS_TOKEN_KEY, token);
    setUser({ id: dbUser.id, email: dbUser.email, name: dbUser.name, role: dbUser.role });
    return dbUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(LS_TOKEN_KEY);
    setUser(null);
  }, []);

  const isAdmin  = user?.role === 'admin';
  const isMember = !!user; // any logged-in user can edit

  return (
    <AuthContext.Provider value={{ user, authReady, login, logout, isAdmin, isMember }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
