import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, LockKeyhole, ShieldCheck } from 'lucide-react';
import { GAMES, PLATFORMS } from '@/data/games';
import { CONTACT_EMAIL } from '@/data/gamePass';
import GameCover from '@/components/games/GameCover';
import RatingBadge from '@/components/gamepass/RatingBadge';
import { useAge } from '@/components/gamepass/AgeGate';
import { access, OWN_HOSTS } from '@/lib/ageRatings';
import './gamepass.css';
import BookExperiences from '@/components/gamepass/BookExperiences';

const ownLink = (url) => { try { const h = new URL(url).hostname; return OWN_HOSTS.some(o => h === o || h.endsWith('.' + o)); } catch { return false; } };

// Members' landing page. Point both Stripe Payment Links' "After payment"
// redirect here. This page is unlisted, not protected: the games themselves
// are still public until each one checks for an active membership.
// Play buttons go through the age check (src/components/gamepass/AgeGate.jsx).
export default function GamePassLibrary() {
  const { meets, mode, play } = useAge();
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
  const art = (game) => `${import.meta.env.BASE_URL}${game.image.slice(1)}`;
  const games = [...GAMES.filter(g => !g.free), ...GAMES.filter(g => g.free)];
  const kid = mode === 'kid';

  return <div className="gp">
    <section className="gp-section gp-library-head">
      <p className="gp-eyebrow"><span /> GAMES PASS • MEMBER LIBRARY</p>
      <h1>Welcome to<br /><em>the Games Pass.</em></h1>
      <p className="gp-lead">Thanks for joining. Every world is below with its age rating. Bookmark this page so you can jump back in any time.</p>
      {mode && <p className="gp-mode" role="status"><ShieldCheck size={18} aria-hidden="true" /> {kid
        ? 'Kid mode is on for this device. Worlds rated above your age, online communities and chat, and links to other sites are switched off.'
        : 'Teen mode is on for this device. Worlds rated 17+ and 18+ are locked, and games are asked to switch off chat, sign-ups and purchases.'} <Link to="/game-safety#parents">How it works</Link></p>}
      <p className="gp-small">Need help with your membership? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. <Link to="/game-safety">Ratings, safety and children’s privacy</Link>.</p>
    </section>
    <BookExperiences member />
    <section className="gp-section">
      <div className="gp-grid">{games.map(game => {
        const locked = access(game, meets).state === 'locked';
        const links = (game.altLinks || []).filter(l => !kid || ownLink(l.url));
        return <article className={`gp-card ${locked ? 'gp-card-locked' : ''}`} key={game.id}>
          <div className="gp-art">{game.image ? <img src={art(game)} alt={game.title} loading="lazy" /> : <div className="gp-art-fallback"><GameCover game={game} /></div>}<span>{game.free ? 'FREE' : 'GAMES PASS'}</span><RatingBadge game={game} className="gp-art-rating gp-art-rating-right" /></div>
          <div className="gp-card-body"><h3>{game.title}</h3><p>{game.platforms.map(p => PLATFORMS[p]).join(' · ')}</p>
            {game.descriptors?.length > 0 && <p className="gp-card-meta">{game.descriptors.join(' · ')}</p>}
            <div className="gp-library-links">
              {locked
                ? <Link className="gp-card-link gp-locked" to="/game-safety#ratings">Locked for your age on this device <LockKeyhole size={16} aria-hidden="true" /></Link>
                : <>
                  <button type="button" className="gp-card-link" onClick={() => play(game)}>Play now <ArrowUpRight size={16} aria-hidden="true" /></button>
                  {links.map(l => <button type="button" key={l.url} className="gp-card-link" onClick={() => play(game, l.url)}>{l.label} <ArrowUpRight size={16} aria-hidden="true" /></button>)}
                </>}
              {game.book && !kid && <a className="gp-card-link gp-quiet" href={game.book.url}><BookOpen size={16} aria-hidden="true" /> Read {game.book.title}</a>}
            </div>
          </div>
        </article>;
      })}</div>
    </section>
  </div>;
}
