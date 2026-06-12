// Logo uses HTML spans for text (SVG <text> has font loading race conditions)
// and a custom SVG icon mark only for the graphic

function IconMark({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      {/* Rounded square background with gradient */}
      <rect width="40" height="40" rx="10" fill="url(#bg)"/>

      {/* Bar chart — 3 ascending bars (salary data visual) */}
      {/* Bar 1 — short */}
      <rect x="6"  y="24" width="7" height="10" rx="2" fill="white" opacity="0.55"/>
      {/* Bar 2 — medium */}
      <rect x="16.5" y="17" width="7" height="17" rx="2" fill="white" opacity="0.8"/>
      {/* Bar 3 — tallest */}
      <rect x="27" y="10" width="7" height="24" rx="2" fill="white"/>

      {/* Dollar coin on top of tallest bar */}
      <circle cx="30.5" cy="9" r="5.5" fill="url(#coinGrad)"/>
      <text
        x="30.5"
        y="12.5"
        textAnchor="middle"
        fontSize="7"
        fontWeight="900"
        fontFamily="system-ui, sans-serif"
        fill="white"
      >$</text>

      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6E7FF3"/>
          <stop offset="100%" stopColor="#3D4ED4"/>
        </linearGradient>
        <linearGradient id="coinGrad" x1="0" y1="0" x2="11" y2="11" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#10B981"/>
          <stop offset="100%" stopColor="#059669"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Logo({ size = 32, dark = false }) {
  const textColor  = dark ? '#1C2536' : '#FFFFFF'
  const accentColor = '#5B6BF8'
  const fontSize   = Math.round(size * 0.6)

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Math.round(size * 0.28) + 'px',
        lineHeight: 1,
      }}
    >
      <IconMark size={size} />
      <span
        style={{
          fontFamily: "'Syne', 'Inter', system-ui, sans-serif",
          fontWeight: 800,
          fontSize: fontSize + 'px',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: textColor,
          userSelect: 'none',
        }}
      >
        Pay<span style={{ color: accentColor }}>Peek</span>
      </span>
    </div>
  )
}

export function LogoMark({ size = 32 }) {
  return <IconMark size={size} />
}
