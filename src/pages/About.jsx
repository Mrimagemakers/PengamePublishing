import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Glasses, Layers, Users, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const STATS = [
  { label: "Books Published", value: "10+" },
  { label: "Years of Experience", value: "20+" },
  { label: "Book Series", value: "3" },
  { label: "Tech Platforms", value: "AR/VR" },
];

const VALUES = [
  {
    icon: BookOpen,
    title: "Interactive E-Books",
    description: "Digital storytelling that goes beyond traditional reading with multimedia content and engaging narratives.",
  },
  {
    icon: Glasses,
    title: "VR & AR Experiences",
    description: "Immersive virtual and augmented reality worlds that bring stories to life in previously unimaginable ways.",
  },
  {
    icon: Layers,
    title: "STEM Education",
    description: "Books that transform learning into joyful, story-driven adventures for curious young minds.",
  },
  {
    icon: Users,
    title: "Community Impact",
    description: "Building a global community of readers who experience stories through cutting-edge technology.",
  },
  {
    icon: Award,
    title: "Quality Craftsmanship",
    description: "Every book is meticulously crafted with beautiful illustrations, engaging writing, and immersive tech.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Available worldwide through Amazon, Shopify, and direct ordering from our Atlanta headquarters.",
  },
];

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary font-body font-semibold mb-3">
              Our Story
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              About PenGame Publishing
            </h1>
            <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto">
              Rewriting the future of publishing from Atlanta, Georgia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main about */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Where Storytelling Meets Innovation
              </h2>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  Pen Game Publishing is a pioneering writing company based in the vibrant city of Atlanta, Georgia. We are on a mission to disrupt the digital publishing landscape by delivering cutting-edge, interactive, and immersive reading experiences that captivate and engage our global audience.
                </p>
                <p>
                  At Pen Game Publishing, we combine traditional storytelling with innovative and immersive technologies to create unique digital experiences. Our services include digital storytelling, interactive e-books, and immersive reading experiences that transport our readers into fascinating virtual and augmented reality worlds.
                </p>
                <p>
                  What sets Pen Game Publishing apart from other digital publishing houses is our unwavering commitment to digital reading and media features. We go beyond traditional e-books to provide engaging multimedia content and virtual and augmented reality experiences that bring stories to life in ways that were previously unimaginable.
                </p>
              </div>
            </motion.div>

            {/* About Darnell Clark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10"
            >
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                Meet the Founder
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Darnell Clark is the visionary publisher, author, and creative force behind PenGame Publishing, LLC — a tech-forward multimedia company merging art, storytelling, and immersive technology.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                With over 20 years of experience in media, marketing, and design, Clark has redefined how readers experience stories. His portfolio includes the award-winning Bright Minds Explorers children's book series, the Coloring Odyssey series, and the latest title on emotional intelligence, "Changing the Channel."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Our Innovative Approach
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              We go beyond traditional publishing to create experiences that educate, inspire, and transform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border/50 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Experience the Future of Reading
          </h2>
          <p className="font-body text-primary-foreground/70 mb-8">
            Explore our innovative digital storytelling and immersive reading experiences today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/publications">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body font-semibold px-8 h-12">
                Browse Our Books <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body font-semibold px-8 h-12">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}