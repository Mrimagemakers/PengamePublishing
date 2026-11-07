import React from "react";

// Gold line-art "covers" for each game, drawn in a 300×400 frame.
// Every motif is built from the same pen weight so the shelf reads as one set.
const GOLD = "#F2D27A";
const DIM = "rgba(242,210,122,.35)";

const MOTIFS = {
  road: (
    <>
      <path d="M0 250 H300" stroke={DIM} />
      <path d="M150 250 L40 400 M150 250 L260 400" />
      {[262, 285, 318, 362].map((y, i) => (
        <path key={y} d={`M150 ${y} V${y + 6 + i * 6}`} strokeWidth={2 + i} />
      ))}
      <circle cx="150" cy="210" r="34" stroke={DIM} />
      <path d="M40 250 l30 -40 l25 25 l20 -30 l30 45" stroke={DIM} />
      <path d="M190 250 l25 -35 l20 20 l25 -40 l40 55" stroke={DIM} />
    </>
  ),
  loop: (
    <>
      <path d="M-10 340 C60 340 70 300 110 250 C150 200 160 130 120 120 C80 110 70 190 130 230 C190 270 230 200 310 180" />
      <path d="M-10 352 C62 352 76 310 118 260 C160 210 172 128 122 108 C70 96 58 196 126 242 C196 286 236 214 310 194" stroke={DIM} />
      {[30, 70, 210, 250].map((x) => (
        <path key={x} d={`M${x} ${x < 150 ? 342 : 200} V400`} stroke={DIM} />
      ))}
    </>
  ),
  flight: (
    <>
      <path d="M20 330 C100 320 170 260 270 110" strokeDasharray="2 10" strokeLinecap="round" strokeWidth="3" />
      <path d="M262 92 l18 10 l-34 12 z" fill={GOLD} stroke="none" />
      <path d="M0 330 H300" stroke={DIM} />
      <path d="M40 330 v-14 h40 v14 M150 330 v-22 h22 v22" stroke={DIM} />
      <circle cx="80" cy="120" r="18" stroke={DIM} />
    </>
  ),
  peaks: (
    <>
      <path d="M0 300 L70 190 L110 240 L170 140 L230 230 L260 200 L300 260" />
      <path d="M0 330 C80 310 140 350 300 320" stroke={DIM} />
      <path d="M150 170 l20 -30 l20 30" stroke={DIM} />
      <circle cx="235" cy="110" r="22" />
      <path d="M60 360 l8 -18 l8 18 M90 368 l8 -18 l8 18" stroke={DIM} />
    </>
  ),
  garden: (
    <>
      {[60, 150, 240].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 360 V${250 - i * 20}`} />
          <circle cx={x} cy={238 - i * 20} r="16" />
          <path d={`M${x} ${300 - i * 10} q-24 -10 -30 -30 q24 4 30 30`} stroke={DIM} />
        </g>
      ))}
      <path d="M0 360 H300" stroke={DIM} />
      <text x="150" y="150" textAnchor="middle" fill={DIM} stroke="none" fontSize="54" fontFamily="var(--font-heading)">1 2 3</text>
    </>
  ),
  manor: (
    <>
      <path d="M60 340 V220 L150 150 L240 220 V340" />
      <path d="M130 340 v-50 h40 v50 M90 250 h26 v26 h-26z M184 250 h26 v26 h-26z" stroke={DIM} />
      <path d="M150 150 V112 h22 v18" stroke={DIM} />
      <circle cx="230" cy="90" r="26" />
      <circle cx="242" cy="82" r="22" fill="currentColor" stroke="none" />
      <path d="M0 340 H300" stroke={DIM} />
    </>
  ),
  wave: (
    <>
      {Array.from({ length: 15 }).map((_, i) => {
        const h = 30 + Math.abs(Math.sin(i * 0.9)) * 110;
        return <path key={i} d={`M${38 + i * 16} ${250 - h / 2} V${250 + h / 2}`} strokeLinecap="round" strokeWidth="5" stroke={i % 3 ? GOLD : DIM} />;
      })}
    </>
  ),
  pages: (
    <>
      <path d="M150 330 C120 300 70 300 40 310 V160 C70 150 120 150 150 180 C180 150 230 150 260 160 V310 C230 300 180 300 150 330 Z" />
      <path d="M150 180 V330" stroke={DIM} />
      <path d="M150 180 L110 60 M150 180 L190 60 M150 180 L150 50" stroke={DIM} strokeDasharray="3 7" />
    </>
  ),
  mic: (
    <>
      <rect x="125" y="110" width="50" height="90" rx="25" />
      <path d="M105 180 a45 45 0 0 0 90 0 M150 225 V290 M120 290 h60" />
      {[70, 230].map((x) => (
        <path key={x} d={`M${x} 140 q${x < 150 ? -20 : 20} 30 0 60`} stroke={DIM} />
      ))}
      <path d="M40 340 h220" stroke={DIM} strokeDasharray="10 8" />
    </>
  ),
  porch: (
    <>
      <path d="M40 210 L150 130 L260 210" />
      <path d="M60 210 V330 M240 210 V330 M40 330 H260" />
      <path d="M90 330 V270 M120 330 V270 M180 330 V270 M210 330 V270 M80 270 H220" stroke={DIM} />
      <path d="M20 360 H280 M40 380 H260" stroke={DIM} />
    </>
  ),
  pen: (
    <>
      <path d="M80 330 L210 120 L232 134 L102 344 L74 352 Z" />
      <path d="M210 120 l12 -20 l22 14 l-12 20" stroke={DIM} />
      <path d="M40 300 C90 250 140 360 190 300 S260 260 280 300" stroke={DIM} strokeWidth="6" strokeLinecap="round" />
    </>
  ),
};

export default function GameCover({ game, compact = false }) {
  return (
    <div
      className="relative aspect-[3/4] overflow-hidden rounded-[4px] shadow-[inset_6px_0_0_rgba(0,0,0,.28)]"
      style={{ backgroundColor: game.ground, color: game.ground }}
    >
      <svg
        viewBox="0 0 300 400"
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke={GOLD}
        strokeWidth="2.5"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {MOTIFS[game.motif]}
      </svg>
      <div className="absolute inset-x-0 bottom-0 p-4 pt-16 bg-gradient-to-t from-black/55 to-transparent">
        <p className={`font-heading font-extrabold leading-[0.95] tracking-tight text-[#F2D27A] ${compact ? "text-lg" : "text-2xl"}`}>
          {game.title}
        </p>
      </div>
      {game.rating && (
        <span className="absolute right-3 top-3 rounded-full border border-[#F2D27A]/60 px-2 py-0.5 text-xs font-semibold text-[#F2D27A]">
          {game.rating}
        </span>
      )}
      {game.status === "coming" && (
        <span className="absolute left-3 top-3 rounded-full bg-[#F2D27A] px-2 py-0.5 text-xs font-semibold text-[#0A1730]">
          Coming soon
        </span>
      )}
    </div>
  );
}
