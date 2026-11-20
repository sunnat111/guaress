import emblem from "@/brand/emblem.svg";
import sail from "@/brand/sail.svg";

type Img = { src: string };

/** Renders an SVG file as a CSS mask so it takes the current text colour. */
function Mask({ file, ratio, className }: { file: Img; ratio: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`block shrink-0 bg-current ${className ?? ""}`}
      style={{
        aspectRatio: ratio,
        maskImage: `url(${file.src})`,
        WebkitMaskImage: `url(${file.src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

export function SailMark({ className }: { className?: string }) {
  return <Mask file={sail as Img} ratio="333 / 374" className={className} />;
}

export function Emblem({ className }: { className?: string }) {
  return <Mask file={emblem as Img} ratio="1 / 1" className={className} />;
}

/** Horizontal lock-up: emblem + serif wordmark. */
export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`flex items-center gap-3 ${className}`} aria-label="Guaress">
      <Emblem className={`h-[30px] transition-colors duration-700 md:h-[34px] ${light ? "text-white" : "text-navy"}`} />
      <span className="wordmark text-[17px] md:text-[19px]">Guaress</span>
    </span>
  );
}

/** Thin wave line drawn after the logo's waves. */
export function Wave({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M0 26 C 150 6, 300 6, 450 22 S 750 40, 900 20 S 1110 4, 1200 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M120 32 C 280 16, 420 18, 560 30 S 860 38, 1000 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
