import React from "react";
import { Link } from "react-router-dom";
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
                src="/images/nia-number-garden-deluxe.webp" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://pengamepublishing.myshopify.com/cdn/shop/files/Nia_the_Number_Garden.png?v=1748740547&width=533"; }}
                alt="Nia and the Number Garden: Deluxe Edition official cover"
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
              <Star className="w-3 h-3 mr-1" /> Featured Children’s Book
            </Badge>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Nia and the Number Garden
            </h2>
            <p className="font-heading text-xl text-muted-foreground italic mb-6">
              Deluxe Edition
            </p>

            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Meet Nia and discover an imaginative STEM learning adventure where counting, problem-solving, and storytelling come together. The Deluxe Edition connects the book with interactive digital experiences.
            </p>

            <ul className="space-y-3 mb-8">
              {["Discover counting and early math concepts", "Explore a magical learning garden", "Meet Nia and her Bright Minds friends", "Continue learning in Nia’s virtual world"].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            \n\n            <a
              href="https://niasnumbergarden.shop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 font-body font-semibold text-base px-8 h-12">
                Explore Nia Deluxe
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}