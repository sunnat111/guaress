import type { Metadata } from "next";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { HeroVideo } from "@/components/HeroVideo";
import { Reveal } from "@/components/Reveal";
import { ReserveButton } from "@/components/ReserveButton";
import { Rich } from "@/components/Rich";
import { site, stores, telHref } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).stores.title };
}

export default async function StoresPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDict(lang);
  return (
    <div>
      {/* full-screen store film; the header sits transparent on top (see Header.tsx) */}
      <section className="relative min-h-[100svh] overflow-hidden text-white" data-hero>
        <HeroVideo film="store" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,14,28,.45) 0%, rgba(8,14,28,0) 22%), linear-gradient(to top, rgba(8,14,28,.8) 0%, rgba(8,14,28,.3) 40%, rgba(8,14,28,0) 62%), linear-gradient(to right, rgba(8,14,28,.55) 0%, rgba(8,14,28,0) 58%)",
          }}
        />
        <div className="wrap wrap-max relative flex min-h-[100svh] flex-col justify-end pb-14 pt-[calc(var(--header-h)+32px)] md:pb-20">
          <p className="eyebrow fade-up text-[#d9c39b]">{t.home.storesLabel}</p>
          <h1 className="h-display mt-5 max-w-[760px] text-[54px] sm:text-[72px] md:text-[88px] lg:text-[min(104px,10.5svh)] [&_em]:text-[#d9c39b]">
            {/* "Uchta *butik* — bitta uslub": break before the dash */}
            {t.lux.storesTitle.split(" — ").map((line, i) => (
              <span key={i} className="line-mask">
                <span style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                  <Rich text={i > 0 ? `— ${line}` : line} />
                </span>
              </span>
            ))}
          </h1>
          <p className="fade-up mt-6 max-w-[460px] text-[15.5px] leading-[1.75] text-white/80" style={{ animationDelay: ".45s" }}>
            {t.stores.text}
          </p>
          <div className="fade-up mt-8 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: ".6s" }}>
            <ReserveButton intent={{}} label={t.lux.book} className="pill pill-white" />
            <a href="#boutiques" className="link-arrow text-white">
              {t.home.storesAll} <span className="arrow-line" />
            </a>
          </div>
        </div>
      </section>

      <section id="boutiques" className="scroll-mt-[var(--header-h)] bg-pearl py-20 md:py-28">
        <div className="wrap wrap-max grid gap-4 md:grid-cols-3 md:gap-6">
          {stores.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1} className="flex flex-col bg-ivory p-8 md:p-10">
              <span className="numeral text-[72px] text-gold">0{i + 1}</span>
              <h2 className="h-title mt-6 text-[34px]">{s.name[lang]}</h2>
              <ul className="mt-6 space-y-3 text-[14px] text-slate">
                <li className="flex items-start gap-3">
                  <PinIcon width={18} height={18} className="mt-0.5 shrink-0 text-navy" /> {s.note[lang]}
                </li>
                <li className="flex items-start gap-3">
                  <ClockIcon width={18} height={18} className="mt-0.5 shrink-0 text-navy" /> {t.stores.daily} {site.hours}
                </li>
                <li className="flex items-start gap-3">
                  <PhoneIcon width={18} height={18} className="mt-0.5 shrink-0 text-navy" />
                  <span className="flex flex-col">
                    {site.phones.map((p) => (
                      <a key={p} href={telHref(p)} className="hover:text-navy">
                        {p}
                      </a>
                    ))}
                  </span>
                </li>
              </ul>
              <a href={s.map} target="_blank" rel="noreferrer" className="pill pill-line mt-10">
                {t.stores.route}
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
