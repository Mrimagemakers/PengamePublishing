import React from 'react';
import { ArrowUpRight, BookOpen, Headphones, Glasses, CarFront, Plane, Orbit, Gamepad2, GraduationCap } from 'lucide-react';

const destinations = [
  { name: 'StoryScape XR', eyebrow: 'Immersive Reading', description: 'Enter virtual reading rooms and interactive storytelling worlds.', url: 'https://storyscapexr.com', icon: Glasses, image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900&q=85', gradient: 'from-indigo-950/90 to-cyan-800/30' },
  { name: 'Turn Up Music VR', eyebrow: 'VR Music & Social', description: 'Explore the virtual radio station, music lounges and interactive entertainment.', url: 'https://turnupmusic.online', icon: Headphones, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=85', gradient: 'from-purple-950/90 to-pink-800/30' },
  { name: "Nia's Number Garden", eyebrow: 'Bright Minds Explorers', description: 'Launch Nia’s connected educational virtual world.', url: 'https://mrimagemakers.github.io/NiasVRWorld/', icon: BookOpen, image: 'https://pengamepublishing.myshopify.com/cdn/shop/files/Nia_the_Number_Garden.png?v=1748740547&width=533', gradient: 'from-emerald-950/90 to-teal-800/30' },
];

const games = [
  { name: 'Cruising USA', subtitle: '3D Racing & Driving', url: 'https://mrimagemakers.github.io/CrusingUSA/', icon: CarFront, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85', gradient: 'from-slate-950/90 to-orange-700/30' },
  { name: 'First Flight', subtitle: 'Aviation Simulator & AR', url: 'https://mrimagemakers.github.io/FirstFlight/ar.html', icon: Plane, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85', gradient: 'from-sky-950/90 to-blue-700/30' },
  { name: 'World of Coasters', subtitle: 'VR Roller Coaster Adventures', url: 'https://mrimagemakers.github.io/WorldofCoasters', icon: Orbit, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=85', gradient: 'from-violet-950/90 to-fuchsia-700/30' },
  { name: 'Turn Up Music VR', subtitle: 'VR Radio & Nightlife', url: 'https://turnupmusic.online', icon: Headphones, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=85', gradient: 'from-purple-950/90 to-pink-700/30' },
  { name: "Nia's VR World", subtitle: 'Educational WebXR Adventure', url: 'https://mrimagemakers.github.io/NiasVRWorld/', icon: GraduationCap, image: 'https://pengamepublishing.myshopify.com/cdn/shop/files/Nia_the_Number_Garden.png?v=1748740547&width=533', gradient: 'from-emerald-950/90 to-lime-700/30' },
  { name: 'Success Brand VR', subtitle: 'Immersive Branding Experience', url: 'https://mrimagemakers.github.io/successbrandvr', icon: Gamepad2, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=85', gradient: 'from-blue-950/90 to-amber-700/30' },
];

function DestinationCard({ item, large = false }) {
  const Icon = item.icon;
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="group relative block min-h-[290px] overflow-hidden rounded-3xl bg-slate-950 shadow-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-cyan-400 transition-transform duration-300 hover:-translate-y-2">
      <img src={item.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={e => { e.currentTarget.style.display = 'none'; }} />
      <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} via-slate-950/45`} />
      <div className="relative z-10 flex min-h-[290px] flex-col justify-between p-6 text-white">
        <div className="flex items-start justify-between"><span className="rounded-2xl border border-white/30 bg-black/30 p-3 backdrop-blur"><Icon className="h-7 w-7 text-cyan-200" /></span><ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
        <div><p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-cyan-200">{item.eyebrow || item.subtitle}</p><h3 className="mb-2 font-heading text-2xl font-bold">{item.name}</h3>{item.description && <p className="max-w-sm text-sm leading-relaxed text-white/85">{item.description}</p>}</div>
      </div>
    </a>
  );
}

export default function Ecosystem() {
  return (
    <>
      <section className="bg-primary/5 py-20 md:py-24" aria-labelledby="ecosystem-title">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[.2em] text-primary">Beyond the Page</p>
          <h2 id="ecosystem-title" className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">Explore the PenGame Universe</h2>
          <p className="mb-10 max-w-2xl text-muted-foreground">From immersive reading to music and learning, explore our connected experiences.</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">{destinations.map(item => <DestinationCard key={item.url} item={item} />)}</div>
        </div>
      </section>
      <section id="pengame-games" className="bg-slate-950 py-20 text-white md:py-24" aria-labelledby="games-title">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[.2em] text-cyan-300">PenGame Games Portal</p>
          <h2 id="games-title" className="mb-4 font-heading text-3xl font-bold md:text-4xl">Play Beyond the Page</h2>
          <p className="mb-10 max-w-2xl text-slate-300">Race, fly, ride, learn and explore. Games open in their own immersive experiences; VR availability depends on your device and browser.</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{games.map(item => <DestinationCard key={item.name} item={item} />)}</div>
        </div>
      </section>
    </>
  );
}
