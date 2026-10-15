import React from 'react';

interface BhattiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightText?: boolean;
}

export const BhattiLogo: React.FC<BhattiLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightText = true,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: { title: 'text-sm font-bold tracking-[0.14em]', sub: 'text-[9px] tracking-[0.26em]' },
    md: { title: 'text-[15px] font-bold tracking-[0.15em]', sub: 'text-[9.5px] tracking-[0.28em]' },
    lg: { title: 'text-xl font-bold tracking-[0.14em]', sub: 'text-xs tracking-[0.28em]' },
    xl: { title: 'text-2xl font-bold tracking-[0.14em]', sub: 'text-sm tracking-[0.28em]' },
  };

  return (
    <div className={`inline-flex items-center gap-2.5 shrink-0 whitespace-nowrap select-none ${className}`}>
      {/* High-Fidelity SVG Emblem matching user's uploaded logo */}
      <svg
        className={`${iconSizes[size]} shrink-0 transition-transform duration-300 group-hover:scale-105`}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Bhatti Real Estate Logo"
      >
        <defs>
          <linearGradient id="towerGradient1" x1="200" y1="50" x2="260" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>

          <linearGradient id="towerGradient2" x1="140" y1="130" x2="220" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>

          <linearGradient id="towerGradient3" x1="280" y1="70" x2="350" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          <linearGradient id="towerGradient4" x1="330" y1="120" x2="370" y2="290" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>

          <linearGradient id="swooshBlue" x1="40" y1="200" x2="440" y2="440" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="40%" stopColor="#0284c7" />
            <stop offset="80%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#00b4d8" />
          </linearGradient>

          <linearGradient id="swooshSilver" x1="160" y1="450" x2="480" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="roofBlue" x1="100" y1="220" x2="360" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>

          <linearGradient id="roofCyan" x1="180" y1="260" x2="280" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Back Skyscraper Tower (Tallest Center-Left) */}
        <polygon points="175,95 240,40 265,55 265,260 175,230" fill="url(#towerGradient1)" />
        <line x1="190" y1="95" x2="190" y2="235" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
        <line x1="205" y1="85" x2="205" y2="240" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
        <line x1="220" y1="75" x2="220" y2="245" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
        <line x1="235" y1="65" x2="235" y2="250" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
        <polygon points="240,40 265,55 265,260 240,250" fill="#034d74" opacity="0.5" />

        {/* Middle Tower (Right of Center) */}
        <polygon points="280,105 320,68 335,80 335,270 280,265" fill="url(#towerGradient3)" />
        <line x1="295" y1="105" x2="295" y2="265" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
        <line x1="308" y1="95" x2="308" y2="265" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
        <polygon points="320,68 335,80 335,270 320,268" fill="#023a59" opacity="0.6" />

        {/* Far Right Tower */}
        <polygon points="335,120 365,100 375,110 375,275 335,270" fill="url(#towerGradient4)" />
        <line x1="345" y1="120" x2="345" y2="272" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
        <line x1="355" y1="115" x2="355" y2="274" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />

        {/* Foreground Modern Building Left */}
        <polygon points="150,145 195,160 195,250 150,230" fill="url(#towerGradient2)" />
        <line x1="165" y1="152" x2="165" y2="235" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
        <line x1="180" y1="158" x2="180" y2="242" stroke="#ffffff" strokeWidth="3" opacity="0.8" />

        {/* Residential Houses - Left House */}
        <polygon points="85,295 145,245 195,285 195,335 85,335" fill="#f8fafc" />
        <polygon points="75,295 145,240 205,290 195,300 145,255 85,302" fill="url(#roofBlue)" />
        <path d="M 132 290 Q 140 280 148 290 L 148 308 L 132 308 Z" fill="#475569" />
        <line x1="140" y1="282" x2="140" y2="308" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="132" y1="298" x2="148" y2="298" stroke="#ffffff" strokeWidth="1.5" />

        {/* Residential Houses - Right House */}
        <polygon points="245,290 305,245 365,290 365,335 245,335" fill="#ffffff" />
        <polygon points="235,290 305,240 375,290 365,300 305,252 245,298" fill="url(#roofBlue)" />
        <path d="M 295 285 Q 305 275 315 285 L 315 305 L 295 305 Z" fill="#475569" />
        <line x1="305" y1="277" x2="305" y2="305" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="295" y1="295" x2="315" y2="295" stroke="#ffffff" strokeWidth="1.5" />

        {/* Residential Houses - Center Front House */}
        <polygon points="160,360 225,305 290,360 290,380 160,380" fill="#f1f5f9" />
        <polygon points="150,360 225,300 300,360 290,370 225,315 160,368" fill="url(#roofCyan)" />
        <path d="M 215 345 Q 225 335 235 345 L 235 365 L 215 365 Z" fill="#334155" />
        <line x1="225" y1="337" x2="225" y2="365" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="215" y1="355" x2="235" y2="355" stroke="#ffffff" strokeWidth="1.5" />

        {/* Primary Dynamic Blue Swoosh Arc */}
        <path
          d="M 50,210 C 25,280 25,360 90,410 C 150,455 240,445 340,385 C 410,340 455,270 470,210 C 420,290 360,340 280,385 C 190,430 110,410 75,360 C 45,315 50,260 50,210 Z"
          fill="url(#swooshBlue)"
        />

        {/* Secondary Silver/Grey Sleek Arc Swirl */}
        <path
          d="M 170,455 C 235,465 310,435 385,385 C 430,350 460,300 475,250 C 445,305 400,355 340,395 C 275,440 215,455 170,455 Z"
          fill="url(#swooshSilver)"
        />
      </svg>

      {/* Brand Typographic Lockup */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-heading uppercase font-bold leading-none ${
              textSizes[size].title
            } ${lightText ? 'text-white' : 'text-slate-900'}`}
          >
            BHATTI
          </span>
          <span
            className={`font-sans uppercase font-semibold text-sky-400 leading-none mt-1 ${
              textSizes[size].sub
            }`}
          >
            REAL ESTATE
          </span>
        </div>
      )}
    </div>
  );
};
