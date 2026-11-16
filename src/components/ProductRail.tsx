"use client";

import { useRef } from "react";
import type { Product } from "@/data/products";
import { ChevronLeft, ChevronRight } from "./Icons";
import { ProductCard } from "./ProductCard";

export function ProductRail({ items, tone = "light" }: { items: Product[]; tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: d * ((card?.offsetWidth ?? 300) + 24), behavior: "smooth" });
  };
  const btn =
    tone === "dark"
      ? "border border-white/25 text-white hover:bg-white hover:text-ink"
      : "border border-ink/15 text-ink hover:bg-ink hover:text-white";
  return (
    <div>
      <div
        ref={ref}
        className="no-scrollbar wrap flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto md:gap-6"
      >
        {items.map((p) => (
          <div key={p.slug} data-card className="w-[66vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] lg:w-[calc((100%-72px)/4)]">
            <ProductCard p={p} tone={tone} sizes="(min-width: 1024px) 25vw, 66vw" />
          </div>
        ))}
      </div>
      {items.length > 4 && (
        <div className="wrap mt-10 hidden justify-end gap-3 md:flex">
          <button onClick={() => scroll(-1)} className={`round-btn ${btn}`} aria-label="←">
            <ChevronLeft />
          </button>
          <button onClick={() => scroll(1)} className={`round-btn ${btn}`} aria-label="→">
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
