import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GameCard } from "@/pages/Games";
import { GAMES } from "@/data/games";

export default function GamesShelf() {
  const featured = GAMES.filter((g) => g.featured).slice(0, 6);
  return (
    <section id="pengame-games" className="bg-[#0A1730] py-20 text-white md:py-28" aria-labelledby="games-shelf-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 id="games-shelf-title" className="font-heading text-4xl font-extrabold leading-none tracking-tight md:text-5xl">
              Play beyond the page
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Our books become worlds you can drive through, ride, and fly over.
            </p>
          </div>
          <Link to="/games" className="inline-flex items-center gap-2 rounded-full border border-[#F2D27A] px-5 py-2.5 font-semibold text-[#F2D27A] transition-colors hover:bg-[#F2D27A] hover:text-[#0A1730] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2D27A]">
            See all {GAMES.length} titles <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        {/* Dark-section overrides for the shared card's token colors */}
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 [&_.text-foreground]:text-white/90 [&_.text-muted-foreground]:text-white/55">
          {featured.map((g) => (
            <GameCard key={g.id} game={g} compact />
          ))}
        </div>
        <div className="mt-6 h-px bg-gradient-to-r from-[#D9A53A] via-[#D9A53A]/40 to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
