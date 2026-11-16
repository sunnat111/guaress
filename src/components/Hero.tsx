import Link from "next/link";
import { getLook, lookTotal } from "@/data/looks";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { asset, formatPrice, photo } from "@/lib/asset";
import { SailMark } from "./Logo";
import { Rich } from "./Rich";

export function Hero({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const look = getLook("09")!;
  const { total } = lookTotal(look);
  const thumb = photo(look.photos[0]);

  return (
    <section className="pt-top relative overflow-hidden">
      <SailMark className="pointer-events-none absolute -left-24 top-24 h-[620px] text-navy opacity-[0.035] md:h-[820px]" />
      <div className="wrap wrap-max relative grid gap-12 pb-20 pt-6 md:pb-24 md:pt-8 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-6 lg:pb-6 xl:col-span-6">
          <p className="eyebrow fade-up">{t.hero.season}</p>
          <h1 className="h-display mt-6 text-[54px] sm:text-[76px] md:text-[88px] lg:text-[min(108px,11.2svh)]">
            {t.lux.heroTitle.map((line, i) => (
              <span key={i} className="line-mask">
                <span style={{ animationDelay: `${0.12 + i * 0.12}s` }}>
                  <Rich text={line} />
                </span>
              </span>
            ))}
          </h1>
          <p className="text-body fade-up mt-7 max-w-[440px]" style={{ animationDelay: ".5s" }}>
            {t.lux.heroText}
          </p>
          <div className="fade-up mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: ".62s" }}>
            <Link href={`/${lang}/katalog/`} className="pill pill-navy">
              {t.lux.heroCta}
            </Link>
            <Link href={`/${lang}/obrazlar/`} className="link-arrow">
              {t.lux.heroLooks} <span className="arrow-line" />
            </Link>
          </div>
          <dl className="fade-up mt-12 grid max-w-[520px] grid-cols-3 border-t border-hair pt-6" style={{ animationDelay: ".75s" }}>
            {t.lux.stats.map(([n, label], i) => (
              <div key={i} className={i > 0 ? "border-l border-hair pl-5" : ""}>
                <dt className="serif text-[30px] font-light leading-none text-navy md:text-[36px]">{n}</dt>
                <dd className="mt-2 text-[12px] font-medium text-slate">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
          <div className="relative lg:ml-auto lg:max-w-[min(470px,calc((100svh-var(--header-h)-80px)*0.75))]">
          <div className="media arch fade-up aspect-[4/5] w-full lg:aspect-[3/4]" style={{ animationDelay: ".2s" }}>
            <video
              src={asset("/media/film-park.mp4")}
              poster={asset("/media/film-park.webp")}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </div>
          <span className="pointer-events-none absolute -right-3 top-1/2 hidden origin-center translate-x-1/2 -translate-y-1/2 rotate-90 text-[10px] font-bold uppercase tracking-[0.5em] text-mist xl:block">
            Guaress · {t.home.storesLabel} · {t.hero.season}
          </span>
          <Link
            href={`/${lang}/obrazlar/${look.slug}/`}
            className="fade-up group absolute -bottom-8 left-4 flex w-[270px] items-center gap-4 bg-white p-3 pr-5 shadow-[0_24px_60px_rgba(10,20,40,.14)] md:left-auto md:right-8 lg:-left-24 lg:right-auto"
            style={{ animationDelay: ".9s" }}
          >
            <span className="media aspect-[3/4] w-[58px] shrink-0">
              <img src={thumb.small} alt="" />
            </span>
            <span className="min-w-0">
              <span className="block text-[9.5px] font-bold uppercase tracking-[0.22em] text-gold">{t.lux.nowWearing}</span>
              <span className="serif mt-1 block text-[20px] leading-tight">
                {look.num} · {look.title[lang]}
              </span>
              <span className="mt-1 block text-[12px] text-slate">
                {formatPrice(total)}+ {t.currency}
              </span>
            </span>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
