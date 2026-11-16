import type { Metadata } from "next";
import { LookCard } from "@/components/LookCard";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { looks } from "@/data/looks";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).looks.title };
}

export default async function LooksPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDict(lang);
  return (
    <div className="pt-top">
      <header className="wrap wrap-max pb-16 pt-12 text-center md:pb-24 md:pt-20">
        <p className="eyebrow">{t.hero.season}</p>
        <h1 className="h-display mt-6 text-[64px] md:text-[132px]">
          <Rich text={t.lux.looksTitle} />
        </h1>
        <p className="text-body mx-auto mt-6 max-w-[520px]">{t.lux.looksText}</p>
      </header>
      <div className="wrap wrap-max grid gap-x-6 gap-y-16 pb-28 sm:grid-cols-2 md:pb-40 lg:grid-cols-3 lg:gap-x-10">
        {looks.map((l, i) => (
          <Reveal key={l.slug} delay={(i % 3) * 0.1} className={i % 3 === 1 ? "lg:mt-24" : i % 3 === 2 ? "lg:mt-10" : ""}>
            <LookCard look={l} lang={lang} ratio={i % 2 ? "aspect-[4/5]" : "aspect-[3/4]"} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
