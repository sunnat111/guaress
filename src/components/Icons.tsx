import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: P) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const MenuIcon = (p: P) => (
  <Base {...p}>
    <path d="M3 8.5h18M3 15.5h18" />
  </Base>
);
export const SearchIcon = (p: P) => (
  <Base {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5" />
  </Base>
);
export const BookmarkIcon = ({ filled, ...p }: P & { filled?: boolean }) => (
  <Base {...p}>
    <path d="M6.5 3.5h11v17l-5.5-4-5.5 4z" fill={filled ? "currentColor" : "none"} />
  </Base>
);
export const CloseIcon = (p: P) => (
  <Base {...p}>
    <path d="M5 5l14 14M19 5 5 19" />
  </Base>
);
export const ChevronDown = (p: P) => (
  <Base {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </Base>
);
export const ChevronLeft = (p: P) => (
  <Base {...p}>
    <path d="m14.5 6-6 6 6 6" />
  </Base>
);
export const ChevronRight = (p: P) => (
  <Base {...p}>
    <path d="m9.5 6 6 6-6 6" />
  </Base>
);
export const ArrowRight = (p: P) => (
  <svg width="40" height="14" viewBox="0 0 40 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" {...p}>
    <path d="M0 7h38M32 1l6 6-6 6" />
  </svg>
);
export const PlusIcon = (p: P) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);
export const MinusIcon = (p: P) => (
  <Base {...p}>
    <path d="M5 12h14" />
  </Base>
);
export const PinIcon = (p: P) => (
  <Base {...p}>
    <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.8" r="2.3" />
  </Base>
);
export const ClockIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);
export const PhoneIcon = (p: P) => (
  <Base {...p}>
    <path d="M5.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 7.2 7.2l1.3-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3.5 5.5a2 2 0 0 1 2-2z" />
  </Base>
);
export const TelegramIcon = (p: P) => (
  <Base {...p}>
    <path d="M21 4 3 11l6 2.2M21 4l-3 16-6.5-5M21 4 9 13.2m0 0V19l2.5-4" />
  </Base>
);
export const CopyIcon = (p: P) => (
  <Base {...p}>
    <rect x="8.5" y="8.5" width="11" height="11" />
    <path d="M15.5 8.5v-4h-11v11h4" />
  </Base>
);
export const CheckIcon = (p: P) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);
export const PlayIcon = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M8 5.5v13l10.5-6.5z" />
  </svg>
);
export const GridIcon = ({ n, ...p }: P & { n: number }) => {
  const w = 18 / n;
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={3 + i * w + 0.6} y="5" width={w - 1.6} height="14" />
      ))}
    </svg>
  );
};
