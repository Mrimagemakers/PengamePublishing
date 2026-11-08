import React, { useState } from "react";
import { ArrowUpRight, BookOpen, Headset } from "lucide-react";
import GameCover from "@/components/games/GameCover";
import { GAMES, PLATFORMS } from "@/data/games";

const FILTERS = [["all", "Everything"], ...Object.entries(PLATFORMS)];

export function GameCard({ game, compact = false }) {
  const external = { target: "_blank", rel: "noopener noreferrer" };
  return (
    <article className="group flex flex-col">
      <a href={game.url} {...external} className="block rounded-[4px] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-secondary" aria-label={`${game.status === "coming" ? "Learn about" : "Play"} ${game.title}`}>
        <div className="transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none">
          <GameCover game={game} compact={compact} />
        </div>
      </a>
      <div className="mt-4 flex flex-1 flex-col">
        {game.status === "coming" && game.artHasTitle && (
          <span className="mb-2 self-start rounded-full bg-[#F2D27A] px-2 py-0.5 text-xs font-semibold text-[#0A1730]">Coming soon</span>
        )}
        <p className="text-[15px] leading-snug text-foreground">{game.tagline}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {game.platforms.map((p) => PLATFORMS[p]).join(", ")}
        </p>
        {!compact && (
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 text-sm font-semibold">
            <a href={game.url} {...external} className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline">
              {game.urlLabel || (game.platforms.includes("horizon") ? "Open in Horizon" : "Play now")}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            {game.book && (
              <a href={game.book.url} {...external} className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Read {game.book.title}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Games() {
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? GAMES : GAMES.filter((g) => g.platforms.includes(filter));

  return (
    <>
      <section className="bg-[#0A1730] text-white">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-20 md:pt-28">
          <h1 className="max-w-3xl font-heading text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            Games &amp; worlds from our books
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Drive, ride, fly, and learn. Every title opens in your browser, and most step up to a VR headset or your phone’s camera.
          </p>
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter by how you play">
            {FILTERS.map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={filter === key}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2D27A] ${
                  filter === key
                    ? "border-[#F2D27A] bg-[#F2D27A] text-[#0A1730]"
                    : "border-white/25 text-white/85 hover:border-white/60"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-sm text-muted-foreground" aria-live="polite">
            {shown.length} {shown.length === 1 ? "title" : "titles"}
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>

          <aside className="mt-20 flex max-w-2xl gap-4 border-l-2 border-secondary pl-5">
            <Headset className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 className="font-heading text-xl font-bold">Playing in VR</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                On a Meta Quest, open this page in the headset’s browser, pick a game, and tap <em>Enter VR</em> once it loads. Ravenbrook Manor opens in the Horizon Worlds app instead.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
