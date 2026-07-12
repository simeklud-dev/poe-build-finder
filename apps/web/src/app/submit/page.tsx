"use client";

import { useState, FormEvent } from "react";
import { API_URL } from "@/lib/api";
import { useLocale } from "@/i18n/LocaleContext";
import { gameOptions } from "@/i18n/options";

type Status = "idle" | "submitting" | "success" | "error" | "rate_limited";

export default function SubmitBuildPage() {
  const { t } = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [game, setGame] = useState("poe1");
  const [buildClass, setBuildClass] = useState("");
  const [ascendancy, setAscendancy] = useState("");
  const [mainSkill, setMainSkill] = useState("");
  const [leaguePatch, setLeaguePatch] = useState("");
  const [tags, setTags] = useState("");
  const [pobLink, setPobLink] = useState("");
  const [pobCode, setPobCode] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/builds/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          source_url: sourceUrl,
          author,
          submitted_by: submittedBy,
          game,
          class: buildClass,
          ascendancy,
          main_skill: mainSkill,
          league_patch: leaguePatch,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          pob_link: pobLink,
          pob_code: pobCode,
          website,
        }),
      });

      if (response.status === 201) {
        setStatus("success");
        setTitle("");
        setSourceUrl("");
        setAuthor("");
        setSubmittedBy("");
        setBuildClass("");
        setAscendancy("");
        setMainSkill("");
        setLeaguePatch("");
        setTags("");
        setPobLink("");
        setPobCode("");
        return;
      }

      if (response.status === 429) {
        setStatus("rate_limited");
        return;
      }

      const body = await response.json().catch(() => null);
      setErrorMessage(body?.detail ?? t.submit.genericError);
      setStatus("error");
    } catch {
      setErrorMessage(t.submit.connectionError);
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold">{t.submit.title}</h1>
      <p className="mt-2 text-sm text-neutral-500">{t.submit.subtitle}</p>

      {status === "success" && (
        <p className="mt-6 rounded-md bg-green-50 p-3 text-sm text-green-800">
          {t.submit.success}
        </p>
      )}
      {status === "rate_limited" && (
        <p className="mt-6 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
          {t.submit.rateLimited}
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="mt-6 rounded-md bg-red-50 p-3 text-sm text-red-800">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Field label={t.submit.titleLabel} required>
          <input
            required
            minLength={3}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
        </Field>

        <Field label={t.submit.linkLabel} required>
          <input
            required
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            className="input"
            placeholder="https://..."
          />
        </Field>

        <Field label={t.submit.gameLabel} required>
          <select value={game} onChange={(e) => setGame(e.target.value)} className="input">
            {gameOptions(t, false).map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label={t.submit.classLabel}>
            <input value={buildClass} onChange={(e) => setBuildClass(e.target.value)} className="input" />
          </Field>
          <Field label={t.submit.ascendancyLabel}>
            <input value={ascendancy} onChange={(e) => setAscendancy(e.target.value)} className="input" />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label={t.submit.mainSkillLabel}>
            <input value={mainSkill} onChange={(e) => setMainSkill(e.target.value)} className="input" />
          </Field>
          <Field label={t.submit.leaguePatchLabel}>
            <input
              value={leaguePatch}
              onChange={(e) => setLeaguePatch(e.target.value)}
              className="input"
              placeholder={t.submit.leaguePatchPlaceholder}
            />
          </Field>
        </div>

        <Field label={t.submit.tagsLabel}>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input"
            placeholder={t.submit.tagsPlaceholder}
          />
        </Field>

        <Field label={t.submit.pobLinkLabel}>
          <input value={pobLink} onChange={(e) => setPobLink(e.target.value)} className="input" />
        </Field>

        <Field label={t.submit.pobCodeLabel}>
          <textarea
            value={pobCode}
            onChange={(e) => setPobCode(e.target.value)}
            className="input min-h-24 font-mono text-xs"
            placeholder={t.submit.pobCodePlaceholder}
          />
          <span className="mt-1 block text-xs font-normal text-neutral-500">
            {t.submit.pobCodeHint}
          </span>
        </Field>

        <Field label={t.submit.authorLabel}>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className="input" />
        </Field>

        <Field label={t.submit.contactLabel}>
          <input
            value={submittedBy}
            onChange={(e) => setSubmittedBy(e.target.value)}
            className="input"
          />
        </Field>

        {/* honeypot field — invisible to people, bots typically fill it in */}
        <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
          <label htmlFor="website">{t.submit.honeypotLabel}</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 rounded-md bg-neutral-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {status === "submitting" ? t.submit.submitting : t.submit.submitButton}
        </button>
      </form>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium">
      <span>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      {children}
    </label>
  );
}
