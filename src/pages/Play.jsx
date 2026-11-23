import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, LogOut, ShieldCheck, Gamepad2 } from 'lucide-react';
import PURCHASES from '@/data/purchases.json';
import { PASS_PLANS, CONTACT_EMAIL } from '@/data/gamePass';
import { auth, apiUrl } from '@/lib/gamepass';
import './gamepass.css';

// /play?item=<id>&return=<game address>
// Signs the player in (Supabase email link), asks the access server whether they own the
// item or have the Games Pass, and sends them back into the game with a 24-hour play token.
// While sign-in is switched off (VITE_GATE_ENABLED), it just opens the game.
const gateOn = import.meta.env.VITE_GATE_ENABLED === 'true' && Boolean(apiUrl && auth);
const RETURN_HOSTS = ['mrimagemakers.github.io', 'pengamepublishing.com', 'www.pengamepublishing.com'];

function safeReturn(raw, fallback) {
  try {
    const u = new URL(raw);
    return u.protocol === 'https:' && RETURN_HOSTS.includes(u.hostname) ? u.href.split('#')[0] : fallback;
  } catch { return fallback; }
}

export default function Play() {
  const params = new URLSearchParams(window.location.search);
  const item = PURCHASES.items.find(i => i.id === params.get('item'));
  const back = item ? safeReturn(params.get('return'), item.playUrl) : null;
  const justPaid = params.get('paid') === '1';

  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(!gateOn);
  const [state, setState] = useState({ phase: 'idle' }); // idle | checking | denied | error | sent
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!gateOn) { if (back) window.location.replace(back); return; }
    auth.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data } = auth.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, [back]);

  const check = useMemo(() => async () => {
    if (!session || !item) return;
    setState({ phase: 'checking' });
    try {
      const r = await fetch(`${apiUrl}/access?item=${encodeURIComponent(item.id)}`, { headers: { Authorization: `Bearer ${session.access_token}` } });
      const v = await r.json();
      if (!r.ok) throw new Error(v.error || 'Something went wrong. Please try again.');
      if (v.allowed && v.token) { window.location.replace(`${back}#pg_token=${encodeURIComponent(v.token)}`); return; }
      setState({ phase: 'denied', email: v.email });
    } catch (e) { setState({ phase: 'error', message: e.message }); }
  }, [session, item, back]);

  useEffect(() => { if (session) check(); }, [session, check]);

  const sendLink = async (e) => {
    e.preventDefault();
    setState({ phase: 'checking' });
    const { error } = await auth.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: window.location.href } });
    setState(error ? { phase: 'error', message: error.message } : { phase: 'sent' });
  };

  const buyUrl = (url) => (session?.user?.email ? `${url}?prefilled_email=${encodeURIComponent(session.user.email)}` : url);

  if (!item) return <div className="gp"><section className="gp-section gp-play">
    <h1>Game not found</h1>
    <p className="gp-lead">That link doesn’t match a PenGame game or book. <Link to="/game-pass">Browse every world</Link>.</p>
  </section></div>;

  if (!gateOn || !ready) return <div className="gp"><section className="gp-section gp-play"><p className="gp-lead" role="status">Opening {item.title}…</p></section></div>;

  return <div className="gp"><section className="gp-section gp-play" aria-labelledby="play-title">
    <p className="gp-eyebrow"><span /> PENGAME • SIGN IN TO PLAY</p>
    <h1 id="play-title">{item.title}</h1>

    {!session && state.phase !== 'sent' && <>
      <p className="gp-lead">{justPaid ? 'Thanks for your purchase! ' : ''}Sign in with the email you used at checkout and we’ll take you straight in.</p>
      <form className="gp-play-form" onSubmit={sendLink}>
        <label htmlFor="play-email">Email</label>
        <div><input id="play-email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          <button className="gp-button" type="submit" disabled={state.phase === 'checking'}><Mail size={18} aria-hidden="true" /> Email me a sign-in link</button></div>
      </form>
      <p className="gp-small">No password needed. The link signs you in on this device.</p>
    </>}

    {state.phase === 'sent' && <p className="gp-lead" role="status">Check your inbox for a sign-in link from PenGame. Open it on this device and you’ll come right back here.</p>}

    {session && state.phase === 'checking' && <p className="gp-lead" role="status">Checking your purchases…</p>}

    {session && state.phase === 'denied' && <>
      <p className="gp-lead">{justPaid
        ? `We couldn’t find a purchase for ${state.email} yet. If you paid with a different email, sign out and use that one.`
        : `${state.email} doesn’t have ${item.title} yet. Pick how you’d like to play:`}</p>
      <div className="gp-play-options">
        <a className="gp-button" href={buyUrl(item.checkoutUrl)}>Buy {item.kind === 'book' ? 'this book' : 'this game'} for {item.price}</a>
        {PASS_PLANS.map(p => <a key={p.id} className="gp-button gp-outline" href={buyUrl(p.checkoutUrl)}><Gamepad2 size={18} aria-hidden="true" /> {p.name}: {p.price}/{p.period}, every world</a>)}
      </div>
      {justPaid && <button type="button" className="gp-card-link" onClick={check}>Check again</button>}
    </>}

    {state.phase === 'error' && <p className="gp-lead" role="alert">{state.message} <button type="button" className="gp-card-link" onClick={check}>Try again</button></p>}

    {session && <p className="gp-small">Signed in as {session.user.email}. <button type="button" className="gp-card-link gp-quiet" onClick={() => { auth.auth.signOut(); setState({ phase: 'idle' }); }}><LogOut size={14} aria-hidden="true" /> Sign out</button></p>}
    <p className="gp-small gp-secure"><ShieldCheck size={16} aria-hidden="true" /> Payments by Stripe. Help: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
  </section></div>;
}
