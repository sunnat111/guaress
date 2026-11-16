export const locales = ["uz", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

/** A string in both site languages. */
export type L10n = { uz: string; ru: string };

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

export function tr(v: L10n, lang: Locale): string {
  return v[lang];
}
