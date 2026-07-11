"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { API_URL, AuthUser } from "@/lib/api";

const STORAGE_KEY = "poe-build-finder-auth-token";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchMe(token: string): Promise<AuthUser | null> {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) return null;
  return response.json();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // no stored session — resolve the initial loading state (localStorage is
      // only readable client-side, hence this runs in an effect, not at render)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    fetchMe(stored).then((fetchedUser) => {
      if (fetchedUser) {
        setToken(stored);
        setUser(fetchedUser);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
      setLoading(false);
    });
  }, []);

  async function handleAuthResponse(response: Response) {
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { ok: false, error: body?.detail ?? "Něco se nepovedlo." };
    }
    const body = await response.json();
    localStorage.setItem(STORAGE_KEY, body.access_token);
    setToken(body.access_token);
    setUser(body.user);
    return { ok: true };
  }

  async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleAuthResponse(response);
  }

  async function register(email: string, password: string) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleAuthResponse(response);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
