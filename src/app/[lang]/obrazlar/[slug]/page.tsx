import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InViewVideo } from "@/components/InViewVideo";
import { LookShowcase } from "@/components/LookShowcase";
import { Reveal } from "@/components/Reveal";
import { getLook, looks } from "@/data/looks";
import { locales, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { asset, photo } from "@/lib/asset";

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
  const idx = looks.findIndex((l) => l.slug === slug);
  const next = looks[(idx + 1) % looks.length];
  const gallery = look.photos.filter((p) => p !== look.spot.photo);
  const nextCover = photo(next.photos[0]);

  return (
    <div className="pt-top">
      <section className="wrap wrap-max pb-20 pt-8 md:pb-28 md:pt-12">
        <nav className="mb-10 flex gap-2 text-[12px] font-medium text-mist" aria-label="breadcrumb">
          <Link href={`/${lang}/obrazlar/`} className="hover:text-ink">
            {t.looks.title}
          </Link>
          <span>/</span>
          <span>{look.num}</span>
        </nav>
        <LookShowcase slug={look.slug} headingAs="h1" showLink={false} priority eyebrow={`${t.lux.look} ${look.num} · ${t.hero.season}`} />
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="wrap wrap-max columns-2 gap-3 md:columns-3 md:gap-5">
          {gallery.map((name, i) => {
            const ph = photo(name);
            return (
              <Reveal key={name} variant="unveil" delay={(i % 3) * 0.1} className="mb-3 break-inside-avoid md:mb-5">
                <div className={`media ${i % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
                  <img src={ph.small} srcSet={ph.srcSet} sizes="(min-width: 768px) 33vw, 50vw" alt="" loading="lazy" />
                </div>
              </Reveal>
            );
          })}
        </div>
        {look.film && (
          <div className="wrap mt-16 flex flex-col items-center md:mt-24">
            <p className="eyebrow">{t.looks.film}</p>
            <div className="media arch mt-8 aspect-[9/16] w-full max-w-[380px] bg-ink">
              <InViewVideo name={look.film} />
            </div>
          </div>
        )}
      </section>

      <Link href={`/${lang}/obrazlar/${next.slug}/`} className="group block">
        <div className="wrap wrap-max flex items-center gap-6 py-14 md:gap-10 md:py-20">
          <span className="media aspect-[3/4] w-20 shrink-0 md:w-28">
            <img src={nextCover.small} alt="" loading="lazy" className="transition-transform duration-[1600ms] group-hover:scale-105" />
          </span>
          <span className="flex-1">
            <span className="eyebrow">{t.looks.next}</span>
            <span className="h-title mt-3 block text-[34px] transition-colors group-hover:text-navy md:text-[56px]">
              <span className="numeral mr-3 text-gold">{next.num}</span>
              {next.title[lang]}
            </span>
          </span>
          <span className="link-arrow hidden md:inline-flex">
            <span className="arrow-line" />
          </span>
        </div>
      </Link>
    </div>
  );
}
