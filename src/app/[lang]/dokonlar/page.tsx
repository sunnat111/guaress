import type { Metadata } from "next";
import { ArrowRight, ClockIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { InViewVideo } from "@/components/InViewVideo";
import { Reveal } from "@/components/Reveal";
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
  const a = photo("v7101-sign");
  return (
    <div className="pt-top">
      <header className="container-x py-16 md:py-24">
        <p className="label text-muted">{t.home.storesLabel}</p>
        <h1 className="display mt-4 text-[48px] md:text-[96px]">{t.stores.title}</h1>
        <p className="lead mt-5 max-w-[520px]">{t.stores.text}</p>
      </header>

      <div className="container-x grid gap-4 md:grid-cols-2">
        <div className="photo-box aspect-[3/4]">
          <img src={a.src} srcSet={a.srcSet} sizes="(min-width: 768px) 50vw, 100vw" alt="Guaress" />
        </div>
        <div className="photo-box aspect-[3/4] bg-black">
          <InViewVideo name="store" />
        </div>
      </div>

      <div className="container-x grid gap-x-4 py-16 md:grid-cols-3 md:py-24">
        {stores.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.08} className="border-t border-ink py-8">
            <p className="num text-[56px] text-navy">0{i + 1}</p>
            <h2 className="display mt-4 text-[26px] md:text-[30px]">{s.name[lang]}</h2>
            <ul className="mt-6 space-y-3 text-[14px] font-light text-muted">
              <li className="flex items-start gap-3">
                <PinIcon width={18} height={18} className="mt-0.5 shrink-0" /> {s.note[lang]}
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon width={18} height={18} className="mt-0.5 shrink-0" /> {t.stores.daily} {site.hours}
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon width={18} height={18} className="mt-0.5 shrink-0" />
                <span className="flex flex-col">
                  {site.phones.map((p) => (
                    <a key={p} href={telHref(p)} className="hover:text-ink">
                      {p}
                    </a>
                  ))}
                </span>
              </li>
            </ul>
            <a href={s.map} target="_blank" rel="noreferrer" className="btn btn-dark mt-8 w-full justify-between">
              {t.stores.route} <ArrowRight width={28} />
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
