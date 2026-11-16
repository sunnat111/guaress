import type { L10n } from "@/i18n/config";

export const site = {
  name: "Guaress",
  /** Shop phones as published in the Telegram channel. */
  phones: ["+998 99 899 90 09", "+998 99 399 90 09", "+998 33 099 90 09"],
  /**
   * Telegram username that should receive fitting requests (without @).
   * Empty = the "Send in Telegram" button is hidden. Fill in when the client confirms it.
   */
  telegram: "",
  /** Public links. Empty values are hidden in the UI. */
  socials: {
    instagram: "",
    telegramChannel: "",
  },
  hours: "10:00 – 22:00",
};

export type Store = {
  slug: string;
  name: L10n;
  note: L10n;
  /** Yandex Maps search link until exact pins are provided by the client. */
  map: string;
};

const ymap = (q: string) => `https://yandex.uz/maps/10335/tashkent/search/${encodeURIComponent(q)}/`;

export const stores: Store[] = [
  {
    slug: "gulzor",
    name: { uz: "Gulzor filiali", ru: "Филиал Гулзор" },
    note: { uz: "Toshkent, Gulzor", ru: "Ташкент, Гулзор" },
    map: ymap("Guaress Gulzor"),
  },
  {
    slug: "atlas",
    name: { uz: "Atlas filiali", ru: "Филиал Atlas" },
    note: { uz: "Toshkent, Atlas", ru: "Ташкент, Atlas" },
    map: ymap("Guaress Atlas"),
  },
  {
    slug: "high-town-mall",
    name: { uz: "High Town Mall", ru: "High Town Mall" },
    note: { uz: "Toshkent, High Town Mall savdo markazi", ru: "Ташкент, ТЦ High Town Mall" },
    map: ymap("High Town Mall Guaress"),
  },
];

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
