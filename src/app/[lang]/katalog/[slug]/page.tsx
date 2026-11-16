import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductRail } from "@/components/ProductRail";
import { ProductView } from "@/components/ProductView";
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
  const fromLook = look
    ? look.items.map((i) => (i.product ? getProduct(i.product) : undefined)).filter((x): x is NonNullable<typeof x> => !!x && x.slug !== p.slug)
    : [];
  const cat = getCategory(p.category)!;
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug);

  return (
    <div className="pt-top">
      <ProductView p={p} />

      {look && fromLook.length > 0 && (
        <section className="border-t border-line py-16 md:py-24">
          <div className="container-x mb-8 flex items-end justify-between gap-6 md:mb-10">
            <div>
              <p className="label mb-3 text-muted">
                {t.looks.look} {look.num}
              </p>
              <h2 className="display text-[28px] md:text-[40px]">{t.product.fromLook}</h2>
            </div>
            <Link href={`/${lang}/obrazlar/${look.slug}/`} className="caps link-line mb-1 shrink-0 text-[11px]">
              {t.product.seeLook}
            </Link>
          </div>
          <ProductRail items={fromLook} />
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-line py-16 md:py-24">
          <div className="container-x mb-8 flex items-end justify-between gap-6 md:mb-10">
            <h2 className="display text-[28px] md:text-[40px]">{cat.name[lang]}</h2>
            <Link href={`/${lang}/katalog/?c=${cat.slug}`} className="caps link-line mb-1 shrink-0 text-[11px]">
              {t.home.viewAll}
            </Link>
          </div>
          <ProductRail items={related} />
        </section>
      )}
    </div>
  );
}
