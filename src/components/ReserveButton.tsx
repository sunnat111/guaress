"use client";

import { useSite, type ReserveIntent } from "./Providers";

export function ReserveButton({ intent, label, className = "pill pill-navy" }: { intent: ReserveIntent; label: string; className?: string }) {
  const { openReserve } = useSite();
  return (
    <button onClick={() => openReserve(intent)} className={className}>
      {label}
    </button>
  );
}
