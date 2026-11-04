import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, ShoppingCart, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Publications", path: "/publications" },
  { label: "Games", path: "/games" },
  { label: "Book QR / AR", path: "/book-experiences" },
  { label: "PG Leadership", path: "/leadership-academy" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+17705854678" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
              <Phone className="w-3.5 h-3.5" />
              (770) 585-4678
            </a>
            <a href="mailto:Info@pengamepublishing.com" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
              <Mail className="w-3.5 h-3.5" />
              Info@pengamepublishing.com
            </a>
          </div>
          <span className="text-primary-foreground/70">Atlanta, GA | Rewriting the Future of Publishing</span>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-md shadow-lg"
            : "bg-card shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="block font-heading text-xl font-bold text-foreground leading-none">
                PenGame
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body">
                Publishing
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden 2xl:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 text-foreground hover:bg-muted"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/publications">
              <Button className="hidden sm:inline-flex bg-secondary hover:bg-secondary/90 text-secondary-foreground font-body font-semibold">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Shop Books
              </Button>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="2xl:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="2xl:hidden overflow-hidden border-t border-border"
            >
              <nav id="mobile-navigation" aria-label="Mobile navigation" className="px-6 py-4 space-y-1 bg-card">
                {NAV_LINKS.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 rounded-lg text-sm font-body font-medium transition-colors text-foreground hover:bg-muted"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-3 rounded-lg text-sm font-body font-medium transition-colors ${
                        location.pathname === link.path
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <div className="pt-3 border-t border-border mt-3">
                  <a href="tel:+17705854678" className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" /> (770) 585-4678
                  </a>
                  <a href="mailto:Info@pengamepublishing.com" className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" /> Info@pengamepublishing.com
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
