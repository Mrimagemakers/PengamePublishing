import { useEffect } from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { GAMES, PLATFORMS } from '@/data/games';
import { CONTACT_EMAIL } from '@/data/gamePass';
import './gamepass.css';

// Members' landing page. Point both Stripe Payment Links' "After payment"
// redirect here. This page is unlisted, not protected: the games themselves
// are still public until each one checks for an active membership.
export default function GamePassLibrary() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
  const art = (game) => `${import.meta.env.BASE_URL}${game.image.slice(1)}`;
  const games = [...GAMES.filter(g => !g.free), ...GAMES.filter(g => g.free)];

  return <div className="gp">
    <section className="gp-section gp-library-head">
      <p className="gp-eyebrow"><span /> GAMES PASS • MEMBER LIBRARY</p>
      <h1>Welcome to<br /><em>the Games Pass.</em></h1>
      <p className="gp-lead">Thanks for joining. Every world is below. Bookmark this page so you can jump back in any time.</p>
      <p className="gp-small">Need help with your membership? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </section>
    <section className="gp-section">
      <div className="gp-grid">{games.map(game => <article className="gp-card" key={game.id}>
        <div className="gp-art"><img src={art(game)} alt={game.title} loading="lazy" /><span>{game.free ? 'FREE' : 'GAMES PASS'}</span></div>
        <div className="gp-card-body"><h3>{game.title}</h3><p>{game.platforms.map(p => PLATFORMS[p]).join(' · ')}</p>
          <div className="gp-library-links">
            <a className="gp-card-link" href={game.url}>Play now <ArrowUpRight size={16} aria-hidden="true" /></a>
            {game.altLinks?.map(l => <a key={l.url} className="gp-card-link" href={l.url}>{l.label} <ArrowUpRight size={16} aria-hidden="true" /></a>)}
            {game.book && <a className="gp-card-link gp-quiet" href={game.book.url}><BookOpen size={16} aria-hidden="true" /> Read {game.book.title}</a>}
          </div>
        </div>
      </article>)}</div>
    </section>
  </div>;
}
