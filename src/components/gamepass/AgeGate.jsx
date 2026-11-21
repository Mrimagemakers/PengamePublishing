import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, LockKeyhole, ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { access, checkBirthDate, clearMeets, launchUrl, mode, needsWarning, readMeets, saveMeets, tierOf } from '@/lib/ageRatings';
import RatingBadge from './RatingBadge';

const AgeContext = createContext(null);
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Holds the device's age-check answer and the play dialog. Wrap the app in it,
// then call `play(game, url)` from any Play button.
export function AgeProvider({ children }) {
  const [meets, setMeets] = useState(() => readMeets());
  const [pending, setPending] = useState(null); // { game, url, step }

  const go = (url, m) => window.location.assign(launchUrl(url, m));

  const play = useCallback((game, url = game.url) => {
    const a = access(game, meets);
    if (a.state === 'play' && !needsWarning(game)) return go(url, meets);
    setPending({ game, url, step: a.state === 'ask' ? 'age' : a.state === 'locked' ? 'locked' : 'warn' });
  }, [meets]);

  const answer = useCallback((m) => {
    saveMeets(m);
    setMeets(m);
    if (!pending) return;
    const a = access(pending.game, m);
    if (a.state === 'play' && !needsWarning(pending.game)) { setPending(null); go(pending.url, m); return; }
    setPending({ ...pending, step: a.state === 'locked' ? 'locked' : 'warn' });
  }, [pending]);

  const reset = useCallback(() => { clearMeets(); setMeets(null); }, []);
  const value = useMemo(() => ({ meets, mode: mode(meets), play, reset }), [meets, play, reset]);

  return <AgeContext.Provider value={value}>
    {children}
    <Dialog open={Boolean(pending)} onOpenChange={open => { if (!open) setPending(null); }}>
      <DialogContent className="gp gp-dialog border-[#D9A53A]">
        {pending?.step === 'age' && <AgeStep game={pending.game} onAnswer={answer} />}
        {pending?.step === 'warn' && <WarnStep game={pending.game} url={launchUrl(pending.url, meets)} meets={meets} onClose={() => setPending(null)} />}
        {pending?.step === 'locked' && <LockedStep game={pending.game} meets={meets} onClose={() => setPending(null)} />}
      </DialogContent>
    </Dialog>
  </AgeContext.Provider>;
}

export function useAge() {
  const ctx = useContext(AgeContext);
  if (!ctx) throw new Error('useAge must be used inside <AgeProvider>');
  return ctx;
}

// Neutral age screen: it asks for a date of birth without saying which age
// unlocks what, and it is asked once per device.
function AgeStep({ game, onAnswer }) {
  const [dob, setDob] = useState({ month: '', day: '', year: '' });
  const [error, setError] = useState('');
  const set = key => e => setDob(v => ({ ...v, [key]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    const r = checkBirthDate(dob);
    if (r.error) return setError(r.error);
    onAnswer(r.meets);
  };
  return <form onSubmit={submit} noValidate>
    <p className="gp-eyebrow">AGE CHECK</p>
    <DialogTitle className="gp-dialog-title">When were you born?</DialogTitle>
    <DialogDescription className="gp-dialog-text">Some PenGame worlds have age ratings. Enter your date of birth to continue to {game.title}.</DialogDescription>
    <div className="gp-dob">
      <label>Month<select value={dob.month} onChange={set('month')} required><option value="">Month</option>{MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}</select></label>
      <label>Day<select value={dob.day} onChange={set('day')} required><option value="">Day</option>{Array.from({ length: 31 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}</select></label>
      <label>Year<input inputMode="numeric" autoComplete="off" placeholder="YYYY" maxLength={4} value={dob.year} onChange={set('year')} required /></label>
    </div>
    {error && <p className="gp-dob-error" role="alert">{error}</p>}
    <button className="gp-button gp-dialog-go" type="submit">Continue</button>
    <p className="gp-small">Your date of birth stays on this device and isn’t saved or sent anywhere. We keep only the age range it falls in. <Link to="/game-safety#privacy">How this works</Link></p>
  </form>;
}

function WarnStep({ game, url, meets, onClose }) {
  const tier = tierOf(game);
  const m = mode(meets);
  return <div>
    <p className="gp-eyebrow"><ShieldAlert size={14} aria-hidden="true" /> CONTENT NOTICE</p>
    <DialogTitle className="gp-dialog-title">{game.title}</DialogTitle>
    <div className="gp-dialog-rating"><RatingBadge game={game} /><span>{tier.name}</span></div>
    <DialogDescription asChild><div className="gp-dialog-text">
      <ContentList game={game} />
      {m && game.online?.length > 0 && <p className="gp-note">{m === 'kid' ? 'Kid mode' : 'Teen mode'} is on. PenGame asks this game to switch off chat, sign-ups, purchases and outside links for you.</p>}
    </div></DialogDescription>
    <div className="gp-actions">
      <a className="gp-button" href={url}>Play now <ArrowUpRight size={18} aria-hidden="true" /></a>
      <button className="gp-button gp-outline" type="button" onClick={onClose}>Not now</button>
    </div>
  </div>;
}

function LockedStep({ game, meets, onClose }) {
  const tier = tierOf(game);
  const online = access(game, meets).reason === 'online';
  return <div>
    <p className="gp-eyebrow"><LockKeyhole size={14} aria-hidden="true" /> LOCKED ON THIS DEVICE</p>
    <DialogTitle className="gp-dialog-title">{game.title}</DialogTitle>
    <div className="gp-dialog-rating"><RatingBadge game={game} /><span>{tier.name}</span></div>
    <DialogDescription className="gp-dialog-text">
      {online
        ? 'This world has an online community with sign-ups and public posts, which isn’t open to players under 13 yet.'
        : `This world is rated ${tier.name}, so it’s locked for your age.`}
    </DialogDescription>
    <p className="gp-small">Parents and guardians: <Link to="/game-safety#parents" onClick={onClose}>read our ratings and safety guide</Link>.</p>
    <div className="gp-actions"><button className="gp-button gp-outline" type="button" onClick={onClose}>Back to the worlds</button></div>
  </div>;
}

// Descriptors, warnings and online features for one game.
export function ContentList({ game }) {
  const rows = [
    ...(game.descriptors || []).map(t => ['Content', t]),
    ...(game.warnings || []).map(t => ['Warning', t]),
    ...(game.online || []).map(t => ['Online', t]),
  ];
  return <>
    {rows.length ? <ul className="gp-content-list">{rows.map(([k, t]) => <li key={k + t}><b>{k}</b>{t}</li>)}</ul> : <p>No content warnings.</p>}
    {game.review && <p className="gp-note">{game.review}</p>}
  </>;
}
