import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SeriesBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://primary.jwwb.nl/public/k/z/d/temp-xhlldcgrnxoqlkcsjxbo/copy-of-copy-of-untitled-design-presentation-standard.png"
          alt="Bright Minds Explorers series"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-secondary font-body font-semibold mb-3">
            Children's Book Series
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-background mb-4">
            Bright Minds Explorers
          </h2>
          <p className="font-body text-background/80 leading-relaxed mb-4">
            An interactive universe featuring five core titles. Each story introduces navigating fantastical challenges that reflect STEM, emotional intelligence, and cultural exploration.
          </p>
          <p className="font-body text-background/60 text-sm mb-8">
            Featuring: Nia and the Number Garden · Leo the Lost Language Lion · Zara Builds a Ziggurat · Kai and the Kaleidoscope Compass · Adventures of Pixel & Pen
          </p>
          <Link to="/publications">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body font-semibold px-8 h-12">
              Explore the Series
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}