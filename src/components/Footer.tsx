import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { categories } from "@/data/products";
import { site, stores, telHref } from "@/data/site";
import { Logo } from "./Logo";

export function Footer({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-x flex flex-col items-center border-b border-white/12 py-16 md:py-20">
        <Link href={`/${lang}/`} aria-label="Guaress">
          <Logo size="lg" />
        </Link>
        <p className="label mt-5 text-white/55">{t.footer.tagline}</p>
      </div>

      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-4 md:py-14">
        <div>
          <p className="label mb-5">{t.footer.collection}</p>
          <ul className="space-y-2.5 text-[14px] font-light text-white/70">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/${lang}/katalog/?c=${c.slug}`} className="hover:text-white">
                  {c.name[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-5">{t.footer.customers}</p>
          <ul className="space-y-2.5 text-[14px] font-light text-white/70">
            <li>
              <Link href={`/${lang}/obrazlar/`} className="hover:text-white">
                {t.nav.looks}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/dokonlar/`} className="hover:text-white">
                {t.nav.stores}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/sevimlilar/`} className="hover:text-white">
                {t.nav.favorites}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label mb-5">{t.nav.stores}</p>
          <ul className="space-y-2.5 text-[14px] font-light text-white/70">
            {stores.map((s) => (
              <li key={s.slug}>{s.name[lang]}</li>
            ))}
            <li className="pt-1 text-white/50">
              {t.stores.daily} {site.hours}
            </li>
          </ul>
        </div>
        <div>
          <p className="label mb-5">{t.footer.contacts}</p>
          <ul className="space-y-1.5">
            {site.phones.map((p) => (
              <li key={p}>
                <a href={telHref(p)} className="text-[19px] font-light tracking-wide hover:opacity-70">
                  {p}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-5">
            {site.socials.instagram && (
              <a href={site.socials.instagram} className="caps text-[11px] text-white/70 hover:text-white">
                Instagram
              </a>
            )}
            {site.socials.telegramChannel && (
              <a href={site.socials.telegramChannel} className="caps text-[11px] text-white/70 hover:text-white">
                Telegram
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col justify-between gap-2 border-t border-white/12 py-6 text-[12px] font-light text-white/45 md:flex-row">
        <p>
          © 2026 Guaress. {t.footer.rights}
        </p>
        <p className="label text-[10px]">{t.hero.season}</p>
      </div>
    </footer>
  );
}
