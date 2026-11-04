import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, BookOpen, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Comprehensive Curriculum",
    description: "Engaging courses based on '7 Ways to Success' into a 12-week Leadership Certification curriculum.",
  },
  {
    icon: Award,
    title: "Expert Guidance",
    description: "Coaching from Darnell E. Clark and expert instructors to guide your success.",
  },
  {
    icon: Presentation,
    title: "Live Workshops & Coaching",
    description: "Weekly live workshops, coaching calls and Q&A sessions with industry leaders.",
  },
  {
    icon: Users,
    title: "Community & Networking",
    description: "Join a community of driven leaders. Learn, connect, and grow together.",
  },
];

// Using the actual Leadership Academy flyer image as the hero
// and showing real book covers alongside it
const LEADERSHIP_BOOKS = [
  {
    title: "Changing the Channel",
    img: "https://pengamepublishing.myshopify.com/cdn/shop/files/nvrqqwn-front-shortedge-384.jpg?v=1774910216&width=533",
  },
  {
    title: "Nia and the Number Garden",
    img: "https://pengamepublishing.myshopify.com/cdn/shop/files/Nia_and_the_Number_Garden_Book.jpg?v=1767120869&width=533",
  },
  {
    title: "Leo the Lost Language Lion",
    img: "https://pengamepublishing.myshopify.com/cdn/shop/files/Leo_the_Lost_Language_Lion.jpg?v=1748740450&width=533",
  },
  {
    title: "Kai and the Kaleidoscope Compass",
    img: "https://pengamepublishing.myshopify.com/cdn/shop/files/Kai_and_the_Kaleidoscope_Compass.png?v=1748740626&width=533",
  },
  {
    title: "Adventures of Pixel and Pen",
    img: "https://pengamepublishing.myshopify.com/cdn/shop/files/Adventures_of_Pixel_Pen.jpg?v=1748740468&width=533",
  },
];

export default function LeadershipAcademy() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-foreground text-background">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 mb-4">
            <Award className="w-4 h-4 text-secondary" />
            <span className="text-secondary text-sm font-body font-semibold uppercase tracking-wider">Leadership Academy</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-4">
            Master the <span className="text-secondary italic">7 Ways</span> to Success
          </h2>
          <p className="font-body text-background/70 max-w-2xl mx-auto text-lg">
            Transform Your Leadership Potential — Empowering Entrepreneurs, Leaders & Visionaries
          </p>
        </motion.div>

        {/* Two-column: flyer + features */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
          {/* Flyer image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src="https://media.base44.com/images/public/69d10a467c2c4dce14cecdcb/fe92893e9_ChatGPTImageApr7202602_28_25PM.png"
              alt="PG Leadership Academy - 7 Ways to Success Series"
              className="w-full max-w-md rounded-2xl shadow-2xl border border-secondary/20"
            />
          </motion.div>

          {/* Features */}
          <div className="space-y-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-2xl bg-background/5 border border-background/10 hover:bg-background/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-background mb-1">{f.title}</h3>
                  <p className="font-body text-sm text-background/60 leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Book covers strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 md:gap-6 mb-12 flex-wrap"
        >
          {LEADERSHIP_BOOKS.map((book, i) => (
            <motion.div
              key={book.title}
              whileHover={{ y: -6, scale: 1.05 }}
              className="w-20 md:w-24 shrink-0"
            >
              <img
                src={book.img}
                alt={book.title}
                className="w-full rounded-lg shadow-xl border border-secondary/20"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-body text-background/60 text-sm mb-4 uppercase tracking-wider">
            Ready to Elevate Your Success and Lead with Confidence?
          </p>
          <Link to="/leadership-academy">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body font-bold text-base px-10 h-12">
              Visit PG Leadership Academy
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="font-body text-background/40 text-sm mt-3">Info@pengamepublishing.com</p>
        </motion.div>
      </div>
    </section>
  );
}