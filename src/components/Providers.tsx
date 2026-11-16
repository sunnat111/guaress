"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import { getDict, type Dict } from "@/i18n";

export type Panel = null | "menu" | "search" | "reserve";
export type ReserveIntent = { product?: string; look?: string; size?: string };
type Toast = { id: number; text: string; href?: string; linkText?: string } | null;

type Ctx = {
  lang: Locale;
  t: Dict;
  panel: Panel;
  open: (p: Exclude<Panel, null>) => void;
  close: () => void;
  reserve: ReserveIntent;
  openReserve: (r: ReserveIntent) => void;
  favorites: string[];
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  toast: Toast;
  showToast: (t: Omit<NonNullable<Toast>, "id">) => void;
};

const C = createContext<Ctx | null>(null);

export function useSite(): Ctx {
  const v = useContext(C);
  if (!v) throw new Error("useSite outside Providers");
  return v;
}

/* ---------- favourites store over localStorage ---------- */
const FAV_KEY = "guaress-favorites";
const EMPTY: string[] = [];
let favCache: { raw: string | null; value: string[] } = { raw: null, value: EMPTY };
const favListeners = new Set<() => void>();

function readFavs(): string[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(FAV_KEY);
  } catch {
    return favCache.value;
  }
  if (raw === favCache.raw) return favCache.value;
  let value = EMPTY;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) value = parsed.filter((x) => typeof x === "string");
  } catch {}
  favCache = { raw, value };
  return value;
}
function writeFavs(v: string[]) {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(v));
  } catch {
    favCache = { raw: favCache.raw, value: v };
  }
  favListeners.forEach((l) => l());
}
function subscribeFavs(cb: () => void) {
  favListeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === FAV_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    favListeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function Providers({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  const t = getDict(lang);
  const [panel, setPanel] = useState<Panel>(null);
  const [reserve, setReserve] = useState<ReserveIntent>({});
  const [toast, setToast] = useState<Toast>(null);
  const favorites = useSyncExternalStore(subscribeFavs, readFavs, () => EMPTY);
  const pathname = usePathname();

  const open = useCallback((p: Exclude<Panel, null>) => setPanel(p), []);
  const close = useCallback(() => setPanel(null), []);
  const openReserve = useCallback((r: ReserveIntent) => {
    setReserve(r);
    setPanel("reserve");
  }, []);

  const showToast = useCallback((x: Omit<NonNullable<Toast>, "id">) => setToast({ ...x, id: Date.now() }), []);

  const toggleFavorite = useCallback(
    (slug: string) => {
      const cur = readFavs();
      const has = cur.includes(slug);
      writeFavs(has ? cur.filter((s) => s !== slug) : [...cur, slug]);
      showToast(
        has
          ? { text: t.favorites.removed }
          : { text: t.favorites.added, href: `/${lang}/sevimlilar/`, linkText: t.favorites.open },
      );
    },
    [lang, showToast, t],
  );
  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites]);

  // close panels on navigation (state reset during render when the path changes)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setPanel(null);
  }

  useEffect(() => {
    document.body.classList.toggle("scroll-locked", panel !== null);
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    try {
      localStorage.setItem("gs-locale", lang);
    } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({ lang, t, panel, open, close, reserve, openReserve, favorites, isFavorite, toggleFavorite, toast, showToast }),
    [lang, t, panel, open, close, reserve, openReserve, favorites, isFavorite, toggleFavorite, toast, showToast],
  );

  return <C.Provider value={value}>{children}</C.Provider>;
}
