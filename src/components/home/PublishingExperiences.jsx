import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, FileText, Headset, PenLine } from "lucide-react";

const features = [
  {title:"AR & VR Storytelling", category:"Immersive Experiences", description:"Discover virtual reading spaces, interactive books and connected learning worlds.", image:"/images/pengame-vr-banner.webp", url:"https://storyscapexr.com", icon:Headset, external:true},
  {title:"Books & Publications", category:"Publishing Catalog", description:"Explore PenGame titles, from Bright Minds Explorers to Coloring Odyssey and beyond.", image:"/images/pengame-shop-banner.webp", url:"/publications", icon:BookOpen},
  {title:"Author Services", category:"Publish With PenGame", description:"Learn about publishing, editorial development, design and author support.", image:"/images/pengame-submission-banner.webp", url:"/contact", icon:PenLine},
  {title:"News & Creative Insights", category:"Publishing Resources", description:"Discover our mission, creative approach and the stories behind PenGame.", image:"/images/pengame-editorial-banner.webp", url:"/about", icon:FileText}
];
export default function PublishingExperiences() {
  return <section className="bg-[#06172b] py-20 text-white" aria-labelledby="publishing-experiences-title">
    <div className="mx-auto max-w-7xl px-6">
      <p className="mb-3 text-sm font-bold uppercase tracking-[.2em] text-amber-400">Explore PenGame</p>
      <h2 id="publishing-experiences-title" className="mb-3 font-heading text-3xl font-bold md:text-4xl">Stories. Experiences. Possibilities.</h2>
      <p className="mb-10 max-w-2xl text-slate-300">A new way to explore our publishing and immersive media universe.</p>
      <div className="grid gap-6 md:grid-cols-2">
        {features.map(item => {
          const Icon=item.icon;
          const body=<><div className="relative h-48 overflow-hidden bg-slate-800"><img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onError={e=>{e.currentTarget.style.display="none"}}/><span className="absolute left-4 top-4 rounded-full bg-slate-950/80 p-3"><Icon className="h-5 w-5 text-amber-300"/></span></div><div className="flex items-start justify-between gap-4 p-6"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-amber-300">{item.category}</p><h3 className="mb-2 font-heading text-2xl font-bold">{item.title}</h3><p className="text-sm leading-relaxed text-slate-300">{item.description}</p></div><ArrowUpRight className="h-6 w-6 shrink-0 text-amber-300"/></div></>;
          return item.external?<a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-2xl border border-white/15 bg-white/5 hover:border-amber-400/70 focus-visible:outline focus-visible:outline-4 focus-visible:outline-amber-400">{body}</a>:<Link key={item.title} to={item.url} className="group overflow-hidden rounded-2xl border border-white/15 bg-white/5 hover:border-amber-400/70 focus-visible:outline focus-visible:outline-4 focus-visible:outline-amber-400">{body}</Link>;
        })}
      </div>
    </div>
  </section>;
}
