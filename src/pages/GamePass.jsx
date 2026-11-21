import { useState, lazy, Suspense } from 'react';
import { Gamepad2, ArrowUpRight, LockKeyhole, Sparkles, ShieldCheck } from 'lucide-react';
import { GAMES } from '@/data/games';
import { PASS_PLANS, CONTACT_EMAIL } from '@/data/gamePass';
import './gamepass.css';
const ArcadeScene = lazy(() => import('@/components/gamepass/ArcadeScene'));

const art = (game) => `${import.meta.env.BASE_URL}${game.image.slice(1)}`;
const badge = (game) => game.rating || (game.platforms.includes('vr') ? 'BROWSER + VR' : 'BROWSER');

export default function GamePass() {
  const [filter, setFilter] = useState('all');
  const freeGame = GAMES.find(g => g.free);
  const passGames = GAMES.filter(g => !g.free);
  const shown = passGames.filter(g => filter === 'all' || g.platforms.includes(filter));

  return <div className="gp">
    <section className="gp-hero">
      <Suspense fallback={null}><ArcadeScene /></Suspense>
      <div className="gp-hero-copy"><p className="gp-eyebrow"><span /> PENGAME PUBLISHING • GAMES PASS</p>
        <h1>Great stories.<br />Epic worlds.<br /><em>One pass.</em></h1>
        <p className="gp-lead">{freeGame ? <>Play {freeGame.title} free. </> : null}Every other PenGame world comes with the Games Pass, from {PASS_PLANS[0].price} a month.</p>
        <div className="gp-actions">
          <a className="gp-button" href="#membership"><Gamepad2 size={20} /> Get the Games Pass</a>
          {freeGame && <a className="gp-button gp-outline" href={freeGame.url}>Play {freeGame.title} free ↗</a>}
        </div>
        <p className="gp-small">Browser adventures · Immersive VR · Worlds beyond the page</p>
      </div>
      <div className="gp-ticket"><Sparkles /><span>YOUR ALL-ACCESS ADVENTURE</span><strong>GAMES<br />PASS</strong><small>{passGames.length} WORLDS · ONE PASS</small></div>
    </section>

    <div className="gp-strip"><span>01 / PLAY {freeGame ? freeGame.title.toUpperCase() : 'OUR FREE GAME'} FREE</span><span>02 / PICK MONTHLY OR YEARLY</span><span>03 / PLAY EVERY WORLD</span></div>

    {freeGame && <section className="gp-section gp-free" id="free" aria-labelledby="gp-free-title">
      <div className="gp-free-art"><img src={art(freeGame)} alt={freeGame.title} /><span>FREE TO PLAY</span></div>
      <div>
        <p className="gp-eyebrow">ON THE HOUSE</p>
        <h2 id="gp-free-title">{freeGame.title}</h2>
        <p className="gp-lead">{freeGame.description}</p>
        <div className="gp-actions">
          <a className="gp-button" href={freeGame.url}>Play free <ArrowUpRight size={18} /></a>
          {freeGame.altLinks?.map(l => <a key={l.url} className="gp-button gp-outline" href={l.url}>{l.label} ↗</a>)}
        </div>
        <p className="gp-small">No account and no card needed.</p>
      </div>
    </section>}

    <section className="gp-section" id="arcade">
      <div className="gp-heading"><div><p className="gp-eyebrow">INCLUDED IN THE GAMES PASS</p><h2>Choose your adventure.</h2></div>
        <div className="gp-filters" role="group" aria-label="Filter by how you play">{[['all','All worlds'],['browser','Browser'],['vr','VR'],['ar','AR']].map(([key,label]) => <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div>
      </div>
      <div className="gp-grid">{shown.map((game, index) => <article className="gp-card" key={game.id}>
        <div className="gp-art"><img src={art(game)} alt={game.title} loading="lazy" /><span>{badge(game)}</span><b>{String(index + 1).padStart(2,'0')}</b></div>
        <div className="gp-card-body"><h3>{game.title}</h3><p>{game.tagline}</p>
          <a className="gp-card-link" href="#membership" aria-label={`Unlock ${game.title} with the Games Pass`}>Unlock with the Games Pass <LockKeyhole size={16} aria-hidden="true" /></a>
        </div>
      </article>)}</div>
    </section>

    <section className="gp-section gp-membership" id="membership">
      <div><p className="gp-eyebrow">LESS THAN A COFFEE. A WORLD OF PLAY.</p><h2>One pass.<br />Every world.</h2>
        <p className="gp-lead">Choose the pass that fits how you play.</p>
        <ul>
          <li>All {passGames.length} Games Pass worlds, plus new ones as they launch</li>
          <li>Play in your browser, VR headset, or phone AR where a game supports it</li>
          <li>Questions or cancellations: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
        </ul>
      </div>
      <div className="gp-plans">{PASS_PLANS.map(plan => <article className={`gp-plan ${plan.best ? 'gp-best' : ''}`} key={plan.id}>
        <p className="gp-eyebrow">{plan.label}</p><h3>{plan.name}</h3>
        <p className="gp-price">{plan.price}<small>/{plan.period}</small></p>
        <p>Billed {plan.price} {plan.billed}. Renews automatically until you cancel.</p>
        <a className="gp-button" href={plan.checkoutUrl} rel="noopener">Get the {plan.name} ↗</a>
      </article>)}
        <p className="gp-small gp-secure"><ShieldCheck size={16} aria-hidden="true" /> Secure checkout by Stripe. PenGame Publishing never sees your card details.</p>
      </div>
    </section>
  </div>;
}
