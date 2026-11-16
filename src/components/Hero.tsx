"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { useSite } from "./Providers";

/* films produced by scripts/build-media.py; duration in seconds (for the Stories bars) */
// topCrop: the outerwear film has a caption burned in at ~70% height; zoom in from the top to hide it
const FILMS = [
  { name: "park", duration: 28.4, topCrop: false },
  { name: "store", duration: 22.7, topCrop: false },
  { name: "outerwear", duration: 10.3, topCrop: true },
];
const CROP: React.CSSProperties = { height: "150%", objectPosition: "50% 0%" };
// desktop order: outerwear | park (centre) | store
const DESKTOP = [FILMS[2], FILMS[0], FILMS[1]];

export function Hero() {
  const { lang, t } = useSite();
  const [desktop, setDesktop] = useState<boolean | null>(null);
  const [idx, setIdx] = useState(0);
  const mobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (desktop === false) mobileRef.current?.play().catch(() => {});
  }, [idx, desktop]);

  const go = (d: number) => setIdx((i) => (i + d + FILMS.length) % FILMS.length);

  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink text-white">
      {/* desktop: three films side by side */}
      <div className="absolute inset-0 hidden grid-cols-3 gap-px md:grid">
        {DESKTOP.map((f, i) => (
          <div key={f.name} className="photo-box bg-ink">
            {desktop ? (
              <video
                src={asset(`/media/film-${f.name}.mp4`)}
                poster={asset(`/media/film-${f.name}.webp`)}
                autoPlay
                muted
                loop
                playsInline
                preload={i === 1 ? "auto" : "metadata"}
                style={f.topCrop ? CROP : undefined}
              />
            ) : (
              <img src={asset(`/media/film-${f.name}.webp`)} alt="" style={f.topCrop ? CROP : undefined} />
            )}
          </div>
        ))}
      </div>

      {/* mobile: Stories */}
      <div className="absolute inset-0 md:hidden">
        <div className="photo-box h-full bg-ink">
          {desktop === false ? (
            <video
              key={FILMS[idx].name}
              ref={mobileRef}
              src={asset(`/media/film-${FILMS[idx].name}.mp4`)}
              poster={asset(`/media/film-${FILMS[idx].name}.webp`)}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={() => go(1)}
              style={FILMS[idx].topCrop ? CROP : undefined}
            />
          ) : (
            <img src={asset(`/media/film-${FILMS[0].name}.webp`)} alt="" />
          )}
        </div>
        <div className="absolute inset-x-4 z-20 flex gap-1.5" style={{ top: "calc(var(--top-offset) + 10px)" }}>
          {FILMS.map((f, i) => (
            <span key={f.name} className="h-[2px] flex-1 overflow-hidden bg-white/30">
              <span
                key={`${f.name}-${idx}`}
                className={`story-bar block h-full bg-white ${i < idx ? "is-done" : i === idx && desktop === false ? "is-active" : ""}`}
                style={{ animationDuration: `${f.duration}s` }}
              />
            </span>
          ))}
        </div>
        <button className="absolute inset-y-0 left-0 z-10 w-1/4" onClick={() => go(-1)} aria-label={t.hero.prev} />
        <button className="absolute inset-y-0 right-0 z-10 w-1/4" onClick={() => go(1)} aria-label={t.hero.next} />
      </div>

      {/* veil */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,14,24,.55) 0%, rgba(10,14,24,0) 22%), linear-gradient(to top, rgba(10,14,24,.78) 0%, rgba(10,14,24,.25) 45%, rgba(10,14,24,0) 65%)",
        }}
      />

      <div className="rise pointer-events-none absolute inset-x-0 bottom-[8%] z-20 flex flex-col items-center px-6 text-center">
        <p className="label mb-5 text-white/85">{t.hero.season}</p>
        <h1 className="display text-[42px] md:text-[78px]">{t.hero.title}</h1>
        <p className="mt-4 max-w-[440px] text-[14px] font-light leading-relaxed text-white/80 md:text-[15px]">
          {t.hero.text}
        </p>
        <Link href={`/${lang}/obrazlar/`} className="btn btn-white pointer-events-auto mt-8">
          {t.hero.cta}
        </Link>
      </div>
    </section>
  );
}
