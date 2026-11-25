"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import { FilmSources } from "./FilmSources";

/**
 * Full-bleed background film. Phones get the vertical film (`film`), wider
 * screens a landscape band of it (`film-wide`). Posters show until it plays.
 */
export function HeroVideo({ film = "park" }: { film?: string }) {
  const [wide, setWide] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-aspect-ratio: 4/5)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const name = wide ? `${film}-wide` : film;
  return (
    <div className="absolute inset-0 bg-ink" aria-hidden="true">
      {/* posters: CSS picks the right one before JS runs */}
      <img src={asset(`/media/film-${film}.webp`)} alt="" className="absolute inset-0 h-full w-full object-cover [@media(min-aspect-ratio:4/5)]:hidden" />
      <img src={asset(`/media/film-${film}-wide.webp`)} alt="" className="absolute inset-0 hidden h-full w-full object-cover [@media(min-aspect-ratio:4/5)]:block" />
      {wide !== null && (
        <video
          key={name}
          poster={asset(`/media/film-${name}.webp`)}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <FilmSources name={name} />
        </video>
      )}
    </div>
  );
}
