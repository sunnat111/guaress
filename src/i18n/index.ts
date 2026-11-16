import type { Locale } from "./config";
import ru from "./ru";
import uz, { type Dict } from "./uz";

const dicts: Record<Locale, Dict> = { uz, ru };

export function getDict(lang: Locale): Dict {
  return dicts[lang];
}
export type { Dict };
