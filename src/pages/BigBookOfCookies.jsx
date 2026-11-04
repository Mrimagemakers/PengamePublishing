import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, ChefHat, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CHAPTERS = [
  { num: 1, title: "Classic Cookies", color: "#8B4513", emoji: "🍪", count: 8, desc: "Timeless favorites — chocolate chip, oatmeal raisin, snickerdoodles" },
  { num: 2, title: "Chocolate Lovers", color: "#5C2008", emoji: "🍫", count: 8, desc: "Double chocolate, brownie cookies, cocoa bliss" },
  { num: 3, title: "Brownies & Bars", color: "#2C1404", emoji: "🟫", count: 8, desc: "Fudgy brownies, blondies, lemon bars, and more" },
  { num: 4, title: "Nutty Delights", color: "#C08040", emoji: "🥜", count: 7, desc: "Peanut butter, almond, pecan & walnut creations" },
  { num: 5, title: "Holiday Specials", color: "#D4A017", emoji: "🎄", count: 8, desc: "Gingerbread, peppermint, eggnog & festive favorites" },
  { num: 6, title: "International Treats", color: "#4A7C3F", emoji: "🌍", count: 7, desc: "Biscotti, alfajores, speculoos & global traditions" },
  { num: 7, title: "No-Bake Wonders", color: "#003060", emoji: "❄️", count: 7, desc: "Haystack cookies, rum balls, energy bites" },
  { num: 8, title: "Stuffed & Filled", color: "#8B4513", emoji: "🫙", count: 8, desc: "Oreo-stuffed, jam-filled, caramel surprise cookies" },
  { num: 9, title: "Bakery Style", color: "#E8621A", emoji: "🥐", count: 8, desc: "Thick, chewy, cafe-quality showstoppers" },
  { num: 10, title: "Special Diet", color: "#4A7C3F", emoji: "🌱", count: 7, desc: "Gluten-free, vegan, keto & allergen-friendly options" },
  { num: 11, title: "Fruity & Citrus", color: "#D4A017", emoji: "🍋", count: 8, desc: "Lemon, orange, raspberry, cranberry & tropical" },
  { num: 12, title: "Spiced & Warm", color: "#8B4513", emoji: "🌶️", count: 7, desc: "Cinnamon, cardamom, chai & warming spice blends" },
  { num: 13, title: "Cheesecake Cookies", color: "#C08040", emoji: "🧀", count: 7, desc: "Cream cheese-based creations with velvety texture" },
  { num: 14, title: "Sandwich Cookies", color: "#5C2008", emoji: "🥪", count: 7, desc: "Homemade cookie sandwiches with dreamy fillings" },
  { num: 15, title: "Brownie Hybrids", color: "#2C1404", emoji: "🔀", count: 8, desc: "Brookies, blondie bars & hybrid cookie creations" },
  { num: 16, title: "Vol 2 Premium", color: "#1A4A2A", emoji: "⭐", count: 8, desc: "Elevated recipes — bakery exclusives & chef secrets", isNew: true },
  { num: 17, title: "Vol 2 Seasonal", color: "#1A4A2A", emoji: "🍂", count: 8, desc: "Fall, winter, spring & summer seasonal specialties", isNew: true },
  { num: 18, title: "Vol 3 — New Classics", color: "#003060", emoji: "🔥", count: 8, desc: "Bold new takes on beloved classics", isVol3: true },
  { num: 19, title: "Vol 3 — Global Fusion", color: "#003060", emoji: "🌐", count: 8, desc: "International flavors meets American cookie culture", isVol3: true },
  { num: 20, title: "Vol 3 — Showstoppers", color: "#003060", emoji: "🏆", count: 9, desc: "Competition-ready, over-the-top stunning cookies", isVol3: true },
];

const STATS = [
  { value: "150", label: "Recipes" },
  { value: "20", label: "Chapters" },
  { value: "50", label: "Vol 3 New" },
  { value: "3", label: "Volumes" },
];

const BAKER_TIPS = [
  { emoji: "🧈", title: "Room Temp Butter", desc: "Always use softened butter for perfect cookie texture — not melted, not cold." },
  { emoji: "⚖️", title: "Weigh Ingredients", desc: "Use a kitchen scale for consistent results, especially flour and sugar." },
  { emoji: "❄️", title: "Chill Your Dough", desc: "Refrigerate cookie dough 30+ minutes for thicker, chewier results." },
  { emoji: "🍪", title: "Underbake Slightly", desc: "Pull cookies 2 minutes early — they finish cooking on the hot pan." },
  { emoji: "🧂", title: "Salt on Top", desc: "A pinch of flaky sea salt on top transforms every cookie." },
  { emoji: "🥚", title: "Extra Yolk", desc: "Swap one whole egg for two yolks for a richer, fudgier cookie." },
];

export default function BigBookOfCookies() {
  const [activeChapter, setActiveChapter] = useState(null);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] bg-[#1A0902] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003060] border border-[#a0d4ff]/30 mb-6">
              <span className="text-[#a0d4ff] text-sm font-body font-semibold">🔥 Volume 3 Just Added — 50 More Recipes!</span>
            </div>

            <p className="font-body text-[#D4A017] text-xs uppercase tracking-[0.25em] mb-3">PenGame Publishing, LLC — Atlanta, Georgia</p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-2">
              Our Big<br />Book of
              <span className="text-[#F0C040] italic block">Cookies</span>
            </h1>
            <p className="font-heading text-2xl text-[#D4A017] mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
              by Darnell Clark
            </p>

            <p className="font-body text-white/70 text-lg leading-relaxed mb-6 max-w-md">
              The ultimate cookie and brownie collection — 150 recipes across 20 chapters, from timeless classics to bakery-style showstoppers.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8 pb-6 border-b border-[#D4A017]/20">
              {STATS.map((s) => (
                <div key={s.label}>
                  <span className="font-heading text-3xl font-black text-[#F0C040] block">{s.value}</span>
                  <span className="font-body text-xs uppercase tracking-wider text-white/40">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#chapters" onClick={(e) => { e.preventDefault(); document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <Button size="lg" className="bg-[#D4A017] hover:bg-[#F0C040] text-[#1A0902] font-body font-bold px-8 h-12 rounded-full">
                  <BookOpen className="w-5 h-5 mr-2" /> All 150 Recipes
                </Button>
              </a>
              <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-[#D4A017]/40 text-[#D4A017] hover:bg-[#D4A017]/10 font-body font-bold px-8 h-12 rounded-full">
                  Get the Book
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Book visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-80 md:w-72 md:h-96 bg-gradient-to-br from-[#8B4513] to-[#2C1404] rounded-2xl shadow-2xl flex flex-col items-center justify-center border-4 border-[#D4A017]/40 rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="text-6xl mb-4">🍪</div>
                <h3 className="font-heading text-xl font-bold text-[#F0C040] text-center px-4 mb-2">Our Big Book of Cookies</h3>
                <p className="font-body text-sm text-[#D4A017]/80 text-center px-4">150 Recipes · 20 Chapters</p>
                <div className="mt-4 px-4 py-2 rounded-full bg-[#D4A017] text-[#1A0902] font-body text-xs font-bold">by Darnell Clark</div>
              </div>
              <div className="absolute -top-3 -right-3 w-20 h-20 rounded-full bg-gradient-to-br from-[#D4A017] to-[#E8621A] flex flex-col items-center justify-center text-[#1A0902] shadow-lg">
                <span className="font-body text-xs font-bold">150</span>
                <span className="font-body text-[9px] font-bold leading-none">RECIPES</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#2C1404] py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="font-heading text-3xl font-black text-[#F0C040]">{s.value}</p>
                <p className="font-body text-xs uppercase tracking-wider text-white/40 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section id="chapters" className="py-20 md:py-28 bg-[#FDF6EC]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-[#E8621A] font-bold mb-2">20 Chapters · 150 Recipes</p>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-[#1A0902] mb-3">All Chapter Collections</h2>
            <p className="font-body text-[#8B4513] max-w-xl mx-auto">From timeless classics to global traditions — every cookie style covered across three volumes.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHAPTERS.map((ch, i) => (
              <motion.div
                key={ch.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setActiveChapter(activeChapter === ch.num ? null : ch.num)}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#EDD5A3]/50 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                style={{ borderTop: `4px solid ${ch.color}` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{ch.emoji}</span>
                  <div className="flex gap-1 flex-col items-end">
                    <span className="font-body text-xs font-bold text-[#E8621A] uppercase tracking-wider">Ch. {ch.num}</span>
                    {ch.isVol3 && <Badge className="text-[9px] bg-[#003060] text-white border-0 px-1.5 py-0">Vol 3</Badge>}
                    {ch.isNew && <Badge className="text-[9px] bg-[#1A4A2A] text-white border-0 px-1.5 py-0">New</Badge>}
                  </div>
                </div>
                <h3 className="font-heading text-sm font-bold text-[#1A0902] mb-1">{ch.title}</h3>
                <p className="font-body text-xs text-[#8B4513] leading-relaxed">{ch.desc}</p>
                <div className="mt-3 pt-3 border-t border-[#EDD5A3] flex justify-between items-center">
                  <span className="font-body text-xs text-[#C08040] font-bold">{ch.count} recipes</span>
                  <ChefHat className="w-3.5 h-3.5 text-[#E8621A]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Baker's Tips */}
      <section className="py-20 md:py-28 bg-[#1A0902]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-[#D4A017] font-bold mb-2">Pro Baker Secrets</p>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-white mb-3">Baker's Tips</h2>
            <p className="font-body text-white/60 max-w-xl mx-auto">Essential techniques from Darnell Clark to elevate every batch.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BAKER_TIPS.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-[#D4A017]/15 rounded-2xl p-6 hover:bg-white/10 hover:border-[#D4A017]/40 transition-all"
              >
                <div className="text-3xl mb-3">{tip.emoji}</div>
                <h3 className="font-heading text-base font-bold text-[#F0C040] mb-2">{tip.title}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#5C2008] to-[#2C1404]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-5xl mb-6">🍪</div>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-white mb-4">
              The Art of Baking — Page by Page
            </h2>
            <p className="font-body text-white/70 leading-relaxed mb-4">
              Created by Darnell Clark of PenGame Publishing, this collection is the definitive guide to cookie perfection — from soft and chewy classics to bakery-style showstoppers across three volumes and 150 unique recipes.
            </p>
            <p className="font-body text-[#D4A017] mb-8">📍 Atlanta, Georgia · Info@pengamepublishing.com</p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://pengamepublishing.myshopify.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#D4A017] hover:bg-[#F0C040] text-[#1A0902] font-body font-bold px-10 h-12 rounded-full">
                  Order Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}