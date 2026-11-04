import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Contact bar */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-background/60 font-body">Call Us</p>
              <a href="tel:+17705854678" className="font-body font-semibold hover:text-secondary transition-colors">(770) 585-4678</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-background/60 font-body">Email Us</p>
              <a href="mailto:Info@pengamepublishing.com" className="font-body font-semibold hover:text-secondary transition-colors text-sm">Info@pengamepublishing.com</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-background/60 font-body">Location</p>
              <p className="font-body font-semibold text-sm">Atlanta, GA 30308</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
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
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold leading-none">PenGame</h2>
                <span className="text-[10px] uppercase tracking-[0.2em] text-background/50 font-body">Publishing</span>
              </div>
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
                { label: "Publications", path: "/publications" },
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
            <h3 className="font-heading text-lg font-semibold mb-6">Explore Our Worlds</h3>
            <p className="text-background/60 font-body text-sm mb-4">
              Continue your story in our immersive reading, music, and learning destinations.
            </p>
            <ul className="space-y-3 font-body text-sm">
              <li><a className="text-background/70 hover:text-secondary" href="https://storyscapexr.com" target="_blank" rel="noopener noreferrer">StoryScape XR</a></li>
              <li><a className="text-background/70 hover:text-secondary" href="https://turnupmusic.online" target="_blank" rel="noopener noreferrer">Turn Up Music</a></li>
              <li><a className="text-background/70 hover:text-secondary" href="https://niasnumbergarden.shop" target="_blank" rel="noopener noreferrer">Nia's Number Garden</a></li>
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
