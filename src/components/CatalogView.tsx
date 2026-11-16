"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { categories, colours, products, type CategorySlug } from "@/data/products";
import { ChevronDown } from "./Icons";
import { ProductCard } from "./ProductCard";
import { useSite } from "./Providers";

type Sort = "new" | "asc" | "desc";

export function CatalogView() {
  const { lang, t } = useSite();
  const sp = useSearchParams();
  const c = sp.get("c") as CategorySlug | null;
  const cat = categories.find((x) => x.slug === c) ?? null;
  const [colour, setColour] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("new");

  const [lastCat, setLastCat] = useState(cat?.slug);
  if (lastCat !== cat?.slug) {
    setLastCat(cat?.slug);
    setColour(null);
  }

  const inCat = useMemo(() => products.filter((p) => !cat || p.category === cat.slug), [cat]);
  const colourOptions = useMemo(() => [...new Set(inCat.map((p) => p.colour))], [inCat]);
  const list = useMemo(() => {
    const l = inCat.filter((p) => !colour || p.colour === colour);
    if (sort === "new") return [...l].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    const v = (x: number | null) => (x == null ? (sort === "asc" ? Infinity : -Infinity) : x);
    return [...l].sort((a, b) => (sort === "asc" ? v(a.price) - v(b.price) : v(b.price) - v(a.price)));
  }, [inCat, colour, sort]);

  const sortLabels: Record<Sort, string> = { new: t.catalog.sortNew, asc: t.catalog.sortAsc, desc: t.catalog.sortDesc };

  return (
    <>
      <header className="wrap wrap-max pb-10 pt-10 md:pb-14 md:pt-16">
        <p className="eyebrow">{t.hero.season}</p>
        <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2">
          <h1 className="h-display text-[56px] md:text-[96px]">{cat ? cat.name[lang] : t.catalog.title}</h1>
          <span className="mb-3 text-[13px] font-medium text-mist md:mb-5">{t.catalog.items(list.length)}</span>
        </div>
        <nav className="no-scrollbar -mx-[var(--gutter)] mt-8 flex gap-8 overflow-x-auto border-b border-hair px-[var(--gutter)]" aria-label={t.nav.catalog}>
          {[{ slug: null as string | null, label: t.catalog.all }, ...categories.map((x) => ({ slug: x.slug as string | null, label: x.name[lang] }))].map((x) => {
            const on = (cat?.slug ?? null) === x.slug;
            return (
              <Link
                key={x.slug ?? "all"}
                href={x.slug ? `/${lang}/katalog/?c=${x.slug}` : `/${lang}/katalog/`}
                aria-current={on ? "page" : undefined}
                className={`relative shrink-0 pb-4 text-[14px] font-medium transition-colors ${
                  on ? "text-navy after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:bg-navy" : "text-slate hover:text-ink"
                }`}
              >
                {x.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="sticky z-20 bg-ivory/90 backdrop-blur-xl" style={{ top: "var(--top-offset)" }}>
        <div className="wrap wrap-max flex items-center justify-between gap-4 py-3">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
            {colourOptions.map((k) => (
              <button key={k} onClick={() => setColour(colour === k ? null : k)} aria-pressed={colour === k} className="chip shrink-0 pl-2.5">
                <span className="h-4 w-4 rounded-full ring-1 ring-black/10" style={{ background: colours[k].hex }} />
                {colours[k].name[lang]}
              </button>
            ))}
          </div>
          <label className="relative shrink-0">
            <span className="sr-only">{t.catalog.sort}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="chip appearance-none bg-transparent pr-9"
            >
              {(Object.keys(sortLabels) as Sort[]).map((s) => (
                <option key={s} value={s}>
                  {sortLabels[s]}
                </option>
              ))}
            </select>
            <ChevronDown width={14} height={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
          </label>
        </div>
      </div>

      <div className="wrap wrap-max pb-28 pt-8 md:pb-36 md:pt-10">
        {list.length === 0 ? (
          <p className="text-body py-24 text-center">{t.catalog.empty}</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 md:gap-y-16 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.slug} p={p} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
