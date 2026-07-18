"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/LocaleContext";
import { CAMPAIGN_ACTS, CAMPAIGN_WALKTHROUGH_VIDEO } from "@/data/campaign-guide";

export default function CampaignGuidePage() {
  const { t } = useLocale();

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

      <div className="mt-8 flex flex-col gap-6">
        {CAMPAIGN_ACTS.map((entry) => (
          <div
            key={entry.act}
            className="panel flex flex-col gap-4 p-4 sm:flex-row"
          >
            <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-md sm:h-auto sm:w-72">
              <Image
                src={entry.image}
                alt={`Act ${entry.act} map`}
                fill
                sizes="(min-width: 640px) 288px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">Act {entry.act}</h2>
              <p className="text-xs text-neutral-500">
                {t.campaignGuide.town}: {entry.town} &middot; {t.campaignGuide.boss}: {entry.boss}
              </p>
              <p className="text-sm text-neutral-300">{entry.summary}</p>
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
    </main>
  );
}
