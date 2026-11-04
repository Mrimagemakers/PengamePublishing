import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Glasses, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Interactive E-Books",
    description: "Digital storytelling that goes beyond traditional reading with multimedia content.",
  },
  {
    icon: Glasses,
    title: "VR & AR Experiences",
    description: "Immersive virtual and augmented reality worlds that bring stories to life.",
  },
  {
    icon: Layers,
    title: "STEM Education",
    description: "Books that transform learning into joyful, story-driven adventures for young minds.",
  },
];

export default function AboutPreview() {
  return (
    <section className="py-20 md:py-28 bg-primary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-body font-semibold mb-3">
              About PenGame Publishing
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Where Storytelling Meets{" "}
              <span className="text-primary italic">Innovation</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Pen Game Publishing is a pioneering publishing company based in Atlanta, Georgia. We combine traditional storytelling with innovative and immersive technologies to create unique digital experiences.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Led by Darnell Clark, with over 20 years of experience in media, marketing, and design, we've redefined how readers experience stories through AR, VR, and interactive content.
            </p>
            <Link to="/about">
              <Button className="bg-primary hover:bg-primary/90 font-body font-semibold">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <div className="space-y-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex gap-5 p-6 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}