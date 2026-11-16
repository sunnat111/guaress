import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/Icons";
import { InViewVideo } from "@/components/InViewVideo";
import { SailMark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { ReserveButton } from "@/components/ReserveButton";
import { getLook, looks, lookTotal, resolveItem } from "@/data/looks";
import { locales, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { asset, formatPrice, photo } from "@/lib/asset";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => looks.map((l) => ({ lang, slug: l.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const l = getLook(slug);
  if (!l) return {};
  const t = getDict(lang);
  return {
    title: `${t.looks.look} ${l.num} · ${l.title[lang]}`,
    description: l.text[lang],
    openGraph: { images: [photo(l.photos[0]).src] },
    alternates: { languages: { uz: asset(`/uz/obrazlar/${slug}/`), ru: asset(`/ru/obrazlar/${slug}/`) } },
  };
}

export default async function LookPage({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params;
  const look = getLook(slug);
  if (!look) notFound();
  const t = getDict(lang);
  const { total, complete } = lookTotal(look);
  const idx = looks.findIndex((l) => l.slug === slug);
  const next = looks[(idx + 1) % looks.length];
  const [first, ...rest] = look.photos;
  const cover = photo(first);

  return (
    <div className="pt-top">
      <div className="md:grid md:grid-cols-2">
        <div className="photo-box aspect-[3/4] md:sticky md:h-[calc(100svh-var(--top-offset))] md:aspect-auto" style={{ top: "var(--top-offset)" }}>
          <img src={cover.src} srcSet={cover.srcSet} sizes="(min-width: 768px) 50vw, 100vw" alt={look.title[lang]} fetchPriority="high" />
          <span className="num pointer-events-none absolute bottom-5 left-5 text-[110px] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,.35)] md:bottom-8 md:left-8 md:text-[180px]">
            {look.num}
          </span>
        </div>

        <div>
          <div className="container-x py-12 md:px-12 md:py-20 lg:px-20">
            <nav className="label flex gap-2 text-faint" aria-label="breadcrumb">
              <Link href={`/${lang}/obrazlar/`} className="hover:text-ink">
                {t.looks.title}
              </Link>
              <span>/</span>
              <span>{look.num}</span>
            </nav>
            <p className="label mt-8 text-muted">
              {t.looks.look} {look.num} · {t.hero.season}
            </p>
            <h1 className="display mt-3 text-[36px] md:text-[56px]">{look.title[lang]}</h1>
            <p className="lead mt-6 max-w-[520px]">{look.text[lang]}</p>

            <h2 className="label mt-12">{t.looks.items}</h2>
            <ul className="mt-4 border-t border-line">
              {look.items.map((it, i) => {
                const r = resolveItem(it);
                const ph = r.product ? photo(r.product.photos[0]) : null;
                const row = (
                  <>
                    <span className="photo-box aspect-[3/4] w-16 shrink-0">
                      {ph ? <img src={ph.small} alt="" loading="lazy" /> : <SailMark className="absolute inset-0 m-auto h-6 text-faint" />}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[15px]">{r.name[lang]}</span>
                      <span className="mt-0.5 block text-[13px] font-light text-muted">
                        {r.price != null ? `${formatPrice(r.price)} ${t.currency}` : t.product.priceOnRequest}
                      </span>
                    </span>
                    {r.product && <ArrowRight width={28} className="shrink-0 opacity-60" />}
                  </>
                );
                return (
                  <li key={i} className="border-b border-line">
                    {r.product ? (
                      <Link href={`/${lang}/katalog/${r.product.slug}/`} className="flex items-center gap-5 py-4 transition-opacity hover:opacity-70">
                        {row}
                      </Link>
                    ) : (
                      <div className="flex items-center gap-5 py-4">{row}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex items-baseline justify-between">
              <span className="caps">{t.looks.total}</span>
              <span className="text-[20px] font-light">
                {complete ? `${formatPrice(total)} ${t.currency}` : `${formatPrice(total)}+ ${t.currency}`}
              </span>
            </div>
            <p className="mt-1 text-right text-[12px] font-light text-navy">{t.product.priceNote}</p>
            <ReserveButton intent={{ look: look.slug }} label={t.looks.reserveAll} className="btn btn-dark mt-8 w-full" />
          </div>

          <div className="grid grid-cols-2 gap-px">
            {rest.map((name, i) => {
              const ph = photo(name);
              return (
                <Reveal key={name} delay={(i % 2) * 0.08} className={`photo-box aspect-[3/4] ${rest.length % 2 === 1 && i === rest.length - 1 ? "col-span-2" : ""}`}>
                  <img src={ph.small} srcSet={ph.srcSet} sizes="(min-width: 768px) 25vw, 50vw" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                </Reveal>
              );
            })}
          </div>

          {look.film && (
            <div className="bg-ink px-[var(--gutter)] py-14 text-white md:py-20">
              <p className="label mb-6 text-center text-white/60">{t.looks.film}</p>
              <div className="photo-box mx-auto aspect-[9/16] max-w-[360px] bg-black">
                <InViewVideo name={look.film} />
              </div>
            </div>
          )}
        </div>
      </div>

      <Link href={`/${lang}/obrazlar/${next.slug}/`} className="group block border-t border-line">
        <div className="container-x flex items-center justify-between py-10 md:py-14">
          <span>
            <span className="label block text-muted">{t.looks.next}</span>
            <span className="display mt-2 block text-[28px] md:text-[44px]">
              {next.num} · {next.title[lang]}
            </span>
          </span>
          <ArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
        </div>
      </Link>
    </div>
  );
}
