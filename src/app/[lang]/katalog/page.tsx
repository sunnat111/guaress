import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/CatalogView";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).catalog.title };
}

export default function CatalogPage() {
  return (
    <div className="pt-top">
      <Suspense fallback={<div className="min-h-[80vh]" />}>
        <CatalogView />
      </Suspense>
    </div>
  );
}
