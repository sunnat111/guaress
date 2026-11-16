"use client";

import Link from "next/link";
import { categories, colours, type Product } from "@/data/products";
import { formatPrice, photo } from "@/lib/asset";
import { BookmarkIcon } from "./Icons";
import { useSite } from "./Providers";

/** Product card: second photo fades in on hover, price set in serif. */
export function ProductCard({
  p,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  tone = "light",
}: {
  p: Product;
  sizes?: string;
  tone?: "light" | "dark";
}) {
  const { lang, t, isFavorite, toggleFavorite } = useSite();
  const fav = isFavorite(p.slug);
  const a = photo(p.photos[0]);
  const b = p.photos[1] ? photo(p.photos[1]) : null;
  const cat = categories.find((c) => c.slug === p.category)!;
  const dark = tone === "dark";

  return (
    <article className="group relative">
      <div className="media aspect-[3/4]">
        <Link href={`/${lang}/katalog/${p.slug}/`} aria-label={p.name[lang]} className="absolute inset-0">
          <img
            src={a.small}
            srcSet={a.srcSet}
            sizes={sizes}
            alt={p.name[lang]}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-[1600ms] ease-[var(--ease-lux)] group-hover:scale-[1.03]"
          />
          {b && (
            <img
              src={b.small}
              srcSet={b.srcSet}
              sizes={sizes}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-[var(--ease-lux)] group-hover:opacity-100"
            />
          )}
        </Link>
        <button
          onClick={() => toggleFavorite(p.slug)}
          aria-pressed={fav}
          aria-label={fav ? t.product.saved : t.product.save}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-ink shadow-sm backdrop-blur transition-all duration-500 hover:bg-white ${
            fav ? "opacity-100" : "opacity-100 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          }`}
        >
          <BookmarkIcon width={16} height={16} filled={fav} />
        </button>
        {p.isNew && (
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy backdrop-blur">
            {t.product.new}
          </span>
        )}
      </div>

      <Link href={`/${lang}/katalog/${p.slug}/`} className="mt-4 block">
        <p className={`text-[10.5px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-white/45" : "text-mist"}`}>{cat.name[lang]}</p>
        <h3 className={`mt-1.5 text-[14px] font-medium leading-snug ${dark ? "text-white" : "text-ink"}`}>{p.name[lang]}</h3>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className={`price text-[18px] ${dark ? "text-white/90" : "text-ink"}`}>
            {p.price != null ? (
              <>
                {formatPrice(p.price)} <span className="text-[13px] font-normal opacity-60">{t.currency}</span>
              </>
            ) : (
              <span className={`font-sans text-[13px] font-medium ${dark ? "text-white/60" : "text-slate"}`}>{t.product.priceOnRequest}</span>
            )}
          </p>
          <span
            className={`h-3 w-3 shrink-0 rounded-full ${dark ? "ring-1 ring-white/30 ring-offset-2 ring-offset-navy-deep" : "ring-1 ring-black/10 ring-offset-2 ring-offset-ivory"}`}
            style={{ background: colours[p.colour].hex }}
            title={colours[p.colour].name[lang]}
          />
        </div>
      </Link>
    </article>
  );
}
