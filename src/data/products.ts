import type { L10n } from "@/i18n/config";

/*
  Catalogue for the MVP.
  Names, prices and outfit compositions come from the Guaress Telegram channel
  (Fall–Winter 26/27 posts, Sep–Nov 2026). Photos are the channel's studio shots
  and stills cut from its films (see scripts/build-media.py).

  price: null  -> the post gave no price; the site shows "price in the boutique".
  sizes        -> standard demo ranges; replace with real stock when the client sends it.
*/

export type CategorySlug = "ustki-kiyim" | "dvoyka" | "trikotaj" | "shimlar" | "sport-casual" | "poyabzal";

export type Category = { slug: CategorySlug; name: L10n; cover: string };

export const categories: Category[] = [
  { slug: "ustki-kiyim", name: { uz: "Ustki kiyim", ru: "Верхняя одежда" }, cover: "v7101-quilted-1" },
  { slug: "dvoyka", name: { uz: "Dvoyka va kostyum", ru: "Двойки и костюмы" }, cover: "p2518" },
  { slug: "trikotaj", name: { uz: "Trikotaj", ru: "Трикотаж" }, cover: "p2513" },
  { slug: "shimlar", name: { uz: "Shimlar", ru: "Брюки" }, cover: "p2514" },
  { slug: "sport-casual", name: { uz: "Sport-casual", ru: "Sport-casual" }, cover: "p2532" },
  { slug: "poyabzal", name: { uz: "Poyabzal", ru: "Обувь" }, cover: "p2512" },
];

export type Colour = { slug: string; name: L10n; hex: string };

export const colours: Record<string, Colour> = {
  navy: { slug: "navy", name: { uz: "To‘q moviy", ru: "Тёмно-синий" }, hex: "#1d2840" },
  black: { slug: "black", name: { uz: "Qora", ru: "Чёрный" }, hex: "#161616" },
  white: { slug: "white", name: { uz: "Oq", ru: "Белый" }, hex: "#f4f2ee" },
  burgundy: { slug: "burgundy", name: { uz: "Bordo", ru: "Бордовый" }, hex: "#5e1a2a" },
  chocolate: { slug: "chocolate", name: { uz: "Shokolad", ru: "Шоколадный" }, hex: "#4a2c22" },
  brown: { slug: "brown", name: { uz: "Jigarrang", ru: "Коричневый" }, hex: "#3d2b24" },
  grey: { slug: "grey", name: { uz: "Kulrang", ru: "Серый" }, hex: "#8a8a88" },
  graphite: { slug: "graphite", name: { uz: "Grafit", ru: "Графит" }, hex: "#3b3c3e" },
  taupe: { slug: "taupe", name: { uz: "Taup", ru: "Тауп" }, hex: "#7d7266" },
  beige: { slug: "beige", name: { uz: "Bej", ru: "Бежевый" }, hex: "#b9ab98" },
  plum: { slug: "plum", name: { uz: "Baqlajon", ru: "Баклажан" }, hex: "#3a2630" },
};

const SIZES_TOP = ["S", "M", "L", "XL", "XXL"];
const SIZES_TROUSERS = ["46", "48", "50", "52", "54"];
const SIZES_SHOES = ["39", "40", "41", "42", "43", "44"];

export type Product = {
  slug: string;
  name: L10n;
  category: CategorySlug;
  price: number | null;
  colour: keyof typeof colours;
  photos: string[];
  sizes: string[];
  description: L10n;
  details: L10n[];
  look?: string;
  isNew?: boolean;
};

export const products: Product[] = [
  /* ---------------- outerwear (outerwear film, post 2548: "Kurtka — 2 975 000") ---------------- */
  {
    slug: "field-jacket-navy",
    name: { uz: "Field jacket, to‘q moviy", ru: "Field jacket, тёмно-синий" },
    category: "ustki-kiyim",
    price: 2975000,
    colour: "navy",
    photos: ["v7101-navy-1", "v7101-navy-2"],
    sizes: SIZES_TOP,
    isNew: true,
    description: {
      uz: "Tik yoqali, ko‘krak cho‘ntaklari bor field jacket. Qalin mato shamoldan himoya qiladi, klassik shim bilan ham, jinsi bilan ham mos tushadi.",
      ru: "Field jacket со стойкой и нагрудными карманами. Плотная ткань защищает от ветра, куртка одинаково хорошо сочетается с классическими брюками и джинсами.",
    },
    details: [
      { uz: "Tik yoqa, yashirin zamok", ru: "Воротник-стойка, скрытая молния" },
      { uz: "To‘rtta tashqi cho‘ntak", ru: "Четыре накладных кармана" },
    ],
  },
  {
    slug: "quilted-jacket-brown",
    name: { uz: "Quilted jacket, to‘q jigarrang", ru: "Стёганая куртка, тёмно-коричневая" },
    category: "ustki-kiyim",
    price: 2975000,
    colour: "brown",
    photos: ["v7101-quilted-1", "v7101-quilted-2"],
    sizes: SIZES_TOP,
    isNew: true,
    description: {
      uz: "Kapyushonli qavima kurtka — sovuq kunlar uchun yengil va iliq. Vazmin rang kundalik va ishbilarmonlik obraziga mos.",
      ru: "Стёганая куртка с капюшоном — лёгкая и тёплая для холодных дней. Сдержанный оттенок подходит и к повседневному, и к деловому образу.",
    },
    details: [
      { uz: "Qavima to‘ldirgich", ru: "Стёганый утеплитель" },
      { uz: "Kapyushon, zamok", ru: "Капюшон, молния" },
    ],
  },
  {
    slug: "hooded-jacket-graphite",
    name: { uz: "Kapyushonli kurtka, grafit", ru: "Куртка с капюшоном, графит" },
    category: "ustki-kiyim",
    price: 2975000,
    colour: "graphite",
    photos: ["v7101-graphite-1", "v7101-graphite-2"],
    sizes: SIZES_TOP,
    description: {
      uz: "Shamoldan himoya qiluvchi zich matoli kurtka. Kapyushon va tik yoqa — shahar uchun amaliy tanlov.",
      ru: "Куртка из плотной ветрозащитной ткани. Капюшон и стойка — практичный выбор для города.",
    },
    details: [
      { uz: "Shamoldan himoya qiluvchi mato", ru: "Ветрозащитная ткань" },
      { uz: "Kapyushon, zamok", ru: "Капюшон, молния" },
    ],
  },
  {
    slug: "hooded-jacket-beige",
    name: { uz: "Kapyushonli kurtka, bej", ru: "Куртка с капюшоном, бежевая" },
    category: "ustki-kiyim",
    price: 2975000,
    colour: "beige",
    photos: ["v7101-beige-1", "v7101-beige-2"],
    sizes: SIZES_TOP,
    description: {
      uz: "Och rangli yengil kurtka — oq futbolka va to‘q shim bilan toza, zamonaviy obraz yaratadi.",
      ru: "Светлая лёгкая куртка — с белой футболкой и тёмными брюками даёт чистый современный образ.",
    },
    details: [
      { uz: "Yengil, shamoldan himoya qiladi", ru: "Лёгкая, защищает от ветра" },
      { uz: "Kapyushon, zamok", ru: "Капюшон, молния" },
    ],
  },
  {
    slug: "wool-jacket-light",
    name: { uz: "Jun kurtka, och bej", ru: "Шерстяная куртка, светло-бежевая" },
    category: "ustki-kiyim",
    price: 2975000,
    colour: "beige",
    photos: ["v6893-bench", "v6893-close", "v6893-back", "v6893-carry"],
    sizes: SIZES_TOP,
    look: "09",
    isNew: true,
    description: {
      uz: "Och rangli jundan tikilgan yengil kurtka. Shokolad tusidagi sviter va to‘g‘ri bichimli shim bilan shahar bo‘ylab sayr va erkin uchrashuvlar uchun.",
      ru: "Лёгкая куртка из светлой шерсти. Со свитером шоколадного оттенка и брюками прямого кроя — для прогулок по городу и неформальных встреч.",
    },
    details: [
      { uz: "Jun aralash mato", ru: "Ткань с шерстью" },
      { uz: "Ko‘krak cho‘ntaklari, tugma", ru: "Нагрудные карманы, пуговицы" },
    ],
  },

  /* ---------------- two-pieces & suits ---------------- */
  {
    slug: "dvoyka-navy",
    name: { uz: "Zamokli dvoyka, to‘q moviy", ru: "Двойка на молнии, тёмно-синяя" },
    category: "dvoyka",
    price: 3695000,
    colour: "navy",
    photos: ["p2504", "p2502", "p2506", "p2507", "p2505"],
    sizes: SIZES_TOP,
    look: "02",
    isNew: true,
    description: {
      uz: "Chuqur moviy tusdagi kurtka va shim to‘plami. Aniq siluet va ortiqcha detallarsiz — kundalik uchrashuvlardan muhim tadbirlargacha.",
      ru: "Комплект из куртки и брюк глубокого синего оттенка. Чёткий силуэт без лишних деталей — от повседневных встреч до важных событий.",
    },
    details: [
      { uz: "Kurtka va shim to‘plami", ru: "Комплект: куртка и брюки" },
      { uz: "Tik yoqa, zamok", ru: "Воротник-стойка, молния" },
    ],
  },
  {
    slug: "suit-light-grey",
    name: { uz: "Kostyum, och kulrang", ru: "Костюм, светло-серый" },
    category: "dvoyka",
    price: null,
    colour: "grey",
    photos: ["p2518", "p2520", "p2522", "p2517", "p2519"],
    sizes: SIZES_TOP,
    look: "04",
    description: {
      uz: "Och kulrang kostyum — rasmiy va erkin uchrashuvlar uchun universal tanlov. Qora trikotaj futbolka bilan vazmin va bejirim obraz.",
      ru: "Светло-серый костюм — универсальный выбор для официальных и неформальных встреч. С чёрной трикотажной футболкой — сдержанно и элегантно.",
    },
    details: [
      { uz: "Pidjak va shim", ru: "Пиджак и брюки" },
      { uz: "Melanj mato", ru: "Меланжевая ткань" },
    ],
  },
  {
    slug: "dvoyka-brown",
    name: { uz: "Dvoyka, to‘q jigarrang", ru: "Двойка, тёмно-коричневая" },
    category: "dvoyka",
    price: 3495000,
    colour: "brown",
    photos: ["p2547", "p2545", "p2544", "p2546"],
    sizes: SIZES_TOP,
    look: "08",
    isNew: true,
    description: {
      uz: "To‘q tusdagi qulay to‘plam. Och kulrang bazaviy sviter bilan — ish muhitida ham, dam olishda ham erkin va ishonchli.",
      ru: "Удобный комплект глубокого оттенка. С базовым светло-серым джемпером — уверенно и непринуждённо и на работе, и на отдыхе.",
    },
    details: [
      { uz: "Kurtka va shim to‘plami", ru: "Комплект: куртка и брюки" },
      { uz: "Tik yoqa, zamok", ru: "Воротник-стойка, молния" },
    ],
  },

  /* ---------------- knitwear & tees ---------------- */
  {
    slug: "polo-burgundy",
    name: { uz: "Trikotaj polo, bordo", ru: "Трикотажное поло, бордовое" },
    category: "trikotaj",
    price: 895000,
    colour: "burgundy",
    photos: ["p2496", "p2498", "p2497", "p2500", "p2495", "p2499"],
    sizes: SIZES_TOP,
    look: "01",
    isNew: true,
    description: {
      uz: "Mavsumning asosiy rangi — chuqur bordo. Uzun yengli trikotaj polo to‘q kulrang shim va qora detallar bilan vazmin ochiladi.",
      ru: "Главный цвет сезона — глубокий бордо. Трикотажное поло с длинным рукавом сдержанно раскрывается с тёмно-серыми брюками и чёрными деталями.",
    },
    details: [
      { uz: "Yengda tikilgan Guaress yozuvi", ru: "Вышивка Guaress на манжете" },
      { uz: "Uzun yeng, polo yoqa", ru: "Длинный рукав, воротник поло" },
    ],
  },
  {
    slug: "polo-chocolate",
    name: { uz: "Trikotaj polo, shokolad", ru: "Трикотажное поло, шоколадное" },
    category: "trikotaj",
    price: 1295000,
    colour: "chocolate",
    photos: ["p2513", "p2509", "p2510", "p2511", "p2514"],
    sizes: SIZES_TOP,
    look: "03",
    description: {
      uz: "Jigarrang trikotaj polo va kulrang shim — ish kunidan kundalik uchrashuvgacha mos vazmin kombinatsiya.",
      ru: "Коричневое трикотажное поло и серые брюки — сдержанное сочетание для рабочих будней и повседневных встреч.",
    },
    details: [
      { uz: "Yengda tikilgan Guaress yozuvi", ru: "Вышивка Guaress на манжете" },
      { uz: "Yumshoq trikotaj", ru: "Мягкий трикотаж" },
    ],
  },
  {
    slug: "knit-tee-white",
    name: { uz: "Trikotaj futbolka, oq", ru: "Трикотажная футболка, белая" },
    category: "trikotaj",
    price: 1295000,
    colour: "white",
    photos: ["p2503", "p2505"],
    sizes: SIZES_TOP,
    look: "02",
    description: {
      uz: "Zich trikotajdan qisqa yengli oq sviter. To‘q dvoyka ostida obrazga toza va yorug‘ urg‘u beradi.",
      ru: "Белый джемпер с коротким рукавом из плотного трикотажа. Под тёмной двойкой даёт образу чистый светлый акцент.",
    },
    details: [{ uz: "Zich trikotaj, dumaloq yoqa", ru: "Плотный трикотаж, круглый вырез" }],
  },
  {
    slug: "knit-tee-black",
    name: { uz: "Trikotaj futbolka, qora", ru: "Трикотажная футболка, чёрная" },
    category: "trikotaj",
    price: null,
    colour: "black",
    photos: ["p2519", "p2517"],
    sizes: SIZES_TOP,
    look: "04",
    description: {
      uz: "Qora trikotaj futbolka — och kulrang kostyum bilan vodolazkaga yengil muqobil.",
      ru: "Чёрная трикотажная футболка — лёгкая альтернатива водолазке под светло-серый костюм.",
    },
    details: [{ uz: "Zich trikotaj, dumaloq yoqa", ru: "Плотный трикотаж, круглый вырез" }],
  },
  {
    slug: "cardigan-black",
    name: { uz: "Zamokli kardigan, qora", ru: "Кардиган на молнии, чёрный" },
    category: "trikotaj",
    price: 1595000,
    colour: "black",
    photos: ["p2524", "p2523", "p2525"],
    sizes: SIZES_TOP,
    look: "05",
    isNew: true,
    description: {
      uz: "Qora kardigan, oq futbolka va qora shim — har qanday vaziyatda jiddiy va o‘ziga ishongan ko‘rinish.",
      ru: "Чёрный кардиган, белая футболка и чёрные брюки — сдержанный и уверенный образ для любого случая.",
    },
    details: [{ uz: "Tik yoqa, zamok", ru: "Воротник-стойка, молния" }],
  },
  {
    slug: "tee-white",
    name: { uz: "Futbolka, oq", ru: "Футболка, белая" },
    category: "trikotaj",
    price: 595000,
    colour: "white",
    photos: ["p2524", "p2539"],
    sizes: SIZES_TOP,
    look: "05",
    description: {
      uz: "Bazaviy oq futbolka — kardigan, sport-casual to‘plam va kurtkalar ostida.",
      ru: "Базовая белая футболка — под кардиган, sport-casual комплект и куртки.",
    },
    details: [{ uz: "Paxta", ru: "Хлопок" }],
  },
  {
    slug: "sweater-light-grey",
    name: { uz: "Bazaviy sviter, och kulrang", ru: "Базовый джемпер, светло-серый" },
    category: "trikotaj",
    price: 1295000,
    colour: "grey",
    photos: ["p2545", "p2547"],
    sizes: SIZES_TOP,
    look: "08",
    description: {
      uz: "Och kulrang bazaviy sviter — to‘q tusli to‘plam va kurtkalar bilan oson uyg‘unlashadi.",
      ru: "Базовый светло-серый джемпер — легко сочетается с тёмными комплектами и куртками.",
    },
    details: [{ uz: "Yumshoq trikotaj, dumaloq yoqa", ru: "Мягкий трикотаж, круглый вырез" }],
  },
  {
    slug: "sweater-chocolate",
    name: { uz: "Sviter, shokolad", ru: "Свитер, шоколадный" },
    category: "trikotaj",
    price: 1295000,
    colour: "chocolate",
    photos: ["v6893-walk", "v6893-cuff"],
    sizes: SIZES_TOP,
    look: "09",
    description: {
      uz: "Quyuq shokolad tusidagi sviter — och rangli kurtka ostida iliq va boy rang.",
      ru: "Свитер насыщенного шоколадного оттенка — тёплый глубокий цвет под светлую куртку.",
    },
    details: [{ uz: "Yumshoq trikotaj", ru: "Мягкий трикотаж" }],
  },

  /* ---------------- trousers ---------------- */
  {
    slug: "trousers-charcoal",
    name: { uz: "Klassik shim, to‘q kulrang", ru: "Классические брюки, тёмно-серые" },
    category: "shimlar",
    price: 985000,
    colour: "graphite",
    photos: ["p2499", "p2495", "p2500"],
    sizes: SIZES_TROUSERS,
    look: "01",
    description: {
      uz: "To‘g‘ri bichimli to‘q kulrang shim — bordo polo va qora detallar uchun vazmin asos.",
      ru: "Тёмно-серые брюки прямого кроя — сдержанная база для бордового поло и чёрных деталей.",
    },
    details: [{ uz: "To‘g‘ri bichim", ru: "Прямой крой" }],
  },
  {
    slug: "trousers-grey",
    name: { uz: "Klassik shim, kulrang", ru: "Классические брюки, серые" },
    category: "shimlar",
    price: 985000,
    colour: "grey",
    photos: ["p2514", "p2512", "p2511"],
    sizes: SIZES_TROUSERS,
    look: "03",
    description: {
      uz: "Kulrang klassika — ko‘ylak, polo va pidjaklar bilan kundalik va rasmiy obrazlar uchun.",
      ru: "Серая классика — с рубашками, поло и пиджаками для повседневных и деловых образов.",
    },
    details: [{ uz: "To‘g‘ri bichim", ru: "Прямой крой" }],
  },
  {
    slug: "trousers-black",
    name: { uz: "Shim, qora", ru: "Брюки, чёрные" },
    category: "shimlar",
    price: 895000,
    colour: "black",
    photos: ["p2525", "p2523"],
    sizes: SIZES_TROUSERS,
    look: "05",
    description: {
      uz: "Qora shim — kardigan va oq futbolka bilan to‘liq qora-oq obraz.",
      ru: "Чёрные брюки — с кардиганом и белой футболкой для цельного чёрно-белого образа.",
    },
    details: [{ uz: "To‘g‘ri bichim", ru: "Прямой крой" }],
  },

  /* ---------------- sport-casual (posts 2538, 2550: "Sportivka — 1 795 000") ---------------- */
  {
    slug: "sport-set-navy",
    name: { uz: "Sport-casual to‘plam, to‘q moviy", ru: "Sport-casual комплект, тёмно-синий" },
    category: "sport-casual",
    price: 1795000,
    colour: "navy",
    photos: ["p2538", "p2540", "p2539", "p2541", "v2550-navy-1"],
    sizes: SIZES_TOP,
    look: "07",
    isNew: true,
    description: {
      uz: "Erkinlik va nafislikni jamlagan sport-casual to‘plam. Sifatli mato, tanaga qulay bichim va vazmin rang.",
      ru: "Sport-casual комплект, объединяющий свободу и лаконичность. Качественная ткань, удобная посадка и сдержанный цвет.",
    },
    details: [
      { uz: "Olimpiyka va shim", ru: "Олимпийка и брюки" },
      { uz: "Ko‘krakda brend belgisi", ru: "Логотип на груди" },
    ],
  },
  {
    slug: "sport-set-taupe",
    name: { uz: "Sport-casual to‘plam, taup", ru: "Sport-casual комплект, тауп" },
    category: "sport-casual",
    price: 1795000,
    colour: "taupe",
    photos: ["p2532", "p2530", "p2531", "p2533", "p2534"],
    sizes: SIZES_TOP,
    look: "06",
    description: {
      uz: "Yumshoq matodan monoxrom to‘plam — harakat erkinligi va yengillik. Oq futbolka va charm krossovka bilan.",
      ru: "Монохромный комплект из мягкой ткани — лёгкость и свобода движений. С белой футболкой и кожаными кроссовками.",
    },
    details: [
      { uz: "Olimpiyka va shim", ru: "Олимпийка и брюки" },
      { uz: "Ko‘krakda brend belgisi", ru: "Логотип на груди" },
    ],
  },
  {
    slug: "sport-set-plum",
    name: { uz: "Sport-casual to‘plam, baqlajon", ru: "Sport-casual комплект, баклажан" },
    category: "sport-casual",
    price: 1795000,
    colour: "plum",
    photos: ["v2550-plum-1", "v2550-plum-2"],
    sizes: SIZES_TOP,
    isNew: true,
    description: {
      uz: "Kundalik faol hayot uchun to‘plam: tanaga qulay o‘tiradi, chuqur rang esa obrazni oddiy sport kiyimidan ajratib turadi.",
      ru: "Комплект для активного ритма каждого дня: удобная посадка, а глубокий цвет отличает образ от обычной спортивной одежды.",
    },
    details: [{ uz: "Olimpiyka va shim", ru: "Олимпийка и брюки" }],
  },
  {
    slug: "sport-set-black",
    name: { uz: "Sport-casual to‘plam, qora", ru: "Sport-casual комплект, чёрный" },
    category: "sport-casual",
    price: 1795000,
    colour: "black",
    photos: ["v2550-black-1", "v2550-black-2"],
    sizes: SIZES_TOP,
    description: {
      uz: "Qora sport-casual to‘plam — oq futbolka va klassik tufli bilan ham yarashadi.",
      ru: "Чёрный sport-casual комплект — хорошо смотрится даже с белой футболкой и классическими туфлями.",
    },
    details: [{ uz: "Olimpiyka va shim", ru: "Олимпийка и брюки" }],
  },

  /* ---------------- shoes ---------------- */
  {
    slug: "suede-shoes-brown",
    name: { uz: "Zamsh tufli, jigarrang", ru: "Замшевые туфли, коричневые" },
    category: "poyabzal",
    price: 1975000,
    colour: "brown",
    photos: ["p2512", "p2509"],
    sizes: SIZES_SHOES,
    look: "03",
    description: {
      uz: "Klassik zamsh tufli — shokolad polo va kulrang shim obrazini yakunlaydi.",
      ru: "Классические замшевые туфли — завершают образ с шоколадным поло и серыми брюками.",
    },
    details: [{ uz: "Tabiiy zamsh", ru: "Натуральная замша" }],
  },
  {
    slug: "suede-shoes-black",
    name: { uz: "Zamsh tufli, qora", ru: "Замшевые туфли, чёрные" },
    category: "poyabzal",
    price: null,
    colour: "black",
    photos: ["p2521", "p2522"],
    sizes: SIZES_SHOES,
    look: "04",
    description: {
      uz: "Qora zamsh tufli qalin taglik bilan — och kulrang kostyumga zamonaviy urg‘u.",
      ru: "Чёрные замшевые туфли на объёмной подошве — современный акцент к светло-серому костюму.",
    },
    details: [{ uz: "Tabiiy zamsh", ru: "Натуральная замша" }],
  },
  {
    slug: "suede-buckle-brown",
    name: { uz: "Qisqichli zamsh poyabzal", ru: "Замшевая обувь с пряжкой" },
    category: "poyabzal",
    price: 2495000,
    colour: "brown",
    photos: ["v6893-shoe", "v6893-walk"],
    sizes: SIZES_SHOES,
    look: "09",
    description: {
      uz: "Zamonaviy zamsh poyabzal — butun obrazni mustahkam uyg‘unlik bilan yakunlaydi.",
      ru: "Современная замшевая обувь — гармонично завершает весь образ.",
    },
    details: [{ uz: "Tabiiy zamsh, ergonomik taglik", ru: "Натуральная замша, эргономичная подошва" }],
  },
  {
    slug: "leather-sneakers-black",
    name: { uz: "Charm krossovka, qora", ru: "Кожаные кроссовки, чёрные" },
    category: "poyabzal",
    price: 2495000,
    colour: "black",
    photos: ["p2526", "p2523"],
    sizes: SIZES_SHOES,
    look: "05",
    description: {
      uz: "Oq taglikli qora charm krossovka — kardigan va klassik shim bilan ham, sport-casual bilan ham.",
      ru: "Чёрные кожаные кроссовки на белой подошве — и с кардиганом и брюками, и с sport-casual.",
    },
    details: [{ uz: "Tabiiy charm", ru: "Натуральная кожа" }],
  },
  {
    slug: "leather-sneakers-brown",
    name: { uz: "Charm krossovka, jigarrang", ru: "Кожаные кроссовки, коричневые" },
    category: "poyabzal",
    price: null,
    colour: "brown",
    photos: ["p2535", "p2532"],
    sizes: SIZES_SHOES,
    look: "06",
    description: {
      uz: "Mos rangdagi charm krossovka — monoxrom sport-casual to‘plamni a’lo darajada yakunlaydi.",
      ru: "Кожаные кроссовки в тон — идеально завершают монохромный sport-casual комплект.",
    },
    details: [{ uz: "Tabiiy charm", ru: "Натуральная кожа" }],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function countIn(category: CategorySlug): number {
  return products.filter((p) => p.category === category).length;
}
