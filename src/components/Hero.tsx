import Link from "next/link";
import { getLook, lookTotal } from "@/data/looks";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { formatPrice, photo } from "@/lib/asset";
import { HeroVideo } from "./HeroVideo";
import { Rich } from "./Rich";

/** Full-screen film hero; the header sits transparent on top of it. */
export function Hero({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const look = getLook("09")!;
  const { total } = lookTotal(look);
  const thumb = photo(look.photos[0]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden text-white" data-hero>
      <HeroVideo />

      {/* veil: darker on the left and bottom where the text sits, light at the top for the header */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,14,28,.45) 0%, rgba(8,14,28,0) 22%), linear-gradient(to top, rgba(8,14,28,.82) 0%, rgba(8,14,28,.35) 38%, rgba(8,14,28,0) 62%), linear-gradient(to right, rgba(8,14,28,.45) 0%, rgba(8,14,28,0) 55%)",
        }}
      />

      <div className="wrap wrap-max relative flex min-h-[100svh] flex-col justify-end pb-10 pt-[calc(var(--header-h)+32px)] md:pb-14 [@media(max-height:760px)]:pb-8">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow fade-up text-[#d9c39b]">{t.hero.season}</p>
            <h1 className="h-display mt-5 text-[54px] sm:text-[72px] md:text-[86px] lg:text-[min(104px,10.5svh)] [&_em]:text-[#d9c39b]">
              {t.lux.heroTitle.map((line, i) => (
                <span key={i} className="line-mask">
                  <span style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                    <Rich text={line} />
                  </span>
                </span>
              ))}
            </h1>
            <p className="fade-up mt-6 max-w-[440px] text-[15.5px] leading-[1.75] text-white/80" style={{ animationDelay: ".5s" }}>
              {t.lux.heroText}
            </p>
            <div className="fade-up mt-8 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: ".62s" }}>
              <Link href={`/${lang}/katalog/`} className="pill pill-white">
                {t.lux.heroCta}
              </Link>
              <Link href={`/${lang}/obrazlar/`} className="link-arrow text-white">
                {t.lux.heroLooks} <span className="arrow-line" />
              </Link>
            </div>
          </div>

          <Link
            href={`/${lang}/obrazlar/${look.slug}/`}
            className="fade-up group hidden items-center gap-4 justify-self-end rounded-sm border border-white/20 bg-white/10 p-3 pr-6 backdrop-blur-xl transition-colors duration-500 hover:bg-white/20 md:flex lg:col-span-4 lg:col-start-9"
            style={{ animationDelay: ".9s" }}
          >
            <span className="media aspect-[3/4] w-[58px] shrink-0">
              <img src={thumb.small} alt="" />
            </span>
            <span className="min-w-0">
              <span className="block text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#d9c39b]">{t.lux.nowWearing}</span>
              <span className="serif mt-1 block text-[21px] leading-tight">
                {look.num} · {look.title[lang]}
              </span>
              <span className="mt-1 block text-[12px] text-white/70">
                {formatPrice(total)}+ {t.currency}
              </span>
            </span>
            <span className="link-arrow ml-2 text-white">
              <span className="arrow-line" />
            </span>
          </Link>
        </div>

        <dl className="fade-up mt-10 grid grid-cols-3 border-t border-white/20 pt-5 md:mt-12 md:max-w-[560px] [@media(max-height:760px)]:mt-7" style={{ animationDelay: ".75s" }}>
          {t.lux.stats.map(([n, label], i) => (
            <div key={i} className={i > 0 ? "border-l border-white/20 pl-5" : ""}>
              <dt className="serif text-[28px] font-light leading-none md:text-[34px]">{n}</dt>
              <dd className="mt-1.5 text-[11.5px] font-medium text-white/65">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
