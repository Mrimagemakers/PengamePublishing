import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://primary.jwwb.nl/public/k/z/d/temp-xhlldcgrnxoqlkcsjxbo/chatgpt-image-jun-13-2025-08_38_56-pm-standard-43u660.png"
          alt="PenGame Publishing hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36 lg:py-44">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-secondary text-sm font-body font-medium">New Release — Now Available</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6">
              Rewriting the{" "}
              <span className="text-secondary italic">Future</span>{" "}
              of Publishing
            </h1>

            <p className="text-background/80 font-body text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Where Books Come to Life
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/publications">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body font-semibold text-base px-8 h-12">
                  Browse Our Books
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 font-body font-semibold text-base px-8 h-12">
                  Our Story
                </Button>
              </Link>
              <a href="https://www.pengamepublishing.com/welcome" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 font-body font-semibold text-base px-8 h-12">
                  Home
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}