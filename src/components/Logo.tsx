import emblem from "@/brand/emblem.svg";
import sail from "@/brand/sail.svg";

type Img = { src: string; width?: number; height?: number };

/** Renders an SVG file as a CSS mask so it takes the current text colour. */
function Mask({ file, ratio, className }: { file: Img; ratio: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`block bg-current ${className ?? ""}`}
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

/** Header / footer lock-up: sail above the serif wordmark. */
export function Logo({ size = "sm" }: { size?: "sm" | "lg" }) {
  const lg = size === "lg";
  return (
    <span className="flex flex-col items-center" aria-label="Guaress">
      <SailMark className={lg ? "h-[44px] md:h-[52px]" : "h-[17px] md:h-[19px]"} />
      <span className={`wordmark ${lg ? "mt-3 text-[30px] md:text-[38px]" : "mt-[3px] text-[15px] md:text-[17px]"}`}>
        Guaress
      </span>
    </span>
  );
}
