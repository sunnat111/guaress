# Guaress — website MVP

A static, two-language (Uzbek / Russian) storefront for **Guaress®**, a menswear boutique in Tashkent.
Built with Next.js 16 (static export) and Tailwind CSS 4, deployed to GitHub Pages.

Live: https://sunnat111.github.io/guaress/

## What's in the MVP

| Page | Path |
| --- | --- |
| Home: video hero, outfits, new collection, details, outerwear, stylist, boutiques | `/uz/`, `/ru/` |
| Catalog with category tabs, colour filter, sorting, grid density | `/uz/katalog/?c=…` |
| Product: gallery, sizes, "try on in boutique", items from the same outfit | `/uz/katalog/<slug>/` |
| Outfits (Obrazlar) and outfit pages with item list and total | `/uz/obrazlar/`, `/uz/obrazlar/01/` |
| Boutiques: Gulzor, Atlas, High Town Mall | `/uz/dokonlar/` |
| Favourites (saved in the browser) | `/uz/sevimlilar/` |

There is no online checkout. "Butikda kiyib ko‘rish" (try on in boutique) opens a panel where the
customer picks a boutique and size; the request is sent by Telegram (once `site.telegram` is set),
copied as text, or the customer calls.

## Content sources

- Products, prices and outfits: the Guaress Telegram channel, Fall–Winter 26/27 posts (Sep–Nov 2026).
  See `src/data/products.ts` and `src/data/looks.ts`.
- Photos: 42 studio shots from the channel (`source/photos/`) plus stills cut from three channel films.
- Logo: traced from the original logo (`source/logo-original.png`) into `src/brand/sail.svg` and `emblem.svg`.

### Open items for the client

- Prices missing in the posts are shown as "price in the boutique" (`price: null`): light-grey suit, black knit tee,
  black suede shoes, brown leather sneakers.
- Sizes are standard demo ranges; replace with real stock.
- Exact boutique addresses / map pins, Instagram and Telegram links, and the Telegram account that receives
  fitting requests go in `src/data/site.ts` (empty values are hidden in the UI).

## Develop

```bash
npm install
npm run dev          # http://localhost:3000/uz/
npm run build        # static site in out/
```

GitHub Pages serves the site from `/guaress`, so CI builds with `NEXT_PUBLIC_BASE_PATH=/guaress`.

## Media

`scripts/build-media.py` (Pillow + ffmpeg) makes 3:4 WebP pairs (960 and 480 px) in `public/media/p/`,
cuts stills from the films, and encodes the films (720 px, H.264, no audio, faststart) with posters.
The original films (~55 MB) are not committed: put them in `source/video/` to rebuild.

```bash
python3 scripts/build-media.py
```

## Structure

```
src/app/[lang]/        pages (home, katalog, obrazlar, dokonlar, sevimlilar)
src/components/        Header, Hero, ProductCard, CatalogView, ProductView, Overlays, ...
src/data/              products.ts, looks.ts, site.ts
src/i18n/              uz.ts, ru.ts
src/brand/             logo SVGs
scripts/               build-media.py, postbuild.mjs (404 page)
```

Design follows the "quiet luxury" system from the reference teardown (paper / ink / one accent, Jost in
wide-tracked capitals, square buttons, 1.3-stroke icons, slow motion), recoloured with the Guaress navy
and beige taken from the logo.
