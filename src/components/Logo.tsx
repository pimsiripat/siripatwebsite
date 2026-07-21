type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 26, className }: LogoProps) {
  return (
    <span
      className={`font-heading text-fg select-none block ${className ?? ""}`}
      // Nudge up to cancel the descender space "Pim." never uses, so the
      // wordmark sits centered against the taller items in the navbar.
      style={{ fontSize: size, lineHeight: 1, transform: "translateY(-0.03em)" }}
      aria-label="Pim logo"
      role="img"
    >
      Pim<span className="text-accent">.</span>
    </span>
  );
}
