import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { GAMES } from "@/data/games";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Contact bar */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-background/60 font-body">Call Us</p>
              <a href="tel:+17705854678" className="font-body font-semibold hover:text-secondary transition-colors">(770) 585-4678</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-background/60 font-body">Email Us</p>
              <a href="mailto:Info@pengamepublishing.com" className="font-body font-semibold hover:text-secondary transition-colors text-sm">Info@pengamepublishing.com</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-background/60 font-body">Location</p>
              <p className="font-body font-semibold text-sm">Atlanta, GA 30308</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-background/60 font-body">Explore</p>
              <Link to="/publications" className="font-body font-semibold hover:text-secondary transition-colors">Browse Our Books</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="mb-6 flex items-baseline gap-2">
              <span className="font-heading text-2xl font-extrabold tracking-[-0.03em]">PenGame</span>
              <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
              <span className="text-sm text-background/60">Publishing</span>
            </Link>
            <p className="text-background/60 font-body text-sm leading-relaxed">
              A pioneering publishing company based in Atlanta, Georgia. We combine traditional storytelling with immersive technologies to create unique digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Books", path: "/publications" },
                { label: "Games & XR", path: "/games" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="flex items-center gap-2 text-background/60 hover:text-secondary transition-colors font-body text-sm">
                    <ArrowRight className="w-3 h-3" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Book Series */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Book Series</h3>
            <ul className="space-y-3">
              {["Bright Minds Explorers", "Coloring Odyssey Series", "7 Ways Leadership Series", "Big Book of Cookies", "Halloween Haunts"].map((series) => (
                <li key={series}>
                  <Link to="/publications" className="flex items-center gap-2 text-background/60 hover:text-secondary transition-colors font-body text-sm">
                    <ArrowRight className="w-3 h-3" /> {series}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Play</h3>
            <ul className="space-y-3 text-sm">
              {GAMES.filter((g) => g.status === "live").slice(0, 6).map((g) => (
                <li key={g.id}>
                  <a className="text-background/60 transition-colors hover:text-secondary" href={g.url} target="_blank" rel="noopener noreferrer">{g.title}</a>
                </li>
              ))}
              <li>
                <Link to="/games" className="font-semibold text-secondary hover:underline underline-offset-4">All games &amp; worlds</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm font-body">
            © {new Date().getFullYear()} PenGame Publishing, LLC. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-background/50 hover:text-secondary transition-colors text-sm font-body">Facebook</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-background/50 hover:text-secondary transition-colors text-sm font-body">Instagram</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-background/50 hover:text-secondary transition-colors text-sm font-body">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
