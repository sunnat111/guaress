import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Overlays } from "@/components/Overlays";
import { Providers } from "@/components/Providers";
import { isLocale, locales } from "@/i18n/config";
import { getDict } from "@/i18n";
import { asset } from "@/lib/asset";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sunnat111.github.io"),
    title: { default: t.meta.title, template: "%s — Guaress" },
    description: t.meta.description,
    icons: { icon: asset("/icon.svg") },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      images: [asset("/media/og.jpg")],
      locale: lang === "ru" ? "ru_RU" : "uz_UZ",
      type: "website",
    },
    alternates: { languages: { uz: asset("/uz/"), ru: asset("/ru/") } },
  };
}

export const viewport: Viewport = { themeColor: "#092e66" };

// show the promo bar before hydration unless it was closed in this session
const promoScript = `try{if(sessionStorage.getItem("gs-promo-closed")!=="1")document.documentElement.classList.add("has-promo")}catch(e){document.documentElement.classList.add("has-promo")}`;

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: promoScript }} />
      </head>
      <body>
        <Providers lang={lang}>
          <Header />
          <main>{children}</main>
          <Footer lang={lang} />
          <Overlays />
        </Providers>
      </body>
    </html>
  );
}
