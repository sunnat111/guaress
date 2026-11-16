"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { categories, colours, type Product } from "@/data/products";
import { site, telHref } from "@/data/site";
import { formatPrice, photo } from "@/lib/asset";
import { BookmarkIcon, ClockIcon, MinusIcon, PhoneIcon, PinIcon, PlusIcon } from "./Icons";
import { SailMark } from "./Logo";
import { useSite } from "./Providers";

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-hair">
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex h-[60px] w-full items-center justify-between text-[14px] font-semibold">
        {title}
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pearl">
          {open ? <MinusIcon width={14} height={14} /> : <PlusIcon width={14} height={14} />}
        </span>
      </button>
      <div className={`acc-body ${open ? "is-open" : ""}`}>
        <div>
          <div className="pb-6 text-[14px] leading-relaxed text-slate">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ProductView({ p }: { p: Product }) {
  const { lang, t, isFavorite, toggleFavorite, openReserve } = useSite();
  const [size, setSize] = useState<string>("");
  const [slide, setSlide] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const cat = categories.find((c) => c.slug === p.category)!;
  const fav = isFavorite(p.slug);

  return (
    <div className="wrap wrap-max grid gap-10 pt-6 md:grid-cols-12 md:gap-12 md:pt-10">
      {/* gallery */}
      <div className="md:col-span-7">
        {/* mobile: swipe */}
        <div className="relative -mx-[var(--gutter)] md:hidden">
          <div
            ref={track}
            onScroll={() => track.current && setSlide(Math.round(track.current.scrollLeft / track.current.clientWidth))}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          >
            {p.photos.map((name, i) => {
              const ph = photo(name);
              return (
                <div key={name + i} className="media aspect-[3/4] w-full shrink-0 snap-start">
                  <img src={ph.src} srcSet={ph.srcSet} sizes="100vw" alt={i === 0 ? p.name[lang] : ""} loading={i === 0 ? "eager" : "lazy"} />
                </div>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
            {p.photos.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? "w-5 bg-white" : "w-1.5 bg-white/55"}`} />
            ))}
          </div>
        </div>
        {/* desktop: editorial grid */}
        <div className="hidden grid-cols-2 gap-3 md:grid">
          {p.photos.map((name, i) => {
            const ph = photo(name);
            const wide = i === 0 || (p.photos.length % 2 === 0 && i === p.photos.length - 1);
            return (
              <div key={name + i} className={`media lift ${wide ? "col-span-2 aspect-[4/5]" : "aspect-[3/4]"}`}>
                <img
                  src={ph.src}
                  srcSet={ph.srcSet}
                  sizes={wide ? "55vw" : "28vw"}
                  alt={i === 0 ? p.name[lang] : ""}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* info */}
      <div className="md:col-span-5">
        <div className="md:sticky md:pb-16" style={{ top: "calc(var(--top-offset) + 32px)" }}>
          <nav className="flex gap-2 text-[12px] font-medium text-mist" aria-label="breadcrumb">
            <Link href={`/${lang}/katalog/`} className="hover:text-ink">
              {t.catalog.title}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/katalog/?c=${cat.slug}`} className="hover:text-ink">
              {cat.name[lang]}
            </Link>
          </nav>
          <p className="eyebrow mt-8">{t.hero.season}</p>
          <h1 className="h-title mt-4 text-[38px] md:text-[50px]">{p.name[lang]}</h1>
          <div className="mt-6 flex items-end gap-4">
            <p className="price text-[30px] leading-none">
              {p.price != null ? (
                <>
                  {formatPrice(p.price)} <span className="text-[18px] opacity-60">{t.currency}</span>
                </>
              ) : (
                <span className="font-sans text-[16px] font-medium text-slate">{t.product.priceOnRequest}</span>
              )}
            </p>
          </div>
          <p className="mt-2 text-[12.5px] font-medium text-gold">{t.product.priceNote}</p>

          <p className="text-body mt-7 text-[15px]">{p.description[lang]}</p>

          <div className="mt-8 flex items-center gap-3 text-[13.5px]">
            <span className="h-5 w-5 rounded-full ring-1 ring-black/10 ring-offset-2 ring-offset-ivory" style={{ background: colours[p.colour].hex }} />
            <span className="text-slate">{t.product.colour}:</span>
            <span className="font-medium">{colours[p.colour].name[lang]}</span>
          </div>

          <fieldset className="mt-8">
            <legend className="eyebrow plain mb-4">{t.product.size}</legend>
            <div className="flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <button key={s} onClick={() => setSize(size === s ? "" : s)} aria-pressed={size === s} className="chip h-11 min-w-[52px] justify-center">
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 flex gap-2">
            <button onClick={() => openReserve({ product: p.slug, size })} className="pill pill-navy h-14 flex-1">
              {t.product.reserve}
            </button>
            <button
              onClick={() => toggleFavorite(p.slug)}
              aria-pressed={fav}
              aria-label={fav ? t.product.saved : t.product.save}
              className={`pill h-14 w-14 px-0 ${fav ? "pill-ink" : "pill-line"}`}
            >
              <BookmarkIcon width={18} height={18} filled={fav} />
            </button>
          </div>
          <a href={telHref(site.phones[0])} className="pill pill-line mt-2 h-14 w-full">
            <PhoneIcon width={16} height={16} /> {t.product.call}
          </a>

          <ul className="mt-8 grid gap-3 rounded-2xl bg-pearl p-5 text-[13px]">
            <li className="flex items-center gap-3">
              <SailMark className="h-4 text-navy" /> {t.home.stylistTitle}
            </li>
            <li className="flex items-center gap-3">
              <PinIcon width={16} height={16} className="text-navy" /> Gulzor · Atlas · High Town Mall
            </li>
            <li className="flex items-center gap-3">
              <ClockIcon width={16} height={16} className="text-navy" /> {t.stores.daily} {site.hours}
            </li>
          </ul>

          <div className="mt-6 border-t border-hair">
            <Accordion title={t.product.details} defaultOpen>
              <ul className="space-y-1.5">
                {p.details.map((d, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {d[lang]}
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion title={t.product.fit}>{t.product.fitText}</Accordion>
            <Accordion title={t.product.visit}>{t.product.visitText}</Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
