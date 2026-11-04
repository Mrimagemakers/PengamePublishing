import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/shared/BookCard";
import { BOOKS } from "@/lib/booksData";
import { motion } from "framer-motion";

export default function BookShowcase() {
  // Show 6 featured books on home page (children + coloring, not leadership)
  const featuredBooks = BOOKS.filter(b => b.category === "children" || b.category === "coloring").slice(0, 6);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-body font-semibold mb-3">
            Our Collection
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Our <span className="text-primary italic">Publications</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            From STEM-forward children's books to immersive coloring adventures, discover stories that educate, inspire, and transform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/publications">
            <Button variant="outline" size="lg" className="font-body font-semibold px-8 h-12">
              View All Publications
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}