"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales } from "@/i18n/config";
import { BookmarkIcon, MenuIcon, SearchIcon } from "./Icons";
import { Logo } from "./Logo";
import { useSite } from "./Providers";

export function switchLangPath(pathname: string, to: string): string {
  const parts = pathname.split("/");
  if ((locales as readonly string[]).includes(parts[1])) parts[1] = to;
  return parts.join("/") || `/${to}/`;
}

export function Header() {
  const { lang, t, open, openReserve, favorites } = useSite();
  const pathname = usePathname();
  // pages that open with a full-screen film (<section data-hero>): the header sits transparent on top
  const heroPage = [`/${lang}/`, `/${lang}`, `/${lang}/dokonlar/`, `/${lang}/dokonlar`].includes(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(heroPage);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const hero = heroPage ? document.querySelector<HTMLElement>("[data-hero]") : null;
      setOverHero(!!hero && window.scrollY < hero.offsetHeight - 90);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [heroPage]);
  const light = overHero;

  const nav = [
    { href: `/${lang}/katalog/`, label: t.nav.catalog },
    { href: `/${lang}/obrazlar/`, label: t.nav.looks },
    { href: `/${lang}/dokonlar/`, label: t.nav.stores },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-700 ${
        light
          ? "bg-transparent text-white"
          : scrolled
            ? "bg-ivory/88 text-ink shadow-[0_1px_0_var(--color-hair)] backdrop-blur-xl"
            : "bg-ivory text-ink"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <div className="wrap wrap-max grid h-full grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
        <Link href={`/${lang}/`} className="justify-self-start" aria-label="Guaress">
          <Logo light={light} />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label={t.nav.menu}>
          {nav.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-[13.5px] font-medium transition-colors ${light ? "hover:text-white/70" : "hover:text-navy"} ${
                  active ? `${light ? "" : "text-navy"} after:absolute after:-bottom-2 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-gold` : ""
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-self-end gap-1">
          <div className="mr-3 hidden items-center gap-1 text-[12px] font-semibold tracking-[0.08em] md:flex">
            {locales.map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="mx-1.5 h-3 w-px bg-current opacity-25" />}
                <Link
                  href={switchLangPath(pathname, l)}
                  aria-current={l === lang ? "true" : undefined}
                  className={l === lang ? "" : "opacity-50 hover:opacity-100"}
                >
                  {l.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>
          <button onClick={() => open("search")} className={`round-btn ${light ? "hover:bg-white/15" : ""}`} aria-label={t.nav.search}>
            <SearchIcon />
          </button>
          <Link href={`/${lang}/sevimlilar/`} className={`round-btn relative ${light ? "hover:bg-white/15" : ""}`} aria-label={t.nav.favorites}>
            <BookmarkIcon />
            {favorites.length > 0 && (
              <span className="absolute right-[7px] top-[7px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-gold px-[4px] text-[9.5px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <button onClick={() => openReserve({})} className={`pill pill-sm ml-3 hidden md:inline-flex ${light ? "pill-white" : "pill-navy"}`}>
            {t.lux.book}
          </button>
          <button onClick={() => open("menu")} className={`round-btn -mr-2 lg:hidden ${light ? "hover:bg-white/15" : ""}`} aria-label={t.nav.menu}>
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
