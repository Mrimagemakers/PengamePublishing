import { useState } from 'react';
import { GAMES } from '@/lib/experiences';
import '@/components/home/immersive.css';
export default function Games() {
  const [filter, setFilter] = useState('All');
  return <section className="pg-section"><span className="pg-eyebrow" style={{color:'#23685f'}}>THE PENGAME GAMES PORTAL</span><h1 className="text-5xl font-heading my-5">Stories you can step into.</h1><p>Choose your next adventure. Experiences open on their own sites in a new tab; controls, device support, and XR availability vary by game.</p><div className="pg-filters" aria-label="Game categories">{['All','Adventure','Simulation','Music & VR'].map(name=><button key={name} aria-pressed={filter===name} onClick={()=>setFilter(name)}>{name}</button>)}</div><p role="status" className="mb-5">{GAMES.filter(g=>filter==='All'||g.category===filter).length} experiences</p><div className="pg-grid">{GAMES.filter(g=>filter==='All'||g.category===filter).map(game=><article key={game.name} className="pg-card"><span aria-hidden="true" className="text-4xl text-primary">{game.icon}</span><small>{game.category}</small><h2 className="!text-2xl !m-0">{game.name}</h2><p>{game.description}</p><a href={game.url} target="_blank" rel="noopener noreferrer">Launch {game.name} ↗</a></article>)}</div></section>;
}
