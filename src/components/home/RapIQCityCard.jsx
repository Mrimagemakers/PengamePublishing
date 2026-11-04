import React from "react";
import { ExternalLink, Headphones, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function RapIQCityCard() {
  return (
    <section className="py-16 md:py-20 bg-foreground text-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 mb-5">
              <Zap className="w-4 h-4 text-secondary" />
              <span className="text-secondary text-sm font-body font-semibold uppercase tracking-wider">Interactive Experience</span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-4 leading-tight">
              Rap IQ City
            </h2>
            <p className="font-heading text-xl text-secondary italic mb-4">
              Where Knowledge Meets the Beat
            </p>
            <p className="font-body text-background/70 leading-relaxed mb-6">
              Step into the ultimate Hip-Hop trivia universe. Battle live players, explore the city, and claim the crown — now available in Meta Horizon Worlds VR.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Headphones, label: "DJ Knowledge Host" },
                { icon: Trophy, label: "Crown Challenges" },
                { icon: Zap, label: "VR / Meta Worlds" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/10 border border-background/20">
                  <item.icon className="w-4 h-4 text-secondary" />
                  <span className="font-body text-sm text-background/80">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="https://claude.ai/public/artifacts/192a190c-d963-4445-aeaa-8d6ec6945248" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body font-semibold px-8 h-12">
                  Play Rap IQ City
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="https://horizon.meta.com/world/10164914942609954/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 font-body font-semibold px-8 h-12">
                  🥽 Play in VR
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-secondary/20 to-primary/10 rounded-3xl p-8 border border-secondary/20">
              <div className="text-center mb-6">
                <div className="text-7xl mb-4">🎙️</div>
                <h3 className="font-heading text-2xl font-bold text-background mb-2">Rap IQ City</h3>
                <Badge className="bg-secondary text-secondary-foreground font-body">Hip-Hop Trivia Universe</Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { emoji: "🏙️", label: "Origins" },
                  { emoji: "🎤", label: "Classics" },
                  { emoji: "💿", label: "90s Era" },
                  { emoji: "🎚️", label: "Producers" },
                  { emoji: "🕺", label: "Culture" },
                  { emoji: "📝", label: "Lyrics" },
                ].map((d) => (
                  <div key={d.label} className="bg-background/10 rounded-xl p-3 text-center border border-background/20 hover:bg-background/20 transition-colors">
                    <div className="text-xl mb-1">{d.emoji}</div>
                    <p className="font-body text-xs text-background/70">{d.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-background/10 rounded-xl p-4 border border-secondary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm text-secondary font-semibold">🏆 This Week's Crown</span>
                  <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-xs">Live</Badge>
                </div>
                <p className="font-body text-xs text-background/60">Score 800+ Beat Coins in All City mode. Tag #RapIQCity to enter.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}