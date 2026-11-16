import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LookShowcase } from "@/components/LookShowcase";
import { ProductRail } from "@/components/ProductRail";
import { ProductView } from "@/components/ProductView";
import { Rich } from "@/components/Rich";
import { getLook } from "@/data/looks";
import { getCategory, getProduct, products } from "@/data/products";
import { locales, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { asset, photo } from "@/lib/asset";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name[lang],
    description: p.description[lang],
    openGraph: { images: [photo(p.photos[0]).src] },
    alternates: { languages: { uz: asset(`/uz/katalog/${slug}/`), ru: asset(`/ru/katalog/${slug}/`) } },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const t = getDict(lang);
  const look = p.look ? getLook(p.look) : undefined;
  const cat = getCategory(p.category)!;
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug);

  return (
    <div className="pt-top">
      <ProductView p={p} />

      {look && (
        <section className="mt-20 bg-pearl py-20 md:mt-28 md:py-28">
          <div className="wrap wrap-max">
            <LookShowcase slug={look.slug} eyebrow={`${t.product.fromLook} · ${t.lux.look} ${look.num}`} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className={`py-20 md:py-28 ${look ? "" : "mt-12 border-t border-hair"}`}>
          <div className="wrap wrap-max mb-10 flex items-end justify-between gap-6 md:mb-14">
            <h2 className="h-title text-[36px] md:text-[52px]">
              <Rich text={`*${cat.name[lang]}*`} />
            </h2>
            <Link href={`/${lang}/katalog/?c=${cat.slug}`} className="link-arrow mb-2 shrink-0">
              {t.home.viewAll} <span className="arrow-line" />
            </Link>
          </div>
          <div className="wrap-max">
            <ProductRail items={related} />
          </div>
        </section>
      )}
    </div>
  );
}
