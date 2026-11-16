"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { Emblem } from "./Logo";
import { ProductCard } from "./ProductCard";
import { useSite } from "./Providers";

export function FavoritesView() {
  const { lang, t, favorites } = useSite();
  const list = products.filter((p) => favorites.includes(p.slug));
  return (
    <div className="wrap wrap-max pb-28 md:pb-36">
      <header className="pb-10 pt-10 md:pb-14 md:pt-16">
        <p className="eyebrow">Guaress</p>
        <div className="mt-5 flex items-end gap-6">
          <h1 className="h-display text-[56px] md:text-[96px]">{t.favorites.title}</h1>
          {list.length > 0 && <span className="mb-3 text-[13px] font-medium text-mist md:mb-5">{t.catalog.items(list.length)}</span>}
        </div>
      </header>
      {list.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl bg-pearl px-6 py-24 text-center">
          <Emblem className="h-16 text-navy" />
          <p className="text-body mt-8 max-w-[380px]">{t.favorites.empty}</p>
          <Link href={`/${lang}/katalog/`} className="pill pill-navy mt-10">
            {t.favorites.cta}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 md:gap-y-16 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
