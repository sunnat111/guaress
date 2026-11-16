import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { lookTotal, type Look } from "@/data/looks";
import { getDict } from "@/i18n";
import { formatPrice, photo } from "@/lib/asset";

export function LookCard({ look, lang, sizes = "(min-width: 768px) 33vw, 80vw" }: { look: Look; lang: Locale; sizes?: string }) {
  const t = getDict(lang);
  const cover = photo(look.photos[0]);
  const { total, complete } = lookTotal(look);
  return (
    <Link href={`/${lang}/obrazlar/${look.slug}/`} className="group block">
      <div className="photo-box zoom aspect-[3/4]">
        <img src={cover.small} srcSet={cover.srcSet} sizes={sizes} alt={look.title[lang]} loading="lazy" decoding="async" />
        <span className="num pointer-events-none absolute bottom-4 left-4 text-[64px] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,.35)] md:text-[80px]">
          {look.num}
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="caps text-[12px]">{look.title[lang]}</h3>
        <span className="shrink-0 text-[12px] font-light text-muted">{look.items.length} ×</span>
      </div>
      <p className="mt-1 text-[13px] font-light text-muted">
        {complete ? `${formatPrice(total)} ${t.currency}` : t.product.priceOnRequest}
      </p>
    </Link>
  );
}
