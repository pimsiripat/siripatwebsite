type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 32, className }: LogoProps) {
  return (
    <span
      className={`font-heading text-fg select-none ${className ?? ""}`}
      style={{ fontSize: size * 0.65, lineHeight: 1 }}
      aria-label="Pim logo"
      role="img"
    >
      Pim<span className="text-accent">.</span>
    </span>
  );
}
