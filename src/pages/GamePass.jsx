import { useEffect, useState, lazy, Suspense } from 'react';
import { Gamepad2, ArrowUpRight, LockKeyhole, Sparkles } from 'lucide-react';
import { GAMES } from '@/data/games';
import { auth, apiUrl, passApi } from '@/lib/gamepass';
import './gamepass.css';
const ArcadeScene = lazy(() => import('@/components/gamepass/ArcadeScene'));

export default function GamePass() {
  const [session, setSession] = useState(null);
  const [catalog, setCatalog] = useState([]);
  const [member, setMember] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [email, setEmail] = useState('');
  const [filter, setFilter] = useState('all');
  useEffect(() => {
    if (apiUrl) passApi('/catalog').then(d => { setCatalog(d.games); setReady(d.salesEnabled); }).catch(e => setNotice(e.message));
    if (!auth) return;
    auth.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = auth.auth.onAuthStateChange((_event, value) => setSession(value));
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    setMember(false);
    if (session) passApi('/membership').then(d => { setMember(d.active); if (new URLSearchParams(location.search).get('checkout') === 'success') setNotice(d.active ? 'Welcome to Game Pass. Your membership is active!' : 'Payment is still processing. Refresh membership in a moment.'); }).catch(e => setNotice(e.message));
  }, [session]);
  async function action(fn) { setBusy(true); setNotice(''); try { await fn(); } catch (e) { setNotice(e.message); } finally { setBusy(false); } }
  function checkout(plan) { action(async () => { if (!session) { document.getElementById('gp-email').focus(); throw new Error('Sign in with your email before choosing a membership.'); } const data = await passApi('/checkout', { plan }); window.location.assign(data.url); }); }
  function play(game) { action(async () => { const data = await passApi('/launch', { game: game.id, level: 1 }); window.location.assign(data.url); }); }
  const shown = GAMES.filter(g => filter === 'all' || g.platforms.includes(filter));
  return <div className="gp">
    <section className="gp-hero">
      <Suspense fallback={null}><ArcadeScene /></Suspense>
      <div className="gp-hero-copy"><p className="gp-eyebrow"><span /> PENGAME PUBLISHING • GAME PASS</p>
        <h1>Great stories.<br />Epic worlds.<br /><em>One pass.</em></h1>
        <p className="gp-lead">Your next adventure starts here. Play the first level free, then keep exploring with Game Pass.</p>
        <div className="gp-actions"><a className="gp-button" href="#arcade"><Gamepad2 size={20} /> Explore the arcade</a><a className="gp-button gp-outline" href="#membership">Choose your pass ↗</a></div>
        <p className="gp-small">Browser adventures · Immersive VR · Worlds beyond the page</p>
      </div>
      <div className="gp-ticket"><Sparkles /><span>YOUR ALL-ACCESS ADVENTURE</span><strong>GAME<br />PASS</strong><small>LEVEL UP YOUR STORY</small></div>
    </section>
    <div className="gp-strip"><span>01 / PICK YOUR WORLD</span><span>02 / FIRST LEVEL FREE</span><span>03 / UNLOCK WITH GAME PASS</span></div>
    <section className="gp-section" id="arcade"><div className="gp-heading"><div><p className="gp-eyebrow">THE PENGAME ARCADE</p><h2>Choose your adventure.</h2></div><div className="gp-filters">{[['all','All worlds'],['browser','Browser'],['vr','VR'],['ar','AR']].map(([key,label]) => <button key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div></div>
      <div className="gp-grid">{shown.map((game, index) => { const available = catalog.find(g => g.id === game.id); return <article className="gp-card" key={game.id}>
        <div className="gp-art"><img src={`${import.meta.env.BASE_URL}${game.image.slice(1)}`} alt={game.title} loading="lazy" /><span>{game.rating || (game.platforms.includes('vr') ? 'BROWSER + VR' : 'BROWSER')}</span><b>{String(index + 1).padStart(2,'0')}</b></div>
        <div className="gp-card-body"><h3>{game.title}</h3><p>{game.tagline}</p><button disabled={busy || !available} onClick={() => play(game)}>{available ? 'Play level 1 free' : 'Game Pass integration coming soon'}{available ? <ArrowUpRight size={18} /> : <LockKeyhole size={16} />}</button></div>
      </article>; })}</div>
      {!catalog.length && <p className="gp-small gp-pending">The arcade lineup is being connected. Free first levels and paid access will open as each game is integrated.</p>}
    </section>
    <section className="gp-section gp-membership" id="membership"><div><p className="gp-eyebrow">LESS THAN A COFFEE. A WORLD OF PLAY.</p><h2>Your story doesn’t<br />end at level one.</h2><p className="gp-lead">Unlock levels 2 and beyond in participating games. Choose the pass that fits how you play.</p><ul><li>One membership for connected Game Pass titles</li><li>Play on supported browsers and VR headsets</li><li>Manage or cancel your subscription online</li></ul></div>
      <div className="gp-plans">{[['monthly','$4.99','month','Flexible adventures'],['annual','$39.99','year','Save $19.89 a year']].map(([plan,price,period,label]) => <article className={`gp-plan ${plan === 'annual' ? 'gp-best' : ''}`} key={plan}><p className="gp-eyebrow">{label}</p><h3>{plan === 'annual' ? 'Annual pass' : 'Monthly pass'}</h3><p className="gp-price">{price}<small>/{period}</small></p><p>Billed {plan === 'annual' ? '$39.99 annually' : '$4.99 monthly'}. Automatically renews until canceled.</p><button className="gp-button" disabled={busy || !ready || member} onClick={() => checkout(plan)}>{member ? 'Membership active' : ready ? 'Get Game Pass ↗' : 'Memberships opening soon'}</button></article>)}</div>
    </section>
    <section className="gp-section gp-account"><div><p className="gp-eyebrow">PLAYER ACCOUNT</p><h2>{session ? 'Welcome back, explorer.' : 'Your adventures, together.'}</h2><p>{session ? session.user.email : 'Sign in with a secure email link to access your membership.'}</p></div>
      {session ? <div className="gp-actions"><button className="gp-button" disabled={busy} onClick={() => action(async () => { const d = await passApi('/portal', {}); location.assign(d.url); })}>Manage billing</button><button className="gp-button gp-outline" disabled={busy} onClick={() => action(async () => { const d = await passApi('/membership'); setMember(d.active); setNotice(d.active ? 'Membership active.' : 'No active membership yet.'); })}>Refresh membership</button><button className="gp-button gp-outline" onClick={() => auth.auth.signOut()}>Sign out</button></div> : <form onSubmit={e => { e.preventDefault(); action(async () => { if (!auth) throw new Error('Player accounts are being connected. Please check back soon.'); const { error } = await auth.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}${location.hostname.endsWith('github.io') ? '/PengamePublishing' : ''}/game-pass` } }); if (error) throw error; setNotice('Check your email for your secure sign-in link.'); }); }}><label htmlFor="gp-email">Email address</label><div className="gp-actions"><input id="gp-email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /><button className="gp-button" disabled={busy}>Send sign-in link</button></div></form>}
    </section>
    {notice && <div className="gp-notice" role="status">{notice}<button aria-label="Dismiss notification" onClick={() => setNotice('')}>×</button></div>}
  </div>;
}
