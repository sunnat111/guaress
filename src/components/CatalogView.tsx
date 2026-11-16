"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, colours, products, type CategorySlug } from "@/data/products";
import { ChevronDown, GridIcon } from "./Icons";
import { ProductCard } from "./ProductCard";
import { useSite } from "./Providers";

type Sort = "new" | "asc" | "desc";
const VIEW_KEY = "gs-catalog-view";

function Dropdown({
  label,
  active,
  children,
}: {
  label: string;
  active?: boolean;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="caps flex h-11 items-center gap-2 text-[11px]">
        {label}
        {active && <span className="h-[6px] w-[6px] rounded-full bg-navy" />}
        <ChevronDown width={14} height={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 min-w-[220px] border border-line bg-paper py-2 shadow-[0_12px_40px_rgba(0,0,0,.08)]">
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

export function CatalogView() {
  const { lang, t } = useSite();
  const sp = useSearchParams();
  const c = sp.get("c") as CategorySlug | null;
  const cat = categories.find((x) => x.slug === c) ?? null;
  const [colour, setColour] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("new");
  const [cols, setCols] = useState(4);

  // reset colour when the section changes
  const [lastCat, setLastCat] = useState(cat?.slug);
  if (lastCat !== cat?.slug) {
    setLastCat(cat?.slug);
    setColour(null);
  }

  useEffect(() => {
    try {
      const v = Number(localStorage.getItem(VIEW_KEY));
      if (v === 2 || v === 3 || v === 4) setCols(v);
    } catch {}
  }, []);
  const setView = (n: number) => {
    setCols(n);
    try {
      localStorage.setItem(VIEW_KEY, String(n));
    } catch {}
  };

  const inCat = useMemo(() => products.filter((p) => !cat || p.category === cat.slug), [cat]);
  const colourOptions = useMemo(() => [...new Set(inCat.map((p) => p.colour))], [inCat]);
  const list = useMemo(() => {
    const l = inCat.filter((p) => !colour || p.colour === colour);
    if (sort === "new") return [...l].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    const v = (x: number | null) => (x == null ? (sort === "asc" ? Infinity : -Infinity) : x);
    return [...l].sort((a, b) => (sort === "asc" ? v(a.price) - v(b.price) : v(b.price) - v(a.price)));
  }, [inCat, colour, sort]);

  const sortLabels: Record<Sort, string> = { new: t.catalog.sortNew, asc: t.catalog.sortAsc, desc: t.catalog.sortDesc };
  const gridCls = cols === 2 ? "lg:grid-cols-2" : cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <>
      <div className="container-x">
        <div className="flex items-baseline gap-4">
          <h1 className="display text-[40px] md:text-[64px]">{cat ? cat.name[lang] : t.catalog.title}</h1>
          <span className="text-[13px] font-light text-faint">{t.catalog.items(list.length)}</span>
        </div>
        <div className="no-scrollbar -mx-[var(--gutter)] mt-6 flex gap-2 overflow-x-auto px-[var(--gutter)] md:mt-8">
          <Link
            href={`/${lang}/katalog/`}
            className={`caps shrink-0 border px-4 py-2.5 text-[11px] ${!cat ? "border-ink bg-ink text-white" : "border-line hover:border-ink"}`}
            aria-current={!cat ? "page" : undefined}
          >
            {t.catalog.all}
          </Link>
          {categories.map((x) => (
            <Link
              key={x.slug}
              href={`/${lang}/katalog/?c=${x.slug}`}
              className={`caps shrink-0 border px-4 py-2.5 text-[11px] ${cat?.slug === x.slug ? "border-ink bg-ink text-white" : "border-line hover:border-ink"}`}
              aria-current={cat?.slug === x.slug ? "page" : undefined}
            >
              {x.name[lang]}
            </Link>
          ))}
        </div>
      </div>

      <div className="sticky z-20 mt-6 border-y border-line bg-paper/95 backdrop-blur-md md:mt-8" style={{ top: "var(--top-offset)" }}>
        <div className="container-x flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Dropdown label={t.catalog.colour} active={!!colour}>
              {(close) => (
                <>
                  {colourOptions.map((k) => (
                    <button
                      key={k}
                      onClick={() => {
                        setColour(colour === k ? null : k);
                        close();
                      }}
                      aria-pressed={colour === k}
                      className={`flex w-full items-center gap-3 px-4 py-2 text-left text-[14px] font-light hover:bg-sand ${colour === k ? "font-normal" : ""}`}
                    >
                      <span className="h-3 w-3 rounded-full ring-1 ring-black/10" style={{ background: colours[k].hex }} />
                      {colours[k].name[lang]}
                    </button>
                  ))}
                  {colour && (
                    <button
                      onClick={() => {
                        setColour(null);
                        close();
                      }}
                      className="caps mt-1 w-full border-t border-line px-4 pb-1 pt-3 text-left text-[10.5px] text-muted hover:text-ink"
                    >
                      {t.catalog.reset}
                    </button>
                  )}
                </>
              )}
            </Dropdown>
            <Dropdown label={`${t.catalog.sort}: ${sortLabels[sort]}`}>
              {(close) =>
                (Object.keys(sortLabels) as Sort[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSort(s);
                      close();
                    }}
                    aria-pressed={sort === s}
                    className={`block w-full px-4 py-2 text-left text-[14px] font-light hover:bg-sand ${sort === s ? "font-normal" : ""}`}
                  >
                    {sortLabels[s]}
                  </button>
                ))
              }
            </Dropdown>
          </div>
          <div className="hidden items-center gap-1 lg:flex" role="group" aria-label={t.catalog.grid}>
            {[2, 3, 4].map((n) => (
              <button key={n} onClick={() => setView(n)} aria-pressed={cols === n} className={`icon-btn ${cols === n ? "" : "opacity-35"}`}>
                <GridIcon n={n} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x pb-24 pt-8 md:pb-32 md:pt-10">
        {list.length === 0 ? (
          <p className="lead py-20 text-center">{t.catalog.empty}</p>
        ) : (
          <div className={`grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-4 md:gap-y-14 ${gridCls}`}>
            {list.map((p) => (
              <ProductCard key={p.slug} p={p} sizes={`(min-width: 1024px) ${Math.round(100 / cols)}vw, (min-width: 768px) 33vw, 50vw`} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
