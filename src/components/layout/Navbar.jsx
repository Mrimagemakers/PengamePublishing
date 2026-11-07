import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Books", path: "/publications" },
  { label: "Shop", path: "/shop" },
  { label: "Games & XR", path: "/games" },
  { label: "Big Book of Cookies", path: "/big-book-of-cookies" },
  { label: "Leadership Academy", path: "/leadership-academy" },
  { label: "Resources", path: "/resources" },
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

  return (
    <>
      {/* Top bar */}
      <div className="hidden bg-[#0A1730] text-sm text-white/80 md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+17705854678" className="flex items-center gap-1.5 hover:text-[#F2D27A] transition-colors">
              <Phone className="w-3.5 h-3.5" />
              (770) 585-4678
            </a>
            <a href="mailto:Info@pengamepublishing.com" className="flex items-center gap-1.5 hover:text-[#F2D27A] transition-colors">
              <Mail className="w-3.5 h-3.5" />
              Info@pengamepublishing.com
            </a>
          </div>
          <span className="text-white/60">Atlanta, Georgia</span>
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
          <Link to="/" className="group flex items-baseline gap-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" aria-label="PenGame Publishing home">
            <span className="font-heading text-2xl font-extrabold tracking-[-0.03em] text-primary">PenGame</span>
            <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">Publishing</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-2 rounded-lg text-xs font-body font-medium transition-all duration-200 text-foreground hover:bg-muted"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative whitespace-nowrap px-2.5 py-2 text-[15px] font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-colors ${
                    location.pathname === link.path
                      ? "text-primary after:bg-secondary"
                      : "text-foreground/75 hover:text-primary after:bg-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/shop" className="hidden sm:inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Shop books
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} className="xl:hidden p-2 rounded-lg hover:bg-muted transition-colors"
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
              className="xl:hidden overflow-hidden border-t border-border"
            >
              <nav className="px-6 py-4 space-y-1 bg-card">
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
                          ? "bg-muted text-primary border-l-2 border-secondary"
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
