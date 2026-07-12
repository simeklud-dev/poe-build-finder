"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/LocaleContext";
import { POE_NEWS } from "@/data/poe-news";

export default function PoeNewsWidget() {
  const { t, intlLocale } = useLocale();

  return (
    <aside className="panel flex flex-col overflow-hidden p-0">
      <div className="relative h-24 w-full overflow-hidden">
        <Image
          src="/images/poe/keyart.webp"
          alt=""
          fill
          sizes="320px"
          className="object-cover object-top opacity-80"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-2 left-3 flex items-center gap-2">
          <Image
            src="/images/poe/logo.png"
            alt="Path of Exile"
            width={28}
            height={28}
            className="drop-shadow"
          />
          <span className="text-sm font-semibold text-white drop-shadow">
            {t.news.title}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <p className="text-xs text-neutral-400">{t.news.subtitle}</p>

        <ul className="flex flex-col gap-3">
          {POE_NEWS.map((item) => (
            <li
              key={item.url}
              className="border-b border-[color:var(--border-subtle)] pb-2 last:border-none last:pb-0"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium leading-snug hover:underline"
              >
                {item.title}
              </a>
              <div className="mt-1 text-xs text-neutral-500">
                {new Date(item.date).toLocaleDateString(intlLocale, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </li>
          ))}
        </ul>

        <a
          href="https://www.pathofexile.com/news"
          target="_blank"
          rel="noreferrer"
          className="mt-1 text-xs font-medium text-[color:var(--accent-gold)] hover:underline"
        >
          {t.news.viewAll} →
        </a>

        <p className="mt-2 text-[10px] text-neutral-600">
          {t.news.source}: pathofexile.com
        </p>
      </div>
    </aside>
  );
}
