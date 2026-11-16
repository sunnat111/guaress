const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a /public path with the deploy base path (GitHub Pages serves from /guaress). */
export function asset(path: string): string {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export type Photo = { src: string; small: string; srcSet: string };

/** 3:4 photo pair produced by scripts/build-media.py */
export function photo(name: string): Photo {
  const src = asset(`/media/p/${name}.webp`);
  const small = asset(`/media/p/${name}-480.webp`);
  return { src, small, srcSet: `${small} 480w, ${src} 960w` };
}

export function formatPrice(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
