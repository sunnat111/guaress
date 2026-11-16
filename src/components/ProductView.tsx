"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { categories, colours, type Product } from "@/data/products";
import { site, telHref } from "@/data/site";
import { formatPrice, photo } from "@/lib/asset";
import { BookmarkIcon, MinusIcon, PhoneIcon, PlusIcon } from "./Icons";
import { useSite } from "./Providers";

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line">
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="caps flex h-[54px] w-full items-center justify-between text-[11px]">
        {title}
        {open ? <MinusIcon width={16} height={16} /> : <PlusIcon width={16} height={16} />}
      </button>
      <div className={`acc-body ${open ? "is-open" : ""}`}>
        <div>
          <div className="pb-5 text-[14px] font-light leading-relaxed text-muted">{children}</div>
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

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setSlide(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="md:grid md:grid-cols-[1.15fr_1fr]">
      {/* gallery: swipe on mobile, stacked on desktop */}
      <div className="relative">
        <div ref={track} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:block md:overflow-visible">
          {p.photos.map((name, i) => {
            const ph = photo(name);
            return (
              <div key={name + i} className="photo-box aspect-[3/4] w-full shrink-0 snap-start md:mb-px">
                <img
                  src={ph.src}
                  srcSet={ph.srcSet}
                  sizes="(min-width: 768px) 55vw, 100vw"
                  alt={i === 0 ? p.name[lang] : ""}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                  decoding="async"
                />
              </div>
            );
          })}
        </div>
        {p.photos.length > 1 && (
          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex gap-1 md:hidden">
            {p.photos.map((_, i) => (
              <span key={i} className={`h-[2px] flex-1 ${i === slide ? "bg-white" : "bg-white/40"}`} />
            ))}
          </div>
        )}
      </div>

      {/* info */}
      <div className="container-x md:px-12 lg:px-16 xl:px-24">
        <div className="py-8 md:sticky md:py-14" style={{ top: "var(--top-offset)" }}>
          <nav className="label flex gap-2 text-faint" aria-label="breadcrumb">
            <Link href={`/${lang}/katalog/`} className="hover:text-ink">
              {t.catalog.title}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/katalog/?c=${cat.slug}`} className="hover:text-ink">
              {cat.name[lang]}
            </Link>
          </nav>
          <p className="label mt-8 text-muted">{t.hero.season}</p>
          <h1 className="display mt-3 text-[28px] md:text-[38px]">{p.name[lang]}</h1>
          <p className="mt-5 text-[20px] font-light">
            {p.price != null ? `${formatPrice(p.price)} ${t.currency}` : t.product.priceOnRequest}
          </p>
          <p className="mt-1 text-[12px] font-light text-navy">{t.product.priceNote}</p>

          <p className="lead mt-6 max-w-[520px] text-[14px]">{p.description[lang]}</p>

          <p className="mt-6 flex items-center gap-2 text-[13px] font-light">
            <span className="text-muted">{t.product.colour}:</span>
            <span className="h-3 w-3 rounded-full ring-1 ring-black/10" style={{ background: colours[p.colour].hex }} />
            {colours[p.colour].name[lang]}
          </p>

          <fieldset className="mt-6">
            <legend className="label mb-3">{t.product.size}</legend>
            <div className="flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(size === s ? "" : s)}
                  aria-pressed={size === s}
                  className={`h-11 min-w-12 border px-3 text-[13px] transition-colors ${size === s ? "border-ink bg-ink text-white" : "border-line hover:border-ink"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex gap-2">
            <button onClick={() => openReserve({ product: p.slug, size })} className="btn btn-dark flex-1">
              {t.product.reserve}
            </button>
            <button
              onClick={() => toggleFavorite(p.slug)}
              aria-pressed={fav}
              aria-label={fav ? t.product.saved : t.product.save}
              className="btn btn-line w-[52px] px-0"
            >
              <BookmarkIcon width={18} height={18} filled={fav} />
            </button>
          </div>
          <a href={telHref(site.phones[0])} className="btn btn-line mt-2 w-full">
            <PhoneIcon width={16} height={16} /> {t.product.call}
          </a>

          <div className="mt-8 border-t border-line">
            <Accordion title={t.product.details} defaultOpen>
              <ul className="list-inside list-disc space-y-1">
                {p.details.map((d, i) => (
                  <li key={i}>{d[lang]}</li>
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
