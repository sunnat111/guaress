"use client";

import { useEffect, useRef } from "react";

/** Adds .is-visible once in view. variant "unveil" = curtain reveal for images. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "rise",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: "rise" | "unveil";
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      className={`${variant === "unveil" ? "unveil" : "reveal"} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
