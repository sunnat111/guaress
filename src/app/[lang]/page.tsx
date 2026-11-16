import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ArrowRight, ClockIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { InViewVideo } from "@/components/InViewVideo";
import { LookCard } from "@/components/LookCard";
import { SailMark } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { ProductRail } from "@/components/ProductRail";
import { Reveal } from "@/components/Reveal";
import { looks } from "@/data/looks";
import { categories, countIn, getProduct, products } from "@/data/products";
import { site, stores, telHref } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { photo } from "@/lib/asset";

function Img({ name, alt = "", sizes, className = "" }: { name: string; alt?: string; sizes: string; className?: string }) {
  const p = photo(name);
  return <img src={p.small} srcSet={p.srcSet} sizes={sizes} alt={alt} loading="lazy" decoding="async" className={className} />;
}

function SectionHead({ label, title, href, link }: { label: string; title: string; href?: string; link?: string }) {
  return (
    <div className="container-x">
      <div className="flex items-end justify-between gap-6 border-t border-ink pt-6 md:pt-8">
        <div>
          <p className="label mb-3 text-muted md:mb-4">{label}</p>
          <h2 className="display text-[32px] md:text-[52px]">{title}</h2>
        </div>
        {href && (
          <Link href={href} className="caps link-line mb-2 shrink-0 text-[11px] md:text-[12px]">
            {link}
          </Link>
        )}
      </div>
    </div>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDict(lang);
  const fresh = products.filter((p) => p.isNew).slice(0, 8);
  const outerwear = products.filter((p) => p.category === "ustki-kiyim");
  const detailPair = [getProduct("polo-burgundy")!, getProduct("polo-chocolate")!];

  return (
    <>
      <Hero />

      {/* manifesto */}
      <section className="container-x py-20 text-center md:py-32">
        <Reveal>
          <SailMark className="mx-auto h-[34px] text-navy" />
          <h2 className="display mx-auto mt-7 max-w-[900px] text-[28px] md:text-[46px]">{t.manifesto.title}</h2>
          <p className="lead mx-auto mt-6 max-w-[560px]">{t.manifesto.text}</p>
        </Reveal>
      </section>

      {/* categories */}
      <section aria-label={t.home.categories}>
        <div className="no-scrollbar container-x flex snap-x scroll-px-[var(--gutter)] gap-3 overflow-x-auto md:grid md:grid-cols-6 md:gap-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06} className="w-[42vw] shrink-0 snap-start md:w-auto">
              <Link href={`/${lang}/katalog/?c=${c.slug}`} className="group block">
                <div className="photo-box zoom aspect-[3/4]">
                  <Img name={c.cover} alt={c.name[lang]} sizes="(min-width: 768px) 16vw, 42vw" />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <span className="caps text-[11px] md:text-[12px]">{c.name[lang]}</span>
                  <span className="text-[11px] font-light text-faint">
                    0{i + 1} · {countIn(c.slug)}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* looks */}
      <section className="pt-20 md:pt-32">
        <SectionHead label={t.home.looksLabel} title={t.home.looksTitle} href={`/${lang}/obrazlar/`} link={t.home.looksAll} />
        <div className="no-scrollbar container-x mt-8 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto md:mt-12 md:gap-4">
          {looks.map((l) => (
            <div key={l.slug} className="w-[70vw] shrink-0 snap-start sm:w-[42vw] md:w-[calc((100%-48px)/4)]">
              <LookCard look={l} lang={lang} sizes="(min-width: 768px) 25vw, 70vw" />
            </div>
          ))}
        </div>
      </section>

      {/* new collection */}
      <section className="py-20 md:py-32">
        <SectionHead label={t.home.newLabel} title={t.home.newTitle} href={`/${lang}/katalog/`} link={t.home.viewAll} />
        <div className="container-x mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:mt-12 md:gap-x-4 md:gap-y-14 lg:grid-cols-4">
          {fresh.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.06}>
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* editorial: details */}
      <section className="grid bg-sand md:grid-cols-2">
        <div className="photo-box aspect-[3/4] md:aspect-auto md:min-h-[720px]">
          <Img name="p2497" alt="" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div className="container-x flex flex-col justify-center py-16 md:px-16 md:py-20 xl:px-24">
          <Reveal>
            <p className="label mb-4 text-navy">{t.home.detailsLabel}</p>
            <h2 className="display text-[34px] md:text-[52px]">{t.home.detailsTitle}</h2>
            <p className="lead mt-6 max-w-[480px]">{t.home.detailsText}</p>
          </Reveal>
          <div className="mt-10 grid max-w-[480px] grid-cols-2 gap-3">
            {detailPair.map((p) => (
              <ProductCard key={p.slug} p={p} sizes="(min-width: 768px) 15vw, 45vw" />
            ))}
          </div>
          <div className="mt-10">
            <Link href={`/${lang}/obrazlar/01/`} className="btn btn-dark">
              {t.home.detailsCta}
            </Link>
          </div>
        </div>
      </section>

      {/* outerwear */}
      <section className="overflow-hidden bg-navy-deep text-white">
        <div className="border-b border-white/15 py-3">
          <div className="marquee-track">
            {Array.from({ length: 2 }, (_, k) => (
              <div key={k} className="flex shrink-0">
                {Array.from({ length: 6 }, (_, j) => (
                  <span key={j} className="label px-6 text-white/75">
                    {t.home.outerLabel} · Guaress · {t.hero.season} ·
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="container-x grid items-center gap-10 py-16 md:grid-cols-12 md:py-24">
          <Reveal className="md:col-span-6 lg:col-span-5">
            <p className="label mb-4 text-white/60">{t.home.outerLabel}</p>
            <h2 className="display text-[34px] md:text-[56px]">{t.home.outerTitle}</h2>
            <p className="mt-6 max-w-[460px] text-[15px] font-light leading-[1.8] text-white/70">{t.home.outerText}</p>
            <Link href={`/${lang}/katalog/?c=ustki-kiyim`} className="btn btn-white mt-10">
              {t.home.outerCta}
            </Link>
          </Reveal>
          <div className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-8">
            <div className="photo-box mx-auto aspect-[9/16] max-w-[380px] bg-black">
              <InViewVideo name="outerwear" />
            </div>
          </div>
        </div>
        <div className="pb-16 md:pb-24">
          <ProductRail items={outerwear} tone="dark" />
        </div>
      </section>

      {/* stylist */}
      <section className="grid bg-ink text-white md:grid-cols-2">
        <div className="container-x order-2 flex flex-col justify-center py-16 md:order-1 md:px-16 md:py-20 xl:px-24">
          <Reveal>
            <p className="label mb-4 text-white/60">{t.home.stylistLabel}</p>
            <h2 className="display text-[34px] md:text-[52px]">{t.home.stylistTitle}</h2>
            <p className="mt-6 max-w-[460px] text-[15px] font-light leading-[1.8] text-white/70">{t.home.stylistText}</p>
            <a href={telHref(site.phones[0])} className="btn btn-line-white mt-10">
              <PhoneIcon width={16} height={16} /> {t.home.stylistCta}
            </a>
          </Reveal>
        </div>
        <div className="photo-box order-1 aspect-[3/4] md:order-2 md:aspect-auto md:min-h-[680px]">
          <Img name="p2513" alt="" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
      </section>

      {/* stores */}
      <section className="py-20 md:py-32">
        <SectionHead label={t.home.storesLabel} title={t.home.storesTitle} href={`/${lang}/dokonlar/`} link={t.home.storesAll} />
        <div className="container-x mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:gap-4">
          <div className="photo-box zoom aspect-[3/4] md:col-span-5">
            <Img name="v2550-store" alt="Guaress" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <ul className="md:col-span-6 md:col-start-7">
            {stores.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.08} className="border-b border-line py-6 first:pt-0 md:py-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="num text-[15px] text-navy">0{i + 1}</p>
                    <h3 className="display mt-2 text-[24px] md:text-[30px]">{s.name[lang]}</h3>
                    <p className="mt-3 flex items-center gap-2 text-[14px] font-light text-muted">
                      <PinIcon width={16} height={16} /> {s.note[lang]}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-[14px] font-light text-muted">
                      <ClockIcon width={16} height={16} /> {t.stores.daily} {site.hours}
                    </p>
                  </div>
                  <a href={s.map} target="_blank" rel="noreferrer" className="caps mt-8 flex shrink-0 items-center gap-3 text-[11px] hover:text-navy">
                    <span className="hidden sm:inline">{t.stores.route}</span> <ArrowRight width={28} />
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
