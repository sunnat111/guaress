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
import { SailMark } from "./Logo";
import { useSite } from "./Providers";

export function Overlays() {
  const { panel, close } = useSite();
  return (
    <>
      <div className={`backdrop ${panel ? "is-open" : ""}`} onClick={close} aria-hidden />
      <MenuDrawer />
      <SearchPanel />
      <ReservePanel />
      <ToastView />
    </>
  );
}

function PanelHead({ title, onClose, closeLabel }: { title: string; onClose: () => void; closeLabel: string }) {
  return (
    <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-line px-5 md:px-8">
      <p className="caps">{title}</p>
      <button onClick={onClose} className="icon-btn -mr-2" aria-label={closeLabel}>
        <CloseIcon />
      </button>
    </div>
  );
}

/* ---------------- menu ---------------- */
function MenuDrawer() {
  const { lang, t, panel, close } = useSite();
  const pathname = usePathname();
  const isOpen = panel === "menu";
  return (
    <aside
      className={`drawer drawer-left ${isOpen ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.menu}
      inert={!isOpen}
      aria-hidden={!isOpen}
    >
      <PanelHead title={t.nav.menu} onClose={close} closeLabel={t.nav.close} />
      <div className="flex-1 overflow-y-auto px-5 py-8 md:px-8">
        <p className="label mb-4 text-faint">{t.nav.catalog}</p>
        <ul className="space-y-1">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/${lang}/katalog/?c=${c.slug}`} onClick={close} className="display block py-1.5 text-[24px] hover:text-navy">
                {c.name[lang]}
              </Link>
            </li>
          ))}
        </ul>
        <div className="my-8 h-px bg-line" />
        <ul className="space-y-3">
          {[
            { href: `/${lang}/obrazlar/`, label: t.nav.looks },
            { href: `/${lang}/dokonlar/`, label: t.nav.stores },
            { href: `/${lang}/sevimlilar/`, label: t.nav.favorites },
          ].map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={close} className="caps hover:text-navy">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between border-t border-line px-5 py-5 md:px-8">
        <div className="flex gap-4">
          {locales.map((l) => (
            <Link
              key={l}
              href={switchLangPath(pathname, l)}
              className={`caps ${l === lang ? "" : "text-faint hover:text-ink"}`}
              aria-current={l === lang ? "true" : undefined}
            >
              {l === "uz" ? "O‘zbekcha" : "Русский"}
            </Link>
          ))}
        </div>
        <a href={telHref(site.phones[0])} className="text-[14px] font-light">
          {site.phones[0]}
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
    if (isOpen) setTimeout(() => input.current?.focus(), 250);
  }, [isOpen]);

  const results = useMemo(() => {
    const n = norm(q.trim());
    if (n.length < 2) return [];
    return products.filter((p) => {
      const cat = categories.find((c) => c.slug === p.category)!;
      const hay = norm(
        [p.name.uz, p.name.ru, colours[p.colour].name.uz, colours[p.colour].name.ru, cat.name.uz, cat.name.ru].join(" "),
      );
      return n.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [q]);

  const popular = lang === "uz" ? ["Kurtka", "Dvoyka", "Polo", "Shim", "Zamsh"] : ["Куртка", "Двойка", "Поло", "Брюки", "Замша"];

  return (
    <div className={`sheet-top ${isOpen ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label={t.nav.search} inert={!isOpen} aria-hidden={!isOpen}>
      <div className="container-x pb-10 pt-6 md:pb-14 md:pt-10">
        <div className="flex items-center gap-4 border-b border-ink pb-3">
          <SearchIcon className="shrink-0" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full bg-transparent text-[22px] font-light outline-none placeholder:text-faint md:text-[28px]"
            aria-label={t.search.placeholder}
          />
          <button onClick={close} className="icon-btn -mr-2 shrink-0" aria-label={t.nav.close}>
            <CloseIcon />
          </button>
        </div>

        {q.trim().length < 2 ? (
          <div className="mt-6">
            <p className="label mb-3 text-faint">{t.search.popular}</p>
            <div className="flex flex-wrap gap-2">
              {popular.map((w) => (
                <button key={w} onClick={() => setQ(w)} className="caps border border-line px-4 py-2 text-[11px] hover:border-ink">
                  {w}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <p className="label mb-4 text-faint">{results.length ? t.search.results(results.length) : t.search.nothing}</p>
            <ul className="no-scrollbar grid max-h-[55vh] grid-cols-1 gap-x-8 gap-y-3 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => {
                const ph = photo(p.photos[0]);
                return (
                  <li key={p.slug}>
                    <Link href={`/${lang}/katalog/${p.slug}/`} onClick={close} className="flex items-center gap-4 hover:opacity-70">
                      <span className="photo-box aspect-[3/4] w-14 shrink-0">
                        <img src={ph.small} alt="" loading="lazy" />
                      </span>
                      <span>
                        <span className="block text-[14px]">{p.name[lang]}</span>
                        <span className="block text-[13px] font-light text-muted">
                          {p.price != null ? `${formatPrice(p.price)} ${t.currency}` : t.product.priceOnRequest}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- reserve (try on in boutique) ---------------- */
function ReservePanel() {
  const { lang, t, panel, close, reserve } = useSite();
  const isOpen = panel === "reserve";
  const product = reserve.product ? getProduct(reserve.product) : undefined;
  const look = reserve.look ? getLook(reserve.look) : undefined;

  const [store, setStore] = useState(stores[0].slug);
  const [size, setSize] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);

  // take the size chosen on the product page each time the panel opens
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
    t.reserve.greeting,
    ...lines.map((l) => `• ${l.name}${l.price != null ? ` — ${formatPrice(l.price)} ${t.currency}` : ""}`),
    look ? `${t.looks.look} ${look.num}` : "",
    `${t.reserve.size}: ${size || t.reserve.anySize}`,
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
  const field = "w-full border border-line bg-transparent px-4 h-12 text-[14px] font-light outline-none focus:border-ink";

  return (
    <aside
      className={`drawer drawer-right ${isOpen ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={t.reserve.title}
      inert={!isOpen}
      aria-hidden={!isOpen}
    >
      <PanelHead title={t.reserve.title} onClose={close} closeLabel={t.nav.close} />
      <div className="flex-1 overflow-y-auto px-5 py-6 md:px-8">
        <p className="lead text-[14px]">{t.reserve.text}</p>

        <ul className="mt-6 space-y-3 border-y border-line py-4">
          {lines.map((l, i) => (
            <li key={i} className="flex items-center gap-4">
              <span className="photo-box aspect-[3/4] w-12 shrink-0">
                {l.img ? <img src={photo(l.img).small} alt="" /> : <SailMark className="absolute inset-0 m-auto h-5 text-faint" />}
              </span>
              <span className="flex-1 text-[14px]">{l.name}</span>
              <span className="shrink-0 text-[13px] font-light text-muted">
                {l.price != null ? formatPrice(l.price) : "—"}
              </span>
            </li>
          ))}
        </ul>

        <fieldset className="mt-6">
          <legend className="label mb-3">{t.reserve.store}</legend>
          <div className="space-y-2">
            {stores.map((s) => (
              <label key={s.slug} className={`flex cursor-pointer items-center justify-between border px-4 py-3 ${store === s.slug ? "border-ink" : "border-line"}`}>
                <span>
                  <span className="block text-[14px]">{s.name[lang]}</span>
                  <span className="block text-[12px] font-light text-muted">{s.note[lang]}</span>
                </span>
                <input type="radio" name="store" value={s.slug} checked={store === s.slug} onChange={() => setStore(s.slug)} className="accent-[var(--color-navy)]" />
              </label>
            ))}
          </div>
        </fieldset>

        {sizes.length > 0 && (
          <fieldset className="mt-6">
            <legend className="label mb-3">{t.reserve.size}</legend>
            <div className="flex flex-wrap gap-2">
              {["", ...sizes].map((s) => (
                <button
                  key={s || "any"}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`h-10 min-w-12 border px-3 text-[13px] ${size === s ? "border-ink bg-ink text-white" : "border-line hover:border-ink"}`}
                >
                  {s || t.reserve.anySize}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-6 grid gap-3">
          <label className="block">
            <span className="label mb-2 block">{t.reserve.name}</span>
            <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
          <label className="block">
            <span className="label mb-2 block">{t.reserve.phone}</span>
            <input className={field} value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="+998" />
          </label>
        </div>

        <div className="mt-6">
          <p className="label mb-2">{t.reserve.message}</p>
          <pre className="whitespace-pre-wrap bg-sand/60 p-4 font-sans text-[13px] font-light leading-relaxed">{message}</pre>
        </div>
        <p className="mt-4 text-[12px] font-light text-muted">{t.reserve.hint}</p>
      </div>

      <div className="grid gap-2 border-t border-line px-5 py-5 md:px-8">
        {site.telegram && (
          <a href={`https://t.me/${site.telegram}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="btn btn-dark w-full">
            <TelegramIcon width={16} height={16} /> {t.reserve.telegram}
          </a>
        )}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={copy} className="btn btn-line px-3">
            {copied ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
            {copied ? t.reserve.copied : t.reserve.copy}
          </button>
          <a href={telHref(site.phones[0])} className={`btn px-3 ${site.telegram ? "btn-line" : "btn-dark"}`}>
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
    <div
      className="pointer-events-none fixed inset-x-0 z-[80] flex justify-center px-4"
      style={{ top: "calc(var(--top-offset) + 14px)" }}
      aria-live="polite"
    >
      {toast && (
        <div key={toast.id} className="pointer-events-auto flex items-center gap-4 rounded-full bg-ink px-5 py-3 text-[13px] text-white shadow-lg [animation:rise-in_.4s_var(--ease-out-soft)]">
          <span>{toast.text}</span>
          {toast.href && (
            <Link href={toast.href} className="caps link-line text-[10.5px]">
              {toast.linkText}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
