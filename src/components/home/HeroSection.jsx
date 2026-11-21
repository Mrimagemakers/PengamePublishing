import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HoloBookStage from "@/components/home/holoBook/HoloBookStage";
import ViewInAR from "@/components/home/holoBook/ViewInAR";

// The page becomes a world: a gold grid that runs to the horizon, with a floating
// 3D book projecting holograms (see holoBook/). The grid draws in once on load
// (disabled for reduced motion via index.css).
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
        .hero-book.opacity-0 { animation: none; }
        @keyframes hero-draw { to { stroke-dashoffset: 0; } }
        @keyframes hero-rise { from { opacity: 0; transform: translateY(25px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .hero-grid path { stroke-dashoffset: 0; } .hero-book { opacity: 1; } .hero-book.opacity-0 { opacity: 0; } }
      `}</style>
      <HorizonArt />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1730] via-[#0A1730]/85 to-transparent md:via-[#0A1730]/60" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-6 md:pt-36 lg:py-40">
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
          <div className="mt-5 empty:hidden">
            <ViewInAR />
          </div>
        </div>
      </div>

      {/* Below the buttons on phones and tablets; the right half of the banner on desktop. */}
      <HoloBookStage className="pointer-events-none relative z-0 mx-auto h-72 w-full max-w-lg sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2 lg:max-w-none" />
    </section>
  );
}
