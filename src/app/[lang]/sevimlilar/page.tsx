import type { Metadata } from "next";
import { FavoritesView } from "@/components/FavoritesView";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).favorites.title, robots: { index: false } };
}

export default function FavoritesPage() {
  return (
    <div className="pt-top">
      <FavoritesView />
    </div>
  );
}
