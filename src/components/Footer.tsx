import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { categories } from "@/data/products";
import { site, stores, telHref } from "@/data/site";
import { Emblem, Wave } from "./Logo";
import { Rich } from "./Rich";

export function Footer({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const col = "text-[13.5px] text-slate transition-colors hover:text-navy";
  return (
    <footer className="relative overflow-hidden bg-pearl">
      <Wave className="h-10 w-full text-gold/60" />
      <div className="wrap wrap-max pt-14 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Emblem className="h-14 text-navy" />
            <p className="h-title mt-6 max-w-[380px] text-[32px] md:text-[40px]">
              <Rich text={t.lux.footerLine} />
            </p>
            <div className="mt-8 space-y-1">
              {site.phones.map((p) => (
                <a key={p} href={telHref(p)} className="serif block text-[24px] font-light hover:text-navy">
                  {p}
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="eyebrow plain mb-5">{t.footer.collection}</p>
              <ul className="space-y-3">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${lang}/katalog/?c=${c.slug}`} className={col}>
                      {c.name[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow plain mb-5">{t.footer.customers}</p>
              <ul className="space-y-3">
                <li>
                  <Link href={`/${lang}/obrazlar/`} className={col}>
                    {t.nav.looks}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/dokonlar/`} className={col}>
                    {t.nav.stores}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/sevimlilar/`} className={col}>
                    {t.nav.favorites}
                  </Link>
                </li>
                {site.socials.instagram && (
                  <li>
                    <a href={site.socials.instagram} className={col}>
                      Instagram
                    </a>
                  </li>
                )}
                {site.socials.telegramChannel && (
                  <li>
                    <a href={site.socials.telegramChannel} className={col}>
                      Telegram
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <p className="eyebrow plain mb-5">{t.nav.stores}</p>
              <ul className="space-y-3">
                {stores.map((s) => (
                  <li key={s.slug}>
                    <a href={s.map} target="_blank" rel="noreferrer" className={col}>
                      {s.name[lang]}
                    </a>
                  </li>
                ))}
                <li className="text-[13px] text-mist">
                  {t.stores.daily} {site.hours}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p
        aria-hidden
        className="wordmark pointer-events-none mt-16 select-none whitespace-nowrap text-center text-[19vw] font-light leading-[0.78] tracking-[0.08em] text-navy/[0.07] md:mt-20"
      >
        Guaress
      </p>

      <div className="wrap wrap-max flex flex-col justify-between gap-2 border-t border-hair py-6 text-[12px] text-mist md:flex-row">
        <p>© 2026 Guaress®. {t.footer.rights}</p>
        <p>{t.hero.season}</p>
      </div>
    </footer>
  );
}
