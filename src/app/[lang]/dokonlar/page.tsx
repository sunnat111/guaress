import type { Metadata } from "next";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { InViewVideo } from "@/components/InViewVideo";
import { Reveal } from "@/components/Reveal";
import { ReserveButton } from "@/components/ReserveButton";
import { Rich } from "@/components/Rich";
import { site, stores, telHref } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { photo } from "@/lib/asset";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).stores.title };
}

export default async function StoresPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDict(lang);
  const sign = photo("v7101-sign");
  return (
    <div className="pt-top">
      <section className="wrap wrap-max grid gap-12 pb-20 pt-10 md:pb-28 md:pt-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="eyebrow">{t.home.storesLabel}</p>
          <h1 className="h-display mt-6 text-[60px] md:text-[104px]">
            <Rich text={t.lux.storesTitle} />
          </h1>
          <p className="text-body mt-6 max-w-[480px]">{t.stores.text}</p>
          <ReserveButton intent={{}} label={t.lux.book} className="pill pill-navy mt-10" />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-6 lg:gap-5">
          <div className="media arch aspect-[3/5]">
            <img src={sign.src} srcSet={sign.srcSet} sizes="(min-width: 1024px) 25vw, 50vw" alt="Guaress" />
          </div>
          <div className="media arch mt-16 aspect-[3/5] bg-ink">
            <InViewVideo name="store" />
          </div>
        </div>
      </section>

      <section className="bg-pearl py-20 md:py-28">
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
