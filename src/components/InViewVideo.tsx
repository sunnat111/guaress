"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/** Muted loop that only plays while at least 25% visible. */
export function InViewVideo({ name, className = "" }: { name: string; className?: string }) {
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
      src={asset(`/media/film-${name}.mp4`)}
      poster={asset(`/media/film-${name}.webp`)}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
