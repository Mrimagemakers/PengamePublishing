import React from 'react';
import { ArrowUpRight, BookOpen, Headphones, Glasses } from 'lucide-react';

const destinations = [
  {
    name: 'StoryScape XR',
    eyebrow: 'Immersive Reading',
    description: 'Step into digital books, virtual reading spaces, and interactive storytelling experiences.',
    url: 'https://storyscapexr.com',
    icon: Glasses,
  },
  {
    name: 'Turn Up Music',
    eyebrow: 'Music & Virtual Worlds',
    description: 'Explore PenGame’s interactive music and immersive entertainment destination.',
    url: 'https://turnupmusic.online',
    icon: Headphones,
  },
  {
    name: "Nia's Number Garden",
    eyebrow: 'Bright Minds Explorers',
    description: 'Meet Nia and discover playful educational adventures beyond the printed page.',
    url: 'https://niasnumbergarden.shop',
    icon: BookOpen,
  },
];

export default function Ecosystem() {
  return (
    <section className="py-20 md:py-24 bg-primary/5" aria-labelledby="ecosystem-title">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-body font-semibold mb-3">Beyond the Page</p>
        <h2 id="ecosystem-title" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Explore the PenGame Universe</h2>
        <p className="font-body text-muted-foreground max-w-2xl mb-10">Books are just the beginning. Enter our connected worlds of reading, music, and learning.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map(({ name, eyebrow, description, url, icon: Icon }) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl border border-border bg-card p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
              <div className="flex items-start justify-between mb-6">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10"><Icon className="w-7 h-7 text-primary" /></span>
                <ArrowUpRight className="w-5 h-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{eyebrow}</p>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{name}</h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">{description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
