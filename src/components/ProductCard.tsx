"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { colours, type Product } from "@/data/products";
import { formatPrice, photo } from "@/lib/asset";
import { BookmarkIcon } from "./Icons";
import { useSite } from "./Providers";

/**
 * Product card with hover-scrub: moving the cursor across the photo
 * cross-fades through the product's photos; swipe on touch.
 */
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
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const touchX = useRef<number | null>(null);
  const imgs = p.photos.slice(0, 5);
  const fav = isFavorite(p.slug);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || imgs.length < 2) return;
    const r = e.currentTarget.getBoundingClientRect();
    const k = Math.min(imgs.length - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * imgs.length)));
    setI(k);
  };

  return (
    <article className="group">
      <div
        className="photo-box aspect-[3/4]"
        onPointerMove={onMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={() => {
          setHover(false);
          setI(0);
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 30) setI((v) => (v + (dx < 0 ? 1 : -1) + imgs.length) % imgs.length);
        }}
      >
        <Link href={`/${lang}/katalog/${p.slug}/`} aria-label={p.name[lang]} className="absolute inset-0">
          {imgs.map((name, k) => {
            const ph = photo(name);
            return (
              <img
                key={name + k}
                src={ph.small}
                srcSet={ph.srcSet}
                sizes={sizes}
                alt={k === 0 ? p.name[lang] : ""}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
                style={{ opacity: k === i ? 1 : 0 }}
              />
            );
          })}
        </Link>

        {p.isNew && (
          <span className="label pointer-events-none absolute left-3 top-3 bg-white px-2 py-1 text-[9.5px] tracking-[0.2em] text-ink">
            {t.product.new}
          </span>
        )}
        <button
          onClick={() => toggleFavorite(p.slug)}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center bg-white/90 text-ink transition-opacity hover:opacity-70"
          aria-pressed={fav}
          aria-label={fav ? t.product.saved : t.product.save}
        >
          <BookmarkIcon width={16} height={16} filled={fav} />
        </button>

        {imgs.length > 1 && (
          <div
            className={`pointer-events-none absolute inset-x-3 bottom-3 flex gap-1 transition-opacity duration-300 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          >
            {imgs.map((_, k) => (
              <span key={k} className={`h-[2px] flex-1 ${k === i ? "bg-white" : "bg-white/40"}`} />
            ))}
          </div>
        )}
      </div>

      <Link href={`/${lang}/katalog/${p.slug}/`} className="mt-3 block">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[13px] font-normal leading-snug md:text-[14px]">{p.name[lang]}</h3>
          <span
            className={`mt-[5px] h-[9px] w-[9px] shrink-0 rounded-full ${tone === "dark" ? "ring-1 ring-white/30" : "ring-1 ring-black/10"}`}
            style={{ background: colours[p.colour].hex }}
            aria-hidden
          />
        </div>
        <p className={`mt-1 text-[13px] font-light ${tone === "dark" ? "text-white/70" : "text-muted"}`}>
          {p.price != null ? `${formatPrice(p.price)} ${t.currency}` : t.product.priceOnRequest}
        </p>
      </Link>
    </article>
  );
}
