type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 44, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pim logo"
      role="img"
    >
      {/* Outer pink ring */}
      <circle cx="50" cy="50" r="48" fill="#FFCFCF" />
      {/* White gap ring */}
      <circle cx="50" cy="50" r="40" fill="#FFFDEC" />
      {/* Inner green circle (placeholder for photo) */}
      <circle cx="50" cy="50" r="36" fill="#86A788" />
    </svg>
  );
}
