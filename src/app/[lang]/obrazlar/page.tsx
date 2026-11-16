import type { Metadata } from "next";
import { LookCard } from "@/components/LookCard";
import { Reveal } from "@/components/Reveal";
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
      <header className="container-x py-16 text-center md:py-24">
        <p className="label text-muted">{t.hero.season}</p>
        <h1 className="display mt-4 text-[48px] md:text-[104px]">{t.looks.title}</h1>
        <p className="lead mx-auto mt-5 max-w-[520px]">{t.looks.text}</p>
      </header>
      <div className="container-x grid grid-cols-1 gap-x-4 gap-y-14 pb-24 sm:grid-cols-2 md:pb-32 lg:grid-cols-3">
        {looks.map((l, i) => (
          <Reveal key={l.slug} delay={(i % 3) * 0.08}>
            <LookCard look={l} lang={lang} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
