import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { lookTotal, type Look } from "@/data/looks";
import { getDict } from "@/i18n";
import { formatPrice, photo } from "@/lib/asset";

export function LookCard({
  look,
  lang,
  sizes = "(min-width: 768px) 33vw, 90vw",
  ratio = "aspect-[3/4]",
}: {
  look: Look;
  lang: Locale;
  sizes?: string;
  ratio?: string;
}) {
  const t = getDict(lang);
  const cover = photo(look.photos[0]);
  const { total, complete } = lookTotal(look);
  return (
    <Link href={`/${lang}/obrazlar/${look.slug}/`} className="group block">
      <div className={`media lift ${ratio}`}>
        <img src={cover.small} srcSet={cover.srcSet} sizes={sizes} alt={look.title[lang]} loading="lazy" decoding="async" />
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>
      <div className="mt-5 flex items-start gap-4">
        <span className="numeral text-[44px] text-gold">{look.num}</span>
        <div className="min-w-0 flex-1 pt-1">
          <h3 className="h-title text-[25px] transition-colors group-hover:text-navy">{look.title[lang]}</h3>
          <p className="mt-1 text-[12.5px] text-slate">
            {look.items.length} × · {complete ? `${formatPrice(total)} ${t.currency}` : `${formatPrice(total)}+ ${t.currency}`}
          </p>
        </div>
      </div>
    </Link>
  );
}
