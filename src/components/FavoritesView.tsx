"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { BookmarkIcon } from "./Icons";
import { ProductCard } from "./ProductCard";
import { useSite } from "./Providers";

export function FavoritesView() {
  const { lang, t, favorites } = useSite();
  const list = products.filter((p) => favorites.includes(p.slug));
  return (
    <div className="container-x pb-24 md:pb-32">
      <div className="flex items-baseline gap-4 py-10 md:py-14">
        <h1 className="display text-[40px] md:text-[64px]">{t.favorites.title}</h1>
        {list.length > 0 && <span className="text-[13px] font-light text-faint">{t.catalog.items(list.length)}</span>}
      </div>
      {list.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <BookmarkIcon width={30} height={30} />
          <p className="lead mt-6 max-w-[360px]">{t.favorites.empty}</p>
          <Link href={`/${lang}/katalog/`} className="btn btn-dark mt-8">
            {t.favorites.cta}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-4 md:gap-y-14 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
