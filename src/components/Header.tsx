"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { locales } from "@/i18n/config";
import { BookmarkIcon, CloseIcon, MenuIcon, SearchIcon } from "./Icons";
import { Logo } from "./Logo";
import { useSite } from "./Providers";

const PROMO_KEY = "gs-promo-closed";
const promoListeners = new Set<() => void>();
function promoClosed(): boolean {
  try {
    return sessionStorage.getItem(PROMO_KEY) === "1";
  } catch {
    return false;
  }
}

export function switchLangPath(pathname: string, to: string): string {
  const parts = pathname.split("/");
  if ((locales as readonly string[]).includes(parts[1])) parts[1] = to;
  return parts.join("/") || `/${to}/`;
}

export function Header() {
  const { lang, t, open, favorites } = useSite();
  const pathname = usePathname();
  const isHome = pathname === `/${lang}/` || pathname === `/${lang}`;
  const [solid, setSolid] = useState(!isHome);
  const closed = useSyncExternalStore(
    (cb) => {
      promoListeners.add(cb);
      return () => promoListeners.delete(cb);
    },
    promoClosed,
    () => false,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("has-promo", !closed);
  }, [closed]);

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > window.innerHeight - 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const closePromo = () => {
    try {
      sessionStorage.setItem(PROMO_KEY, "1");
    } catch {}
    promoListeners.forEach((l) => l());
  };

  const nav = [
    { href: `/${lang}/katalog/`, label: t.nav.catalog },
    { href: `/${lang}/obrazlar/`, label: t.nav.looks },
    { href: `/${lang}/dokonlar/`, label: t.nav.stores },
  ];

  return (
    <>
      {!closed && (
        <div className="fixed inset-x-0 top-0 z-50 flex h-[36px] items-center justify-center bg-navy px-12 text-white">
          <p className="caps truncate text-[10.5px] md:text-[11px]">
            {t.promo.text}
            <Link href={`/${lang}/obrazlar/`} className="link-line ml-3">
              {t.promo.link}
            </Link>
          </p>
          <button onClick={closePromo} className="icon-btn absolute right-2" aria-label={t.promo.close}>
            <CloseIcon width={14} height={14} />
          </button>
        </div>
      )}
      <header
        className={`fixed inset-x-0 z-50 transition-[background-color,color,border-color] duration-500 ${
          solid ? "border-b border-line bg-paper/95 text-ink backdrop-blur-md" : "border-b border-white/15 text-white"
        }`}
        style={{ top: "var(--promo-h)", height: "var(--header-h)" }}
      >
        <div className="container-x relative flex h-full items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => open("menu")} className="icon-btn -ml-2" aria-label={t.nav.menu}>
              <MenuIcon />
            </button>
            <nav className="hidden items-center gap-7 lg:flex">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="caps hover:opacity-60"
                  aria-current={pathname.startsWith(n.href) ? "page" : undefined}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href={`/${lang}/`} className="absolute left-1/2 -translate-x-1/2" aria-label="Guaress">
            <Logo />
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            <div className="mr-2 hidden items-center gap-2 md:flex">
              {locales.map((l, i) => (
                <span key={l} className="flex items-center gap-2">
                  {i > 0 && <span className="opacity-40">/</span>}
                  <Link
                    href={switchLangPath(pathname, l)}
                    className={`caps text-[11px] ${l === lang ? "" : "opacity-45 hover:opacity-100"}`}
                    aria-current={l === lang ? "true" : undefined}
                  >
                    {l.toUpperCase()}
                  </Link>
                </span>
              ))}
            </div>
            <button onClick={() => open("search")} className="icon-btn" aria-label={t.nav.search}>
              <SearchIcon />
            </button>
            <Link href={`/${lang}/sevimlilar/`} className="icon-btn relative -mr-2" aria-label={t.nav.favorites}>
              <BookmarkIcon />
              {favorites.length > 0 && (
                <span className="absolute right-[5px] top-[5px] flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-navy px-[3px] text-[9px] font-medium text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
