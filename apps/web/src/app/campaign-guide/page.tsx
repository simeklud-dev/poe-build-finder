"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/i18n/LocaleContext";
import { CAMPAIGN_ACTS, CAMPAIGN_WALKTHROUGH_VIDEO } from "@/data/campaign-guide";

export default function CampaignGuidePage() {
  const { t } = useLocale();
  const [zoomedAct, setZoomedAct] = useState<number | null>(null);

  useEffect(() => {
    if (zoomedAct === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setZoomedAct(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomedAct]);

  const zoomedEntry = CAMPAIGN_ACTS.find((entry) => entry.act === zoomedAct) ?? null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold">{t.campaignGuide.title}</h1>
      <p className="mt-1 text-sm text-neutral-500">{t.campaignGuide.subtitle}</p>

      <a
        href={CAMPAIGN_WALKTHROUGH_VIDEO}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm text-white hover:opacity-90"
      >
        ▶ {t.campaignGuide.watchVideo}
      </a>

      <div className="panel mt-8 flex flex-col gap-4 p-4">
        <h2 className="text-lg font-semibold">{t.campaignGuide.tipsTitle}</h2>
        <ul className="flex flex-col gap-2 text-sm text-neutral-300">
          {t.campaignGuide.tips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span className="text-[color:var(--accent-gold)]">&bull;</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-2 text-lg font-semibold">{t.campaignGuide.terminologyTitle}</h2>
        <ul className="flex flex-col gap-2 text-sm text-neutral-300">
          {t.campaignGuide.terminology.map((entry) => (
            <li key={entry.term}>
              <span className="font-semibold text-neutral-100">{entry.term}</span> —{" "}
              {entry.meaning}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {CAMPAIGN_ACTS.map((entry) => (
          <div
            key={entry.act}
            className="panel flex flex-col gap-4 p-4 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => setZoomedAct(entry.act)}
              className="group relative h-64 w-full shrink-0 overflow-hidden rounded-md sm:h-auto sm:w-96"
              aria-label={t.campaignGuide.enlarge}
            >
              <Image
                src={entry.image}
                alt={`Act ${entry.act} map`}
                fill
                sizes="(min-width: 640px) 384px, 100vw"
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-sm font-medium text-transparent transition-colors group-hover:bg-black/30 group-hover:text-white">
                🔍 {t.campaignGuide.enlarge}
              </span>
            </button>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">Act {entry.act}</h2>
              <p className="text-xs text-neutral-500">
                {t.campaignGuide.town}: {entry.town} &middot; {t.campaignGuide.boss}: {entry.boss}
              </p>
              <p className="text-sm text-neutral-300">
                {t.campaignGuide.actSummaries[entry.act - 1]}
              </p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs">
                <span className="text-neutral-500">{t.campaignGuide.fullGuides}:</span>
                {entry.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[color:var(--accent-gold)] hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {zoomedEntry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setZoomedAct(null)}
        >
          <button
            type="button"
            onClick={() => setZoomedAct(null)}
            className="absolute right-4 top-4 rounded-md bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20"
            aria-label={t.campaignGuide.close}
          >
            ✕ {t.campaignGuide.close}
          </button>
          <div className="relative h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={zoomedEntry.image}
              alt={`Act ${zoomedEntry.act} map, enlarged`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </main>
  );
}
