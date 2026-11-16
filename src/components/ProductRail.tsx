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
    el.scrollBy({ left: d * ((card?.offsetWidth ?? 300) + 16), behavior: "smooth" });
  };
  const btn =
    tone === "dark"
      ? "border-white/35 text-white hover:bg-white hover:text-ink"
      : "border-ink/25 text-ink hover:bg-ink hover:text-white";
  return (
    <div>
      <div ref={ref} className="no-scrollbar container-x flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto md:gap-4">
        {items.map((p) => (
          <div key={p.slug} data-card className="w-[62vw] shrink-0 snap-start sm:w-[40vw] md:w-[calc((100%-48px)/4)]">
            <ProductCard p={p} tone={tone} sizes="(min-width: 768px) 25vw, 62vw" />
          </div>
        ))}
      </div>
      {items.length > 4 && (
        <div className="container-x mt-8 hidden justify-end gap-2 md:flex">
          <button onClick={() => scroll(-1)} className={`flex h-11 w-11 items-center justify-center border transition-colors ${btn}`} aria-label="←">
            <ChevronLeft />
          </button>
          <button onClick={() => scroll(1)} className={`flex h-11 w-11 items-center justify-center border transition-colors ${btn}`} aria-label="→">
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
