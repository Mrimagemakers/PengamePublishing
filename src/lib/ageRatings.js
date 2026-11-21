// PenGame age ratings, the age check, and under-18 / under-13 limits.
//
// What this does and doesn't do:
// - The age check asks for a date of birth, works out which rating tiers the
//   player meets, and keeps only that tier (for example 13) on this device.
//   The date of birth itself is never stored or sent anywhere.
// - It is self-reported. Anyone can clear site data or use another browser.
//   Real enforcement needs accounts, verified parental consent and checks on a
//   server (see COMPLIANCE.md).
// - Games run on their own sites, so this file can only decide whether this
//   site sends a player to a game, and tell the game which mode to use
//   (pg_mode=kid or pg_mode=teen on the launch link). Each game must honor
//   that flag itself.

export const TIERS = {
  all: { min: 0, label: 'ALL AGES', short: 'ALL', name: 'All Ages', summary: 'Suitable for everyone. May have mild cartoon action.' },
  '10+': { min: 10, label: '10+', short: '10+', name: 'Ages 10+', summary: 'Fantasy or cartoon violence and slightly more intense play.' },
  '13+': { min: 13, label: '13+', short: '13+', name: 'Ages 13+', summary: 'Violence, realistic weapons, crude themes, or online features that connect players.' },
  '17+': { min: 17, label: '17+', short: '17+', name: 'Ages 17+', summary: 'Intense horror, violence, blood or disturbing themes.' },
  '18+': { min: 18, label: '18+', short: '18+', name: 'Adults only (18+)', summary: 'Adult themes such as alcohol use, drugs, crime, or intense horror and blood.' },
};

export const TIER_ORDER = ['all', '10+', '13+', '17+', '18+'];
export const STORAGE_KEY = 'pengame-age-check-v1';
// Hosts PenGame runs. Only links to these get the pg_mode flag.
export const OWN_HOSTS = ['mrimagemakers.github.io', 'turnupmusic.online', 'storyscapexr.com', 'pengamepublishing.com'];

export const tierOf = (game) => TIERS[game?.rating] || null;
export const minAge = (game) => (tierOf(game) ? tierOf(game).min : 18); // unrated games are treated as 18+
// Under-13s can't use a game whose online features are still on for them.
export const gateAge = (game) => Math.max(minAge(game), game?.kidSafe === false ? 13 : 0);
export const needsAgeCheck = (game) => gateAge(game) > 0;

// Whole years between a birth date and today.
export function ageOn(birth, today = new Date()) {
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age;
}

// The highest rating tier an age meets: 0, 10, 13, 17 or 18.
export function tierForAge(age) {
  return [18, 17, 13, 10].find(min => age >= min) ?? 0;
}

// Validates a date of birth from the form. Returns { meets } or { error }.
export function checkBirthDate({ year, month, day }, today = new Date()) {
  const y = Number(year), m = Number(month), d = Number(day);
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return { error: 'Enter your full date of birth.' };
  const birth = new Date(y, m - 1, d);
  if (birth.getFullYear() !== y || birth.getMonth() !== m - 1 || birth.getDate() !== d) return { error: 'That date doesn’t exist. Check the day and month.' };
  if (birth > today) return { error: 'That date is in the future.' };
  const age = ageOn(birth, today);
  if (age > 120) return { error: 'Check the year you were born.' };
  return { meets: tierForAge(age) };
}

// What a player who meets `meets` (or hasn't answered: null) may do with a game.
// Returns { state: 'play' | 'ask' | 'locked', reason }.
export function access(game, meets) {
  if (!needsAgeCheck(game)) return { state: 'play' };
  if (meets === null || meets === undefined) return { state: 'ask' };
  if (meets < minAge(game)) return { state: 'locked', reason: 'age' };
  if (meets < 13 && game.kidSafe === false) return { state: 'locked', reason: 'online' };
  return { state: 'play' };
}

export const mode = (meets) => (meets === null || meets === undefined ? null : meets < 13 ? 'kid' : meets < 18 ? 'teen' : null);
export const isMinor = (meets) => mode(meets) !== null;

// Adds pg_mode=kid|teen to links PenGame runs, so a game can switch off chat,
// sign-ups, purchases and outside links. Other sites' links are left as they are.
export function launchUrl(url, meets) {
  const m = mode(meets);
  if (!m) return url;
  try {
    const u = new URL(url);
    if (!OWN_HOSTS.some(h => u.hostname === h || u.hostname.endsWith('.' + h))) return url;
    u.searchParams.set('pg_mode', m);
    return u.toString();
  } catch {
    return url;
  }
}

// A content warning is shown before launch for 13+ games and for any game
// with a listed warning (such as motion sickness).
export const needsWarning = (game) => minAge(game) >= 13 || Boolean(game?.warnings?.length);

// Device storage: only the tier, never the birth date.
export function readMeets(storage = globalThis.localStorage) {
  try {
    const v = JSON.parse(storage?.getItem(STORAGE_KEY) || 'null');
    return [0, 10, 13, 17, 18].includes(v?.meets) ? v.meets : null;
  } catch {
    return null;
  }
}
export function saveMeets(meets, storage = globalThis.localStorage) {
  try { storage?.setItem(STORAGE_KEY, JSON.stringify({ meets })); } catch { /* private mode: the check lasts for this page only */ }
}
export function clearMeets(storage = globalThis.localStorage) {
  try { storage?.removeItem(STORAGE_KEY); } catch { /* nothing stored */ }
}
