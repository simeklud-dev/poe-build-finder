"use client";

import { useCallback, useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL, SavedFilter } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/i18n/LocaleContext";

export default function AccountPage() {
  const { user, token, loading, login, register, logout } = useAuth();
  const { t } = useLocale();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [filters, setFilters] = useState<SavedFilter[] | null>(null);

  const loadFilters = useCallback(async () => {
    if (!token) return;
    const response = await fetch(`${API_URL}/api/saved-filters`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) setFilters(await response.json());
  }, [token]);

  useEffect(() => {
    // fetching saved filters whenever the token becomes available is the point of
    // this effect — loadFilters' internal setState call is intentional here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadFilters();
  }, [loadFilters]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);
    const action = mode === "login" ? login : register;
    const result = await action(email, password);
    setSubmitting(false);
    if (!result.ok) setFormError(result.error ?? t.account.genericError);
  }

  function applyFilter(filter: SavedFilter) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filter.filter_params)) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, String(v)));
      } else if (value !== null && value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    }
    router.push(`/?${params.toString()}`);
  }

  async function markSeen(filterId: string) {
    if (!token) return;
    await fetch(`${API_URL}/api/saved-filters/${filterId}/mark-seen`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    void loadFilters();
  }

  async function deleteFilter(filterId: string) {
    if (!token) return;
    await fetch(`${API_URL}/api/saved-filters/${filterId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    void loadFilters();
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-md px-4 py-10">
        <p className="text-sm text-neutral-500">{t.account.loading}</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-sm px-4 py-10">
        <h1 className="text-2xl font-semibold">
          {mode === "login" ? t.account.loginTitle : t.account.registerTitle}
        </h1>
        <p className="mt-2 text-sm text-neutral-500">{t.account.authHint}</p>

        {formError && <p className="mt-4 text-sm text-red-600">{formError}</p>}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium">
            {t.account.email}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            {t.account.password}
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-neutral-900 px-4 py-2 text-white disabled:opacity-50"
          >
            {mode === "login" ? t.account.loginButton : t.account.registerButton}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setFormError(null);
          }}
          className="mt-4 text-sm underline"
        >
          {mode === "login" ? t.account.switchToRegister : t.account.switchToLogin}
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t.account.accountTitle}</h1>
        <button onClick={logout} className="text-sm underline">
          {t.account.logout}
        </button>
      </div>
      <p className="mt-1 text-sm text-neutral-500">{user.email}</p>

      <Link href="/favorites" className="mt-6 inline-block underline">
        {t.account.myFavorites}
      </Link>
      {user.is_admin && (
        <Link href="/admin" className="mt-2 block underline">
          {t.nav.admin}
        </Link>
      )}

      <h2 className="mt-8 text-lg font-semibold">{t.account.savedFilters}</h2>
      {filters === null && <p className="mt-2 text-sm text-neutral-500">{t.account.loading}</p>}
      {filters?.length === 0 && (
        <p className="mt-2 text-sm text-neutral-500">{t.account.noFilters}</p>
      )}
      <ul className="mt-4 flex flex-col gap-3">
        {filters?.map((filter) => (
          <li key={filter.id} className="panel flex items-center justify-between p-3">
            <div>
              <button onClick={() => applyFilter(filter)} className="font-medium underline">
                {filter.name}
              </button>
              {filter.new_matches_count > 0 && (
                <span className="ml-2 rounded-full bg-green-600 px-2 py-0.5 text-xs text-white">
                  {filter.new_matches_count} {t.account.newMatches}
                </span>
              )}
            </div>
            <div className="flex gap-3 text-xs">
              {filter.new_matches_count > 0 && (
                <button onClick={() => markSeen(filter.id)} className="underline">
                  {t.account.markSeen}
                </button>
              )}
              <button onClick={() => deleteFilter(filter.id)} className="text-red-600 underline">
                {t.account.delete}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
