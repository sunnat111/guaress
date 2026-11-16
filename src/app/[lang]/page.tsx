import Link from "next/link";
import { CategoryIndex } from "@/components/CategoryIndex";
import { Hero } from "@/components/Hero";
import { ClockIcon, PinIcon } from "@/components/Icons";
import { InViewVideo } from "@/components/InViewVideo";
import { LookCard } from "@/components/LookCard";
import { LookShowcase } from "@/components/LookShowcase";
import { Emblem, Wave } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { ProductRail } from "@/components/ProductRail";
import { ReserveButton } from "@/components/ReserveButton";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { looks } from "@/data/looks";
import { products } from "@/data/products";
import { site, stores } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { photo } from "@/lib/asset";

function Head({
  eyebrow,
  title,
  text,
  href,
  link,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  href?: string;
  link?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="wrap wrap-max flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={`h-title mt-5 max-w-[760px] text-[42px] md:text-[64px] ${tone === "dark" ? "text-white [&_em]:text-gold" : ""}`}>
          <Rich text={title} />
        </h2>
        {text && <p className={`text-body mt-5 max-w-[520px] ${tone === "dark" ? "text-white/65" : ""}`}>{text}</p>}
      </Reveal>
      {href && (
        <Link href={href} className={`link-arrow shrink-0 md:mb-3 ${tone === "dark" ? "text-white" : ""}`}>
          {link} <span className="arrow-line" />
        </Link>
      )}
    </div>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDict(lang);
  const fresh = products.filter((p) => p.isNew).slice(0, 8);
  const outerwear = products.filter((p) => p.category === "ustki-kiyim");
  const editorial = ["01", "03", "04", "05", "06", "08"].map((s) => looks.find((l) => l.slug === s)!);
  const stylistPhoto = photo("p2513");

  return (
    <>
      <Hero lang={lang} />

      {/* statement */}
      <section className="wrap wrap-max py-24 text-center md:py-36">
        <Reveal>
          <Emblem className="mx-auto h-12 text-navy" />
          <p className="h-title mx-auto mt-10 max-w-[1000px] text-[34px] md:text-[56px]">
            <Rich text={t.lux.statement} />
          </p>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-mist">— {t.lux.statementBy}</p>
        </Reveal>
        <Wave className="mx-auto mt-16 h-8 w-full max-w-[520px] text-gold/70" />
      </section>

      {/* featured look with hotspots */}
      <section className="bg-pearl py-20 md:py-32">
        <div className="wrap wrap-max">
          <LookShowcase slug="02" eyebrow={`${t.lux.featuredLabel} · ${t.lux.look} 02`} />
        </div>
      </section>

      {/* editorial looks grid */}
      <section className="py-24 md:py-36">
        <Head eyebrow={t.hero.season} title={t.lux.looksTitle} text={t.lux.looksText} href={`/${lang}/obrazlar/`} link={t.home.looksAll} />
        <div className="wrap wrap-max mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-x-10">
          {editorial.map((l, i) => (
            <Reveal key={l.slug} delay={(i % 3) * 0.1} className={i % 3 === 1 ? "lg:mt-24" : i % 3 === 2 ? "lg:mt-10" : ""}>
              <LookCard look={l} lang={lang} ratio={i % 2 ? "aspect-[4/5]" : "aspect-[3/4]"} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* categories */}
      <section className="pb-24 md:pb-36">
        <Head eyebrow={t.home.categories} title={t.lux.categoriesTitle} href={`/${lang}/katalog/`} link={t.home.viewAll} />
        <div className="wrap wrap-max mt-12 md:mt-16">
          <CategoryIndex />
        </div>
      </section>

      {/* new arrivals */}
      <section className="border-t border-hair py-24 md:py-36">
        <Head eyebrow={t.home.newLabel} title={t.lux.newTitle} href={`/${lang}/katalog/`} link={t.home.viewAll} />
        <div className="wrap wrap-max mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-16 md:gap-x-6 md:gap-y-16 lg:grid-cols-4">
          {fresh.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.08}>
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* outerwear: the one deep-navy chapter */}
      <section className="bg-navy-deep py-24 text-white md:py-36">
        <div className="wrap wrap-max grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="media arch mx-auto aspect-[3/4] max-w-[460px] bg-navy">
              <InViewVideo name="outerwear" topCrop />
            </div>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">{t.home.outerLabel}</p>
            <h2 className="h-title mt-5 text-[42px] text-white md:text-[64px] [&_em]:text-gold">
              <Rich text={t.lux.outerTitle} />
            </h2>
            <p className="text-body mt-6 max-w-[480px] text-white/65">{t.home.outerText}</p>
            <Link href={`/${lang}/katalog/?c=ustki-kiyim`} className="pill pill-white mt-10">
              {t.home.outerCta}
            </Link>
          </Reveal>
        </div>
        <div className="wrap-max mt-20">
          <ProductRail items={outerwear} tone="dark" />
        </div>
      </section>

      {/* stylist */}
      <section className="py-24 md:py-36">
        <div className="wrap wrap-max grid items-center gap-14 lg:grid-cols-12">
          <Reveal variant="unveil" className="lg:col-span-5">
            <div className="media arch aspect-[3/4]">
              <img src={stylistPhoto.src} srcSet={stylistPhoto.srcSet} sizes="(min-width: 1024px) 40vw, 100vw" alt="" loading="lazy" />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow">{t.home.stylistLabel}</p>
              <h2 className="h-title mt-5 text-[42px] md:text-[64px]">
                <Rich text={t.lux.stylistTitle} />
              </h2>
              <p className="text-body mt-6 max-w-[500px]">{t.home.stylistText}</p>
            </Reveal>
            <ol className="mt-10 border-t border-hair">
              {t.lux.stylistSteps.map(([title, text], i) => (
                <Reveal as="li" key={i} delay={i * 0.1} className="flex gap-6 border-b border-hair py-6">
                  <span className="numeral w-10 shrink-0 text-[40px] text-gold">{i + 1}</span>
                  <span>
                    <span className="block text-[15px] font-semibold">{title}</span>
                    <span className="mt-1 block text-[14px] text-slate">{text}</span>
                  </span>
                </Reveal>
              ))}
            </ol>
            <ReserveButton intent={{}} label={t.home.stylistCta} className="pill pill-navy mt-10" />
          </div>
        </div>
      </section>

      {/* boutiques */}
      <section className="bg-pearl py-24 md:py-36">
        <Head eyebrow={t.home.storesLabel} title={t.lux.storesTitle} href={`/${lang}/dokonlar/`} link={t.home.storesAll} />
        <div className="wrap wrap-max mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
          {stores.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1} className="group flex flex-col bg-ivory p-8 transition-shadow duration-700 hover:shadow-[0_30px_70px_rgba(10,20,40,.08)] md:p-10">
              <span className="numeral text-[64px] text-gold">0{i + 1}</span>
              <h3 className="h-title mt-6 text-[32px]">{s.name[lang]}</h3>
              <p className="mt-4 flex items-center gap-2.5 text-[14px] text-slate">
                <PinIcon width={17} height={17} className="text-navy" /> {s.note[lang]}
              </p>
              <p className="mt-2 flex items-center gap-2.5 text-[14px] text-slate">
                <ClockIcon width={17} height={17} className="text-navy" /> {t.stores.daily} {site.hours}
              </p>
              <a href={s.map} target="_blank" rel="noreferrer" className="link-arrow mt-auto pt-10 text-navy">
                {t.stores.route} <span className="arrow-line" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
