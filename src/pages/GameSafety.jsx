import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { GAMES } from '@/data/games';
import { CONTACT_EMAIL } from '@/data/gamePass';
import RatingBadge from '@/components/gamepass/RatingBadge';
import { ContentList, useAge } from '@/components/gamepass/AgeGate';
import { TIERS, TIER_ORDER, minAge } from '@/lib/ageRatings';
import './gamepass.css';

// Public page: PenGame's ratings, the age check, the parents' guide and
// children's privacy. Have a lawyer review this page before relying on it.
const UPDATED = 'November 21, 2026';

export default function GameSafety() {
  const { mode, reset } = useAge();
  const [cleared, setCleared] = useState(false);
  useEffect(() => { document.title = 'Game ratings & safety | PenGame Publishing'; }, []);
  const games = [...GAMES].sort((a, b) => minAge(a) - minAge(b) || a.title.localeCompare(b.title));
  const online = GAMES.filter(g => g.online?.length);

  return <div className="gp gp-safety">
    <section className="gp-section gp-library-head">
      <p className="gp-eyebrow"><span /> PENGAME PUBLISHING • PLAYER SAFETY</p>
      <h1>Game ratings<br /><em>&amp; safety.</em></h1>
      <p className="gp-lead">Every PenGame world has an age rating and content notes, so players and parents know what to expect before they play.</p>
      <nav className="gp-filters gp-safety-nav" aria-label="On this page">
        <a href="#ratings">Ratings</a><a href="#age-check">Age check</a><a href="#parents">For parents</a><a href="#privacy">Children’s privacy</a><a href="#limits">Limits</a><a href="#contact">Contact</a>
      </nav>
    </section>

    <section className="gp-section" id="ratings" aria-labelledby="ratings-title">
      <p className="gp-eyebrow">HOW WE RATE</p>
      <h2 id="ratings-title">Five ratings.</h2>
      <p className="gp-lead">PenGame rates its own games, in the style of the ESRB and PEGI systems. These are PenGame ratings, not official ESRB or PEGI ratings.</p>
      <div className="gp-tiers">{TIER_ORDER.map(key => <article key={key} className="gp-plan"><RatingBadge game={{ rating: key }} /><h3>{TIERS[key].name}</h3><p>{TIERS[key].summary}</p></article>)}</div>
      <h2>Every world’s rating.</h2>
      <div className="gp-rating-table">{games.map(game => <article key={game.id} className="gp-rating-row">
        <div className="gp-rating-name"><RatingBadge game={game} /><h3>{game.title}</h3>{game.free && <span className="gp-free-tag">FREE</span>}</div>
        <ContentList game={game} />
      </article>)}</div>
    </section>

    <section className="gp-section gp-membership" id="age-check" aria-labelledby="age-title">
      <div>
        <p className="gp-eyebrow">THE AGE CHECK</p>
        <h2 id="age-title">Asked once, kept on your device.</h2>
        <p className="gp-lead">Before a rated world opens, we ask for a date of birth. We don’t save the date or send it anywhere. We keep only the age range it falls in, on this device, so we don’t have to ask again.</p>
      </div>
      <div>
        <ul>
          <li><b>Under 18 (teen mode):</b> worlds rated 17+ and 18+ are locked, the pass can only be bought by a parent or guardian, and games are asked to switch off chat, sign-ups and purchases.</li>
          <li><b>Under 13 (kid mode):</b> worlds rated above the player’s age are locked, online communities and chat are switched off or their worlds are locked, and links to shops and other sites are hidden.</li>
          <li><b>Content notices:</b> worlds rated 13+ and up, and worlds with a warning such as motion sickness, show their content notes before they open.</li>
        </ul>
        {mode && <p className="gp-mode" role="status"><ShieldCheck size={18} aria-hidden="true" /> {mode === 'kid' ? 'Kid mode' : 'Teen mode'} is on for this device.</p>}
        <p className="gp-small">Wrong age on this device? A parent or guardian can clear it, and we’ll ask again next time.</p>
        <button type="button" className="gp-button gp-outline" onClick={() => { reset(); setCleared(true); }}>Clear the age check on this device</button>
        {cleared && <p className="gp-small" role="status">Cleared. We’ll ask again before the next rated world.</p>}
      </div>
    </section>

    <section className="gp-section" id="parents" aria-labelledby="parents-title">
      <p className="gp-eyebrow">FOR PARENTS AND GUARDIANS</p>
      <h2 id="parents-title">A guide for families.</h2>
      <div className="gp-tiers gp-tips">
        <article className="gp-plan"><h3>Check the rating</h3><p>Each world’s card shows its rating, and the list above says why. Ratings are a guide; you know your child best.</p></article>
        <article className="gp-plan"><h3>Buy the pass yourself</h3><p>The Games Pass is a subscription for adults 18 and over to buy. Cancel any time by emailing us.</p></article>
        <article className="gp-plan"><h3>Watch for online features</h3><p>Some worlds let players meet, talk or post. They’re marked “Online” above, and for players under 13 those features are switched off or the world is locked.</p></article>
        <article className="gp-plan"><h3>Play VR safely</h3><p>Follow the headset maker’s own age guidance, clear the play space, take regular breaks, and stop if anyone feels dizzy or sick.</p></article>
      </div>
    </section>

    <section className="gp-section" id="privacy" aria-labelledby="privacy-title">
      <p className="gp-eyebrow">CHILDREN’S PRIVACY</p>
      <h2 id="privacy-title">What we collect.</h2>
      <div className="gp-prose">
        <p>The Games Pass pages on this site don’t ask players for a name, email address or birth date to be sent to us. The age check’s answer, an age range, stays in this browser’s storage on your device.</p>
        <p>PenGame Publishing does not knowingly collect personal information from children under 13. For players under 13, this site locks worlds whose online features could collect it, or opens them in kid mode with those features switched off. If you think your child has given us personal information, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we’ll delete it.</p>
        <p>Games Pass payments are handled by Stripe. PenGame never sees card details.</p>
        <p>These worlds use online features or outside services:</p>
        <ul>{online.map(g => <li key={g.id}><b>{g.title}:</b> {g.online.join('; ')}.</li>)}</ul>
      </div>
    </section>

    <section className="gp-section" id="limits" aria-labelledby="limits-title">
      <p className="gp-eyebrow">WHAT THE AGE CHECK CAN’T DO</p>
      <h2 id="limits-title">Honest limits.</h2>
      <div className="gp-prose">
        <p>A self-reported age check isn’t age verification. A player can enter a different date, clear the browser, or use another device. Our games run on their own web addresses, and a link to a game can be opened without passing through this site.</p>
        <p>Until members sign in with accounts a parent manages, ratings and parent supervision are the main protection.</p>
      </div>
    </section>

    <section className="gp-section" id="contact" aria-labelledby="contact-title">
      <p className="gp-eyebrow">CONTACT</p>
      <h2 id="contact-title">Questions from parents.</h2>
      <p className="gp-lead">Email <a href={`mailto:${CONTACT_EMAIL}?subject=Parent%20question`}>{CONTACT_EMAIL}</a> about a rating, your child’s information, or a membership. <Link to="/contact">Other ways to reach us</Link>.</p>
      <p className="gp-small">Last updated {UPDATED}.</p>
    </section>
  </div>;
}
