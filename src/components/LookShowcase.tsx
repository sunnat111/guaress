"use client";

import Link from "next/link";
import { useState } from "react";
import { getLook, lookTotal, resolveItem } from "@/data/looks";
import { formatPrice, photo } from "@/lib/asset";
import { Rich } from "./Rich";
import { SailMark } from "./Logo";
import { useSite } from "./Providers";

/**
 * A look photo with tappable markers on each garment, next to the item list.
 * Hovering/tapping a marker highlights the item; the item list highlights the marker.
 */
export function LookShowcase({
  slug,
  eyebrow,
  headingAs = "h2",
  showLink = true,
  priority = false,
}: {
  slug: string;
  eyebrow?: string;
  headingAs?: "h1" | "h2";
  showLink?: boolean;
  priority?: boolean;
}) {
  const { lang, t, openReserve } = useSite();
  const look = getLook(slug)!;
  const [active, setActive] = useState<number | null>(null);
  const items = look.items.map(resolveItem);
  const { total, complete } = lookTotal(look);
  const ph = photo(look.spot.photo);
  const H = headingAs;

  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 xl:gap-24">
      <div className="relative">
        <div className="media aspect-[3/4]">
          <img
            src={ph.src}
            srcSet={ph.srcSet}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt={look.title[lang]}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
          />
          {look.spot.points.map((pt) => {
            const it = items[pt.item];
            const on = active === pt.item;
            return (
              <div key={pt.item} className="absolute" style={{ left: `${pt.x}%`, top: `${pt.y}%` }}>
                <button
                  onMouseEnter={() => setActive(pt.item)}
                  onFocus={() => setActive(pt.item)}
                  onClick={() => setActive(on ? null : pt.item)}
                  aria-label={it.name[lang]}
                  aria-pressed={on}
                  className={`hotspot relative -ml-[15px] -mt-[15px] flex h-[30px] w-[30px] items-center justify-center rounded-full transition-all duration-500 ${
                    on ? "scale-110 bg-navy text-white" : "bg-white/95 text-navy"
                  }`}
                >
                  <span className="relative text-[15px] leading-none">{on ? "–" : "+"}</span>
                </button>
                {on && (
                  <div
                    className={`fade-up absolute top-6 z-10 hidden w-[230px] rounded-sm bg-white p-3 shadow-[0_18px_50px_rgba(10,20,40,.16)] md:block ${
                      pt.x > 55 ? "right-0" : "left-0"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="media aspect-[3/4] w-12 shrink-0">
                        {it.product ? <img src={photo(it.product.photos[0]).small} alt="" /> : <SailMark className="absolute inset-0 m-auto h-5 text-mist" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-medium leading-snug">{it.name[lang]}</span>
                        <span className="price mt-0.5 block text-[16px]">
                          {it.price != null ? `${formatPrice(it.price)} ${t.currency}` : <span className="font-sans text-[12px] text-slate">{t.product.priceOnRequest}</span>}
                        </span>
                      </span>
                    </div>
                    {it.product && (
                      <Link href={`/${lang}/katalog/${it.product.slug}/`} className="link-arrow mt-3 text-[12px] text-navy">
                        <span className="capitalize">{t.product.readMore}</span>
                        <span className="arrow-line" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <span className="numeral pointer-events-none absolute -bottom-5 right-4 text-[96px] text-white/95 drop-shadow-[0_6px_30px_rgba(0,0,0,.25)] md:-bottom-8 md:right-8 md:text-[150px]">
          {look.num}
        </span>
      </div>

      <div>
        <p className="eyebrow">{eyebrow ?? `${t.lux.look} ${look.num}`}</p>
        <H className="h-title mt-5 text-[40px] md:text-[56px]">
          <Rich text={look.title[lang]} />
        </H>
        <p className="text-body mt-5 max-w-[480px]">{look.text[lang]}</p>
        <p className="mt-6 hidden text-[12px] font-medium text-mist md:block">{t.lux.tapHint}</p>

        <ol className="mt-6 border-t border-hair">
          {items.map((it, i) => {
            const on = active === i;
            const inner = (
              <>
                <span className={`numeral w-8 shrink-0 text-[26px] transition-colors ${on ? "text-navy" : "text-gold"}`}>{i + 1}</span>
                <span className="flex-1 text-[14.5px] font-medium">{it.name[lang]}</span>
                <span className="price shrink-0 text-[18px]">
                  {it.price != null ? formatPrice(it.price) : <span className="font-sans text-[12.5px] text-slate">{t.product.priceOnRequest}</span>}
                </span>
              </>
            );
            return (
              <li
                key={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={`border-b border-hair transition-colors duration-500 ${on ? "bg-pearl" : ""}`}
              >
                {it.product ? (
                  <Link href={`/${lang}/katalog/${it.product.slug}/`} className="flex items-center gap-4 px-2 py-4">
                    {inner}
                  </Link>
                ) : (
                  <div className="flex items-center gap-4 px-2 py-4">{inner}</div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="mt-5 flex items-baseline justify-between px-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate">{t.looks.total}</span>
          <span className="price text-[26px]">
            {formatPrice(total)}
            {complete ? "" : "+"} <span className="text-[15px] opacity-60">{t.currency}</span>
          </span>
        </div>
        <p className="mt-1 px-2 text-right text-[12px] text-gold">{t.product.priceNote}</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <button onClick={() => openReserve({ look: look.slug })} className="pill pill-navy">
            {t.looks.reserveAll}
          </button>
          {showLink && (
            <Link href={`/${lang}/obrazlar/${look.slug}/`} className="link-arrow">
              {t.product.seeLook} <span className="arrow-line" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
