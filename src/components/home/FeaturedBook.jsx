import React from "react";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function FeaturedBook() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 flex justify-center">
              <img
                src="https://pengamepublishing.myshopify.com/cdn/shop/files/nvrqqwn-front-shortedge-384.jpg?v=1774910216&width=533"
                alt="Changing the Channel book cover"
                className="w-64 md:w-72 rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-4 font-body">
              <Star className="w-3 h-3 mr-1" /> New Release
            </Badge>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Changing the Channel
            </h2>
            <p className="font-heading text-xl text-muted-foreground italic mb-6">
              The 10 Golden Rules of Emotional Intelligence
            </p>

            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Emotional intelligence is no longer optional — it's a competitive advantage. This book explores how mastering your internal dialogue directly impacts leadership, decision-making, and long-term success.
            </p>

            <ul className="space-y-3 mb-8">
              {["Improve self-awareness", "Lead with clarity and control", "Strengthen professional relationships", "Build a practical framework for growth"].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 mb-8">
              <span className="font-heading text-3xl font-bold text-primary">$24.99</span>
              <span className="font-body text-lg text-muted-foreground line-through">$29.99</span>
              <Badge className="bg-destructive/10 text-destructive border-destructive/20 font-body">Sale</Badge>
            </div>

            <a
              href="https://pengamepublishing.myshopify.com/products/changing-the-channel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 font-body font-semibold text-base px-8 h-12">
                Order Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}