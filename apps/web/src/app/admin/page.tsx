"use client";

import { useCallback, useEffect, useState, FormEvent } from "react";
import { API_URL, AdminReport, PendingBuild, basicAuthHeader } from "@/lib/api";
import { useLocale } from "@/i18n/LocaleContext";

const SESSION_KEY = "poe-build-finder-admin-auth";

export default function AdminPage() {
  const { t, intlLocale } = useLocale();
  // authHeader starts as null on both server and client so the first client render
  // matches the SSR markup exactly; the stored session (if any) is picked up
  // afterwards in an effect, avoiding a hydration mismatch from sessionStorage
  // (which the server can never see).
  const [authHeader, setAuthHeader] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [pending, setPending] = useState<PendingBuild[]>([]);
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  useEffect(() => {
    // picking up a pre-existing session from sessionStorage after mount (see comment above)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuthHeader(sessionStorage.getItem(SESSION_KEY));
  }, []);

  const loadPending = useCallback(
    async (header: string) => {
      setLoading(true);
      setListError(null);
      try {
        const [pendingResponse, reportsResponse] = await Promise.all([
          fetch(`${API_URL}/api/admin/builds/pending`, { headers: { Authorization: header } }),
          fetch(`${API_URL}/api/admin/reports`, { headers: { Authorization: header } }),
        ]);
        if (pendingResponse.status === 401 || reportsResponse.status === 401) {
          sessionStorage.removeItem(SESSION_KEY);
          setAuthHeader(null);
          setLoginError(t.admin.invalidCreds);
          return;
        }
        setPending(await pendingResponse.json());
        setReports(await reportsResponse.json());
      } catch {
        setListError(t.admin.listError);
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    // fetching the moderation queue whenever the admin (re)authenticates is the point
    // of this effect — loadPending's internal setState calls are intentional here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (authHeader) void loadPending(authHeader);
  }, [authHeader, loadPending]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "");
    const password = String(form.get("password") ?? "");
    const header = basicAuthHeader(username, password);
    setLoginError(null);
    sessionStorage.setItem(SESSION_KEY, header);
    setAuthHeader(header);
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthHeader(null);
    setPending([]);
  }

  async function decide(buildId: string, action: "approve" | "reject") {
    if (!authHeader) return;
    let note: string | undefined;
    if (action === "reject") {
      note = window.prompt(t.admin.rejectPrompt) ?? undefined;
    }
    const response = await fetch(`${API_URL}/api/admin/builds/${buildId}/${action}`, {
      method: "POST",
      headers: { Authorization: authHeader, "Content-Type": "application/json" },
      body: action === "reject" ? JSON.stringify({ note }) : undefined,
    });
    if (response.ok) {
      setPending((prev) => prev.filter((b) => b.id !== buildId));
    } else {
      window.alert(t.admin.actionFailed);
    }
  }

  async function decideReport(reportId: string, action: "dismiss" | "remove-build") {
    if (!authHeader) return;
    const response = await fetch(`${API_URL}/api/admin/reports/${reportId}/${action}`, {
      method: "POST",
      headers: { Authorization: authHeader },
    });
    if (response.ok) {
      setReports((prev) => prev.filter((r) => r.id !== reportId));
    } else {
      window.alert(t.admin.actionFailed);
    }
  }

  if (!authHeader) {
    return (
      <main className="mx-auto max-w-sm px-4 py-10">
        <h1 className="text-2xl font-semibold">{t.admin.loginTitle}</h1>
        {loginError && <p className="mt-4 text-sm text-red-600">{loginError}</p>}
        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium">
            {t.admin.username}
            <input name="username" required className="input" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            {t.admin.password}
            <input name="password" type="password" required className="input" />
          </label>
          <button type="submit" className="rounded-md bg-neutral-900 px-4 py-2 text-white">
            {t.admin.loginButton}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t.admin.queueTitle}</h1>
        <button onClick={handleLogout} className="text-sm text-neutral-500 underline">
          {t.admin.logout}
        </button>
      </div>

      {loading && <p className="mt-4 text-sm text-neutral-500">{t.admin.loading}</p>}
      {listError && <p className="mt-4 text-sm text-red-600">{listError}</p>}
      {!loading && pending.length === 0 && !listError && (
        <p className="mt-4 text-sm text-neutral-500">{t.admin.emptyQueue}</p>
      )}

      <ul className="mt-6 flex flex-col gap-4">
        {pending.map((build) => (
          <li key={build.id} className="panel p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{build.title}</p>
                <a
                  href={build.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-400 underline"
                >
                  {build.source_url}
                </a>
                <p className="mt-1 text-sm text-neutral-500">
                  {build.game} · {build.class ?? "?"} · {build.ascendancy ?? "?"} ·{" "}
                  {build.main_skill ?? "?"} · {build.league_patch ?? "?"}
                </p>
                {build.tags.length > 0 && (
                  <p className="mt-1 text-xs text-neutral-500">
                    {t.admin.tags}: {build.tags.join(", ")}
                  </p>
                )}
                {build.author && (
                  <p className="mt-1 text-xs text-neutral-500">
                    {t.admin.author}: {build.author}
                  </p>
                )}
                {build.submitted_by && (
                  <p className="mt-1 text-xs text-neutral-500">
                    {t.admin.contact}: {build.submitted_by}
                  </p>
                )}
                {build.pob_link && (
                  <p className="mt-1 text-xs text-neutral-500">
                    {t.admin.pob}: {build.pob_link}
                  </p>
                )}
                {(build.stats_dps || build.stats_life || build.stats_ehp) && (
                  <p className="mt-1 text-xs text-neutral-500">
                    {build.stats_dps &&
                      `DPS: ${Math.round(build.stats_dps).toLocaleString(intlLocale)}`}
                    {build.stats_life &&
                      ` · Life: ${Math.round(build.stats_life).toLocaleString(intlLocale)}`}
                    {build.stats_ehp &&
                      ` · EHP: ${Math.round(build.stats_ehp).toLocaleString(intlLocale)}`}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <button
                  onClick={() => decide(build.id, "approve")}
                  className="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white"
                >
                  {t.admin.approve}
                </button>
                <button
                  onClick={() => decide(build.id, "reject")}
                  className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white"
                >
                  {t.admin.reject}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-xl font-semibold">{t.admin.reportsTitle}</h2>
      {!loading && reports.length === 0 && (
        <p className="mt-4 text-sm text-neutral-500">{t.admin.noReports}</p>
      )}
      <ul className="mt-4 flex flex-col gap-4">
        {reports.map((report) => (
          <li key={report.id} className="panel p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{report.build_title}</p>
                <a
                  href={report.build_source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-400 underline"
                >
                  {report.build_source_url}
                </a>
                {report.reason && (
                  <p className="mt-1 text-sm text-neutral-500">
                    {t.admin.reason}: {report.reason}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <button
                  onClick={() => decideReport(report.id, "remove-build")}
                  className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white"
                >
                  {t.admin.removeBuild}
                </button>
                <button
                  onClick={() => decideReport(report.id, "dismiss")}
                  className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm dark:border-neutral-700"
                >
                  {t.admin.dismissReport}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
