import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// The page becomes a world: an open book on a gold grid that runs to the horizon.
// The grid draws in once on load (disabled for reduced motion via index.css).
const VP = { x: 880, y: 250 };
const fan = Array.from({ length: 17 }, (_, i) => 280 + i * 75);
const rows = [270, 290, 318, 356, 408, 480, 580];

function HorizonArt() {
  return (
    <svg
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hz-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9A53A" stopOpacity="0" />
          <stop offset="1" stopColor="#D9A53A" stopOpacity=".55" />
        </linearGradient>
        <radialGradient id="hz-glow" cx={VP.x / 1200} cy={VP.y / 640} r=".35">
          <stop offset="0" stopColor="#F2D27A" stopOpacity=".28" />
          <stop offset="1" stopColor="#F2D27A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="640" fill="url(#hz-glow)" />
      <g stroke="url(#hz-fade)" strokeWidth="1.2" fill="none" className="hero-grid">
        {fan.map((x) => (
          <path key={x} d={`M${VP.x} ${VP.y} L${x + (x - VP.x) * 0.9} 640`} pathLength="1" />
        ))}
        {rows.map((y) => (
          <path key={y} d={`M300 ${y} H1200`} pathLength="1" />
        ))}
      </g>
      <path d={`M300 ${VP.y} H1200`} stroke="#F2D27A" strokeOpacity=".5" />
      {/* Open book in the foreground */}
      <g transform="translate(880 520)" fill="none" stroke="#F2D27A" strokeWidth="2.5" strokeLinejoin="round" className="hero-book">
        <path d="M0 40 C-50 10 -130 10 -190 30 V-60 C-130 -80 -50 -80 0 -40 C50 -80 130 -80 190 -60 V30 C130 10 50 10 0 40 Z" fill="#0A1730" />
        <path d="M0 -40 V40" />
        <path d="M-160 -40 C-110 -55 -50 -50 -20 -28 M-160 -15 C-110 -30 -50 -25 -20 -5 M20 -28 C50 -50 110 -55 160 -40 M20 -5 C50 -25 110 -30 160 -15" strokeOpacity=".45" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A1730] text-white">
      <style>{`
        .hero-grid path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hero-draw 1.8s cubic-bezier(.2,.7,.2,1) forwards; }
        .hero-grid path:nth-child(odd) { animation-delay: .15s; }
        .hero-book { opacity: 0; animation: hero-rise .9s .9s ease-out forwards; }
        @keyframes hero-draw { to { stroke-dashoffset: 0; } }
        @keyframes hero-rise { from { opacity: 0; transform: translate(880px, 545px); } to { opacity: 1; transform: translate(880px, 520px); } }
        @media (prefers-reduced-motion: reduce) { .hero-grid path { stroke-dashoffset: 0; } .hero-book { opacity: 1; } }
      `}</style>
      <HorizonArt />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1730] via-[#0A1730]/85 to-transparent md:via-[#0A1730]/60" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36 lg:py-40">
        <div className="max-w-2xl">
          <h1 className="font-heading text-5xl font-extrabold leading-[0.92] tracking-[-0.03em] sm:text-6xl lg:text-[5.5rem]">
            Books you can read, play, and step inside.
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/75 md:text-xl">
            PenGame Publishing makes children’s STEM books, coloring books, and leadership titles in Atlanta, then turns them into games and VR worlds.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/publications"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#D9A53A] px-7 font-semibold text-[#0A1730] transition-colors hover:bg-[#F2D27A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2D27A]"
            >
              Browse the books <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              to="/games"
              className="inline-flex h-12 items-center rounded-full border border-white/35 px-7 font-semibold transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2D27A]"
            >
              Play the games
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
