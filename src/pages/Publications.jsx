import React, { useState } from "react";
import BookCard from "@/components/shared/BookCard";
import { BOOKS, CATEGORIES } from "@/lib/booksData";
import { motion } from "framer-motion";

export default function Publications() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredBooks = activeCategory === "all"
    ? BOOKS
    : BOOKS.filter(b => b.category === activeCategory);

  return (
    <>
      {/* Page header */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-secondary font-body font-semibold mb-3">
              Our Collection
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Publications
            </h1>
            <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto">
              From STEM-forward children's books to immersive coloring adventures and leadership guides — discover stories that educate, inspire, and transform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-muted-foreground border border-border hover:bg-muted"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Books grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <p className="text-center text-muted-foreground font-body py-12">
              No books found in this category.
            </p>
          )}
        </div>
      </section>
    </>
  );
}