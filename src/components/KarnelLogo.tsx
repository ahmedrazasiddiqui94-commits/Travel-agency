interface KarnelLogoProps {
  variant?: 'light' | 'dark';
  iconOnly?: boolean;
}

export function KarnelLogo({ variant = 'light', iconOnly = false }: KarnelLogoProps) {
  const isDark = variant === 'dark';

  return (
    <span className="inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0">
      <svg
        width={iconOnly ? 34 : 30}
        height={iconOnly ? 34 : 30}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Rounded Obsidian / Lime Emblem Frame */}
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="9"
          fill={isDark ? '#C7F000' : '#111111'}
          stroke={isDark ? '#C7F000' : '#111111'}
          strokeWidth="1.5"
        />

        {/* Stylized Karakoram Peak + Geometric K */}
        <path
          d="M11 25V11M11 19.5L21.5 11M15.5 16L24 25"
          stroke={isDark ? '#111111' : '#F5F2EA'}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neon-Lime Flight Arc & Waypoint Dot */}
        <path
          d="M8.5 13.5C13.5 8.5 22.5 8 27 12"
          stroke={isDark ? '#111111' : '#C7F000'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="27" cy="12" r="2.2" fill={isDark ? '#111111' : '#C7F000'} />
      </svg>

      {!iconOnly && (
        <span
          className={`font-display text-base sm:text-lg font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-[#111111]'
          }`}
        >
          KARNEL TRAVELS
        </span>
      )}
    </span>
  );
}
