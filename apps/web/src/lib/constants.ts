export function formatStat(value: number, intlLocale: string = "en-US"): string {
  return new Intl.NumberFormat(intlLocale, { notation: "compact", maximumFractionDigits: 1 }).format(
    value
  );
}
