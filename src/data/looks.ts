import type { L10n } from "@/i18n/config";
import { getProduct } from "./products";

/*
  Outfits exactly as the shop published them in Telegram (Fall–Winter 26/27).
  Each item either links to a product, or is a plain line (name + price) when we
  have no usable photo of that piece on its own.
*/

export type LookItem = { product?: string; name?: L10n; price?: number | null };

export type Look = {
  slug: string;
  num: string;
  title: L10n;
  text: L10n;
  photos: string[];
  film?: string;
  items: LookItem[];
};

export const looks: Look[] = [
  {
    slug: "01",
    num: "01",
    title: { uz: "Bordo va grafit", ru: "Бордо и графит" },
    text: {
      uz: "Chuqur va vazmin bordo tus to‘q kulrang, qora va neytral ranglar bilan ayniqsa chiroyli ochiladi. Asosiy urg‘u — poloda.",
      ru: "Глубокий сдержанный бордо особенно гармонично раскрывается с тёмно-серым, чёрным и нейтральными цветами. Главный акцент — на поло.",
    },
    photos: ["p2496", "p2500", "p2495", "p2498", "p2499", "p2497"],
    items: [
      { product: "polo-burgundy" },
      { product: "trousers-charcoal" },
      { name: { uz: "Oyoq kiyim", ru: "Обувь" }, price: 2695000 },
    ],
  },
  {
    slug: "02",
    num: "02",
    title: { uz: "Moviy vazminlik", ru: "Сдержанный синий" },
    text: {
      uz: "To‘q rangdagi dvoyka, oq sviter va obrazni yakunlaydigan oyoq kiyim — kundalik uchrashuvlar va muhim rejalar uchun vazmin tanlov.",
      ru: "Тёмная двойка, белый джемпер и обувь, завершающая образ, — сдержанный выбор для повседневных встреч и важных планов.",
    },
    photos: ["p2504", "p2502", "p2503", "p2505", "p2506", "p2507"],
    items: [
      { product: "dvoyka-navy" },
      { product: "knit-tee-white" },
      { name: { uz: "Oyoq kiyim", ru: "Обувь" }, price: 2675000 },
    ],
  },
  {
    slug: "03",
    num: "03",
    title: { uz: "Kuz ranglari", ru: "Осенние оттенки" },
    text: {
      uz: "Jigarrang polo va kulrang shim — kundalik uchrashuvdan ish kunigacha mos kombinatsiya. Klassik oyoq kiyim bilan jiddiy va ishonchli ko‘rinish.",
      ru: "Коричневое поло и серые брюки — сочетание для встреч и рабочих будней. С классической обувью — уверенный, солидный образ.",
    },
    photos: ["p2509", "p2513", "p2510", "p2511", "p2512", "p2514"],
    items: [{ product: "polo-chocolate" }, { product: "trousers-grey" }, { product: "suede-shoes-brown" }],
  },
  {
    slug: "04",
    num: "04",
    title: { uz: "Kulrang klassika", ru: "Серая классика" },
    text: {
      uz: "Och kulrang kostyum qora trikotaj bilan — rasmiy va erkin uchrashuvlar uchun universal, ham vazmin, ham bejirim obraz.",
      ru: "Светло-серый костюм с чёрным трикотажем — универсальный, сдержанный и элегантный образ для официальных и неформальных встреч.",
    },
    photos: ["p2518", "p2517", "p2520", "p2519", "p2521", "p2522"],
    items: [{ product: "suit-light-grey" }, { product: "knit-tee-black" }, { product: "suede-shoes-black" }],
  },
  {
    slug: "05",
    num: "05",
    title: { uz: "Qora va oq", ru: "Чёрное и белое" },
    text: {
      uz: "Qora kardigan, oq futbolka va qora shim — har qanday vaziyatda jiddiy va o‘ziga ishongan ko‘rinish. Qulay poyabzal lookni to‘ldiradi.",
      ru: "Чёрный кардиган, белая футболка и чёрные брюки — сдержанный и уверенный стиль для любого случая. Удобная обувь завершает образ.",
    },
    photos: ["p2523", "p2524", "p2525", "p2526"],
    items: [
      { product: "cardigan-black" },
      { product: "tee-white" },
      { product: "trousers-black" },
      { product: "leather-sneakers-black" },
    ],
  },
  {
    slug: "06",
    num: "06",
    title: { uz: "Monoxrom", ru: "Монохром" },
    text: {
      uz: "Yumshoq matodan jigarrang sport-casual to‘plam, oq futbolka va mos rangdagi charm krossovka — kundalik qulaylik va bejirim did.",
      ru: "Sport-casual комплект из мягкой коричневой ткани, белая футболка и кожаные кроссовки в тон — комфорт на каждый день и безупречный вкус.",
    },
    photos: ["p2532", "p2530", "p2533", "p2531", "p2534", "p2535"],
    items: [{ product: "sport-set-taupe" }, { product: "tee-white" }, { product: "leather-sneakers-brown" }],
  },
  {
    slug: "07",
    num: "07",
    title: { uz: "Sport-casual", ru: "Sport-casual" },
    text: {
      uz: "Erkinlik va nafislikni o‘zida jamlagan sport-casual obraz — kundalik hayot uchun qulay.",
      ru: "Образ в стиле sport-casual, объединяющий свободу и лаконичность, — комфорт на каждый день.",
    },
    photos: ["p2538", "p2540", "p2539", "p2541"],
    items: [
      { product: "sport-set-navy" },
      { product: "tee-white" },
      { name: { uz: "Oyoq kiyim", ru: "Обувь" }, price: 1795000 },
    ],
  },
  {
    slug: "08",
    num: "08",
    title: { uz: "To‘q tus va kulrang", ru: "Тёмный и серый" },
    text: {
      uz: "To‘q tusdagi qulay to‘plam va och kulrang bazaviy sviter — ishbilarmonlik muhitida ham, dam olishda ham erkin va ishonchli.",
      ru: "Тёмный удобный комплект и базовый светло-серый джемпер — уверенно и непринуждённо и на работе, и на отдыхе.",
    },
    photos: ["p2547", "p2544", "p2545", "p2546"],
    items: [
      { product: "dvoyka-brown" },
      { product: "sweater-light-grey" },
      { name: { uz: "Oyoq kiyim", ru: "Обувь" }, price: 2695000 },
    ],
  },
  {
    slug: "09",
    num: "09",
    title: { uz: "Bog‘da sayr", ru: "Прогулка в парке" },
    text: {
      uz: "Och rangli jundan yengil kurtka, quyuq shokolad tusidagi sviter va to‘g‘ri bichimli shim — shahar bo‘ylab sayr va erkin uchrashuvlar uchun.",
      ru: "Светлая шерстяная куртка, свитер насыщенного шоколадного оттенка и брюки прямого кроя — для прогулок по городу и неформальных встреч.",
    },
    photos: ["v6893-bench", "v6893-close", "v6893-walk", "v6893-shoe", "v6893-back", "v6893-carry"],
    film: "park",
    items: [
      { product: "wool-jacket-light" },
      { product: "sweater-chocolate" },
      { name: { uz: "Shim", ru: "Брюки" }, price: 985000 },
      { product: "suede-buckle-brown" },
    ],
  },
];

export function getLook(slug: string): Look | undefined {
  return looks.find((l) => l.slug === slug);
}

/** Resolve a look item into display data (name, price, link). */
export function resolveItem(item: LookItem) {
  const p = item.product ? getProduct(item.product) : undefined;
  return {
    product: p,
    name: p ? p.name : item.name!,
    price: p ? p.price : (item.price ?? null),
  };
}

export function lookTotal(look: Look): { total: number; complete: boolean } {
  let total = 0;
  let complete = true;
  for (const it of look.items) {
    const { price } = resolveItem(it);
    if (price == null) complete = false;
    else total += price;
  }
  return { total, complete };
}
