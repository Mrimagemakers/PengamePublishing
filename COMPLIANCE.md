# Game ratings, age check and underage limits

What the site does now, what it can't do, and what each game still needs.
This is not legal advice. Have a lawyer review `/game-safety` (src/pages/GameSafety.jsx)
before relying on it, especially the children's privacy section.

## Where things live

| What | File |
|---|---|
| Each game's rating, content notes, warnings and online features | `src/data/games.js` |
| Rating tiers, age math, locks, launch flag | `src/lib/ageRatings.js` |
| Age check and content notice dialog | `src/components/gamepass/AgeGate.jsx` |
| Rating badge | `src/components/gamepass/RatingBadge.jsx` |
| Public ratings, parents and children's privacy page | `src/pages/GameSafety.jsx` (route `/game-safety`) |
| Tests | `tests/ageRatings.test.mjs` (`node --test tests/*.mjs`) |

## Ratings (reviewed Nov 21, 2026 from each game's source)

| Game | Rating | Why |
|---|---|---|
| Queen of the Seas (free) | All Ages | Mild cartoon action. Loads Mindblown's script for saves and events. |
| Coloring Odyssey | All Ages, kid mode under 13 | Email sign-up, public posts and groups (Supabase); shared canvas (PeerJS); Halloween Haunts horror pages. Kid mode turns all three off (Coloring-Odyssey PR #1). |
| World of Coasters | All Ages | Mild arcade target shooting; VR motion warning. |
| Cruising USA | All Ages | VR motion warning. |
| First Flight | All Ages | Its own privacy page says no accounts or tracking. VR motion warning. |
| Nia's Number Garden World | All Ages | Chat and presence only run on the Claude-hosted copy; the GitHub Pages copy the site links has them off. |
| Hue's Got Flow | 10+ | Cartoon paint-blast boss fights. |
| Great Outdoors Adventure | 13+ | Hunting with realistic rifles, shotguns and a revolver; wounded animals. |
| Porch War | 13+ | Melee brawling with improvised weapons; street-crime setting. |
| Turn Up Music | 13+ | Unfiltered internet radio; nightlife lounge; parties and voice chat (the app already switches these off under 18). |
| StoryScape XR | 13+ | Live voice chat with other readers (WebRTC) and shareable room invites. |
| Rap IQ City | 13+ (provisional) | Not reviewed: the game is a claude.ai chat artifact this review couldn't open. |
| About Last Night | 17+ | Horror, zombies, morgue boss fights, kidnapping story. |
| ATL Nightclub Mogul | 18+ | Mixing and serving real cocktails, drug dealers, crime crews, combat, online multiplayer rooms. |
| Ravenbrook Manor | 18+ | Survival horror with blood and jump scares (game has its own 18+ notice). |

## How the limits work

- **Age check**: neutral date-of-birth screen, asked once per device, the first time a player opens a rated world (or an All Ages world whose online features aren't safe for under-13s, or that has its own kid mode). Only the tier (0, 10, 13, 17 or 18) is stored in `localStorage` (`pengame-age-check-v1`). The date of birth isn't stored or sent.
- **Teen mode (13–17)**: 17+ and 18+ worlds locked; Stripe buttons replaced with "a parent or guardian needs to buy the pass"; launch links get `?pg_mode=teen`.
- **Kid mode (under 13)**: worlds above their tier locked; worlds with `kidSafe: false` locked; worlds with `kidMode: true` open in their own kid mode; book shop links and non-PenGame links (Horizon Worlds) hidden; launch links get `?pg_mode=kid`.
- **Content notice** before every 13+ world and any world with a warning (motion sickness).
- Footer game links now go to the Games Pass page instead of straight to the games.

## What it can't do (be honest about this)

The age check is self-reported. Anyone can type another date, clear site data or use another browser. Every game is a public URL on its own site, so a link to a game skips this site entirely. The members' library is unlisted, not protected.

Real enforcement would need, roughly in this order:

1. **Member accounts** (sign-in) so the age answer, the Games Pass and parental settings live on a server, not the device.
2. **Verified parental consent** before collecting anything from an under-13 (COPPA). Common methods: a small card charge to the parent, a signed form, or a consent service (for example SuperAwesome/Kids Web Services or PRIVO).
3. **Server checks in each game**: the game asks a PenGame endpoint whether this signed-in member may play and which mode to use, instead of trusting the URL. `server/gamepass/worker.js` already has the start of this for paid levels.
4. **Moderation** for any game with chat, voice or public posts: report/block buttons, filters, and a person who reviews reports.

## What each game still needs to do

The site passes `pg_mode=kid` or `pg_mode=teen` on launch. A game must read it and switch features off. Example for a game's page:

```js
const pgMode = new URLSearchParams(location.search).get('pg_mode'); // 'kid' | 'teen' | null
if (pgMode) {
  // hide chat, voice, sign-up, public posting, shop and outside links
}
```

- **Coloring Odyssey**: done in Mrimagemakers/Coloring-Odyssey PR #1. With `pg_mode=kid` it removes the Artist Community (its code never loads), friend rooms and Amazon links, and hides Halloween Haunts; `pg_mode=teen` hides Amazon links. Merge that PR before or with this one, because this one opens Coloring Odyssey to under-13s.
- **StoryScape XR, Turn Up Music**: switch off voice chat and room invites for `kid`/`teen` (Turn Up already has an under-18 mode; it can read this flag too).
- **ATL Nightclub Mogul, Queen of the Seas**: confirm what Mindblown's `pod.js` collects. Queen is the free All Ages game, so a third-party script that collects data from children matters for COPPA.
- **Rap IQ City**: review its content and set the final rating.
- **Ravenbrook Manor**: Horizon Worlds play follows Meta's own age rules.
