"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { locales } from "@/i18n/config";
import { getLook, resolveItem } from "@/data/looks";
import { categories, colours, getProduct, products } from "@/data/products";
import { site, stores, telHref } from "@/data/site";
import { formatPrice, photo } from "@/lib/asset";
import { switchLangPath } from "./Header";
import { CheckIcon, CloseIcon, CopyIcon, PhoneIcon, SearchIcon, TelegramIcon } from "./Icons";
import { Emblem, Logo, SailMark } from "./Logo";
import { useSite } from "./Providers";

export function Overlays() {
  const { panel, close } = useSite();
  return (
    <>
      <div className={`backdrop ${panel ? "is-open" : ""}`} onClick={close} aria-hidden />
      <MenuPanel />
      <SearchPanel />
      <ReservePanel />
      <ToastView />
    </>
  );
}

/* ---------------- menu (mobile / tablet) ---------------- */
function MenuPanel() {
  const { lang, t, panel, close, openReserve } = useSite();
  const pathname = usePathname();
  const isOpen = panel === "menu";
  return (
    <aside className={`panel panel-right ${isOpen ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label={t.nav.menu} inert={!isOpen} aria-hidden={!isOpen}>
      <div className="flex shrink-0 items-center justify-between px-6" style={{ height: "var(--header-h)" }}>
        <Logo />
        <button onClick={close} className="round-btn -mr-2" aria-label={t.nav.close}>
          <CloseIcon />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4">
        <ul>
          {[
            { href: `/${lang}/katalog/`, label: t.nav.catalog },
            { href: `/${lang}/obrazlar/`, label: t.nav.looks },
            { href: `/${lang}/dokonlar/`, label: t.nav.stores },
            { href: `/${lang}/sevimlilar/`, label: t.nav.favorites },
          ].map((n, i) => (
            <li key={n.href} className="border-b border-hair">
              <Link href={n.href} onClick={close} className="flex items-baseline gap-4 py-4">
                <span className="numeral w-7 text-[20px] text-gold">0{i + 1}</span>
                <span className="h-title text-[34px]">{n.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="eyebrow plain mb-4 mt-10">{t.nav.catalog}</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/${lang}/katalog/?c=${c.slug}`} onClick={close} className="chip">
              {c.name[lang]}
            </Link>
          ))}
        </div>
        <button onClick={() => openReserve({})} className="pill pill-navy mt-10 w-full">
          {t.lux.book}
        </button>
      </div>
      <div className="flex items-center justify-between border-t border-hair px-6 py-5">
        <div className="flex gap-2">
          {locales.map((l) => (
            <Link key={l} href={switchLangPath(pathname, l)} aria-current={l === lang ? "page" : undefined} className="chip">
              {l === "uz" ? "O‘zbekcha" : "Русский"}
            </Link>
          ))}
        </div>
        <a href={telHref(site.phones[0])} className="round-btn bg-pearl" aria-label={t.product.call}>
          <PhoneIcon width={18} height={18} />
        </a>
      </div>
    </aside>
  );
}

/* ---------------- search ---------------- */
function norm(s: string) {
  return s.toLowerCase().replace(/[‘’ʻʼ'`]/g, "").replace(/ё/g, "е");
}

function SearchPanel() {
  const { lang, t, panel, close } = useSite();
  const isOpen = panel === "search";
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => input.current?.focus(), 300);
  }, [isOpen]);

  const results = useMemo(() => {
    const n = norm(q.trim());
    if (n.length < 2) return [];
    return products.filter((p) => {
      const cat = categories.find((c) => c.slug === p.category)!;
      const hay = norm([p.name.uz, p.name.ru, colours[p.colour].name.uz, colours[p.colour].name.ru, cat.name.uz, cat.name.ru].join(" "));
      return n.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [q]);

  const popular = lang === "uz" ? ["Kurtka", "Dvoyka", "Polo", "Shim", "Zamsh"] : ["Куртка", "Двойка", "Поло", "Брюки", "Замша"];

  return (
    <div className={`sheet-top ${isOpen ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label={t.nav.search} inert={!isOpen} aria-hidden={!isOpen}>
      <div className="wrap wrap-max pb-12 pt-6 md:pb-16 md:pt-10">
        <div className="flex items-center gap-5 border-b border-ink/80 pb-4">
          <SearchIcon className="shrink-0 text-navy" width={24} height={24} />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search.placeholder}
            className="serif w-full bg-transparent text-[30px] font-light outline-none placeholder:text-mist md:text-[44px]"
            aria-label={t.search.placeholder}
          />
          <button onClick={close} className="round-btn -mr-2 shrink-0" aria-label={t.nav.close}>
            <CloseIcon />
          </button>
        </div>
        {q.trim().length < 2 ? (
          <div className="mt-8">
            <p className="eyebrow plain mb-4">{t.search.popular}</p>
            <div className="flex flex-wrap gap-2">
              {popular.map((w) => (
                <button key={w} onClick={() => setQ(w)} className="chip">
                  {w}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <p className="eyebrow plain mb-5">{results.length ? t.search.results(results.length) : t.search.nothing}</p>
            <ul className="no-scrollbar grid max-h-[55vh] gap-x-10 gap-y-4 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${lang}/katalog/${p.slug}/`} onClick={close} className="group flex items-center gap-4">
                    <span className="media aspect-[3/4] w-16 shrink-0">
                      <img src={photo(p.photos[0]).small} alt="" loading="lazy" />
                    </span>
                    <span>
                      <span className="block text-[14px] font-medium group-hover:text-navy">{p.name[lang]}</span>
                      <span className="price mt-0.5 block text-[17px]">
                        {p.price != null ? `${formatPrice(p.price)} ${t.currency}` : <span className="font-sans text-[12.5px] text-slate">{t.product.priceOnRequest}</span>}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- reserve: try on / visit the boutique ---------------- */
function ReservePanel() {
  const { lang, t, panel, close, reserve } = useSite();
  const isOpen = panel === "reserve";
  const product = reserve.product ? getProduct(reserve.product) : undefined;
  const look = reserve.look ? getLook(reserve.look) : undefined;
  const isVisit = !product && !look;

  const [store, setStore] = useState(stores[0].slug);
  const [size, setSize] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);

  const [lastIntent, setLastIntent] = useState(reserve);
  if (lastIntent !== reserve) {
    setLastIntent(reserve);
    setSize(reserve.size ?? "");
    setCopied(false);
  }

  const lines: { name: string; price: number | null; img?: string }[] = product
    ? [{ name: product.name[lang], price: product.price, img: product.photos[0] }]
    : look
      ? look.items.map((it) => {
          const r = resolveItem(it);
          return { name: r.name[lang], price: r.price, img: r.product?.photos[0] };
        })
      : [];

  const storeName = stores.find((s) => s.slug === store)!.name[lang];
  const message = [
    isVisit ? (lang === "uz" ? "Assalomu alaykum! Butikka stilist bilan tashrif buyurmoqchiman." : "Здравствуйте! Хочу записаться в бутик к стилисту.") : t.reserve.greeting,
    ...lines.map((l) => `• ${l.name}${l.price != null ? ` — ${formatPrice(l.price)} ${t.currency}` : ""}`),
    look ? `${t.looks.look} ${look.num}` : "",
    !isVisit ? `${t.reserve.size}: ${size || t.reserve.anySize}` : "",
    `${t.reserve.store}: ${storeName}`,
    name ? `${t.reserve.name}: ${name}` : "",
    phone ? `${t.reserve.phone}: ${phone}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const sizes = product?.sizes ?? [];
  const field = "h-12 w-full rounded-full border border-hair bg-white px-5 text-[14px] outline-none transition-colors focus:border-navy";

  return (
    <aside className={`panel panel-right ${isOpen ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label={t.reserve.title} inert={!isOpen} aria-hidden={!isOpen}>
      <div className="flex shrink-0 items-center justify-between border-b border-hair px-6 md:px-8" style={{ height: "var(--header-h)" }}>
        <span className="flex items-center gap-3">
          <Emblem className="h-7 text-navy" />
          <span className="h-title text-[24px]">{isVisit ? t.lux.visitTitle : t.reserve.title}</span>
        </span>
        <button onClick={close} className="round-btn -mr-2" aria-label={t.nav.close}>
          <CloseIcon />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-7 md:px-8">
        <p className="text-body text-[14.5px]">{isVisit ? t.lux.visitText : t.reserve.text}</p>

        {lines.length > 0 && (
          <ul className="mt-6 space-y-3 rounded-sm bg-pearl p-4">
            {lines.map((l, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="media aspect-[3/4] w-11 shrink-0">
                  {l.img ? <img src={photo(l.img).small} alt="" /> : <SailMark className="absolute inset-0 m-auto h-5 text-mist" />}
                </span>
                <span className="flex-1 text-[13.5px] font-medium">{l.name}</span>
                <span className="price shrink-0 text-[16px]">{l.price != null ? formatPrice(l.price) : "—"}</span>
              </li>
            ))}
          </ul>
        )}

        <fieldset className="mt-7">
          <legend className="eyebrow plain mb-3">{t.reserve.store}</legend>
          <div className="space-y-2">
            {stores.map((s) => (
              <label
                key={s.slug}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border px-5 py-3.5 transition-colors ${
                  store === s.slug ? "border-navy bg-white" : "border-hair hover:border-ink/40"
                }`}
              >
                <span>
                  <span className="block text-[14px] font-medium">{s.name[lang]}</span>
                  <span className="block text-[12px] text-slate">{s.note[lang]}</span>
                </span>
                <input type="radio" name="store" value={s.slug} checked={store === s.slug} onChange={() => setStore(s.slug)} className="accent-[var(--color-navy)]" />
              </label>
            ))}
          </div>
        </fieldset>

        {sizes.length > 0 && (
          <fieldset className="mt-7">
            <legend className="eyebrow plain mb-3">{t.reserve.size}</legend>
            <div className="flex flex-wrap gap-2">
              {["", ...sizes].map((s) => (
                <button key={s || "any"} type="button" onClick={() => setSize(s)} aria-pressed={size === s} className="chip min-w-12 justify-center">
                  {s || t.reserve.anySize}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-7 grid gap-3">
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder={t.reserve.name} aria-label={t.reserve.name} />
          <input className={field} value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder={`${t.reserve.phone} +998`} aria-label={t.reserve.phone} />
        </div>

        <div className="mt-7">
          <p className="eyebrow plain mb-3">{t.reserve.message}</p>
          <pre className="whitespace-pre-wrap rounded-2xl border border-hair bg-white p-5 font-sans text-[13px] leading-relaxed text-slate">{message}</pre>
        </div>
        <p className="mt-4 text-[12px] text-mist">{t.reserve.hint}</p>
      </div>

      <div className="grid gap-2 border-t border-hair px-6 py-5 md:px-8">
        {site.telegram && (
          <a href={`https://t.me/${site.telegram}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="pill pill-navy w-full">
            <TelegramIcon width={16} height={16} /> {t.reserve.telegram}
          </a>
        )}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={copy} className="pill pill-line px-3">
            {copied ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
            {copied ? t.reserve.copied : t.reserve.copy}
          </button>
          <a href={telHref(site.phones[0])} className={`pill px-3 ${site.telegram ? "pill-line" : "pill-navy"}`}>
            <PhoneIcon width={16} height={16} /> {t.reserve.call}
          </a>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- toast ---------------- */
function ToastView() {
  const { toast } = useSite();
  return (
    <div className="pointer-events-none fixed inset-x-0 z-[80] flex justify-center px-4" style={{ top: "calc(var(--top-offset) + 16px)" }} aria-live="polite">
      {toast && (
        <div key={toast.id} className="fade-up pointer-events-auto flex items-center gap-5 rounded-full bg-white py-2.5 pl-3 pr-6 text-[13px] font-medium shadow-[0_20px_50px_rgba(10,20,40,.15)]">
          <SailMark className="h-6 w-6 rounded-full text-navy" />
          <span>{toast.text}</span>
          {toast.href && (
            <Link href={toast.href} className="link-arrow text-[12px] text-navy">
              {toast.linkText} <span className="arrow-line" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
