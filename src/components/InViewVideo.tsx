"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { FilmSources } from "./FilmSources";

/** Muted loop that only plays while at least 25% visible. topCrop hides a caption burned into the lower part. */
export function InViewVideo({ name, className = "", topCrop = false }: { name: string; className?: string; topCrop?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className={className}
      poster={asset(`/media/film-${name}.webp`)}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      style={topCrop ? { height: "150%", objectPosition: "50% 0%" } : undefined}
    >
      <FilmSources name={name} />
    </video>
  );
}
