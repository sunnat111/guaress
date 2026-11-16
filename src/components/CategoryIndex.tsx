"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, countIn } from "@/data/products";
import { photo } from "@/lib/asset";
import { useSite } from "./Providers";

/** Large serif category list; hovering a name swaps the preview photo. */
export function CategoryIndex() {
  const { lang } = useSite();
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ul className="lg:col-span-7">
        {categories.map((c, i) => {
          const ph = photo(c.cover);
          const on = active === i;
          return (
            <li key={c.slug} className="border-b border-hair first:border-t">
              <Link
                href={`/${lang}/katalog/?c=${c.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex items-center gap-5 py-5 md:py-6"
              >
                <span className="media aspect-[3/4] w-14 shrink-0 lg:hidden">
                  <img src={ph.small} alt="" loading="lazy" />
                </span>
                <span className="numeral hidden w-12 text-[22px] text-gold lg:block">0{i + 1}</span>
                <span
                  className={`h-title flex-1 text-[30px] transition-all duration-700 md:text-[46px] ${
                    on ? "lg:translate-x-3 lg:text-navy" : "lg:text-ink/80"
                  }`}
                >
                  {c.name[lang]}
                  <sup className="ml-2 align-super font-sans text-[12px] font-semibold text-mist">{countIn(c.slug)}</sup>
                </span>
                <span className={`link-arrow transition-opacity duration-500 ${on ? "lg:opacity-100" : "lg:opacity-0"}`}>
                  <span className="arrow-line" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
        <div className="media arch-soft sticky aspect-[3/4]" style={{ top: "calc(var(--top-offset) + 24px)" }}>
          {categories.map((c, i) => {
            const ph = photo(c.cover);
            return (
              <img
                key={c.slug}
                src={ph.src}
                alt=""
                loading="lazy"
                className="transition-[opacity,transform] duration-[900ms] ease-[var(--ease-lux)]"
                style={{ opacity: active === i ? 1 : 0, transform: active === i ? "scale(1)" : "scale(1.05)" }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
