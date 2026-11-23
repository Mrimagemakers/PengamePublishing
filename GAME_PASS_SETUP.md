# PenGame Publishing Games Pass

## Sign-in gate and single-game sales (November 23, 2026)

**What's built:**

- **Single-game sales.** Every game on mrimagemakers.github.io except the free Queen of the Seas is sold on its own as a one-time purchase, and so are the two AR/VR books. They are live Stripe products and Payment Links in the PenGame Publishing, LLC account, all listed in `src/data/purchases.json`, the one list the site and the server share. Prices: $7.99 for World of Coasters, Cruising USA, First Flight, Great Outdoors Adventure, Ravenbrook Manor, ATL Nightclub Mogul and About Last Night; $4.99 for Nia's Number Garden World, Porch War, Hue's Got Flow and Coloring Odyssey; $14.99 for Changing the Channel and $9.99 for Nia and the Number Garden. After paying, Stripe sends the buyer to `/play?item=<id>`.
- **`/play` page** (`src/pages/Play.jsx`). The player signs in with an emailed link (Supabase). The page asks the server for access, then sends them back into the game with a 24-hour play token. If they don't own the game, it offers "buy this game" or the Games Pass. While the gate is off, it simply opens the game.
- **Server** (`server/gamepass/worker.js`). `GET /access?item=` checks Stripe by the player's verified email for an active Games Pass subscription or a paid one-time checkout of that item, and returns a signed token. `POST /verify` checks a token. `GET /status` reports whether it's configured. Tests: `node --test tests/*.test.mjs`.
- **Gate script** (`public/pengame-gate.js`). Each game or book loads it with
  `<script src="https://pengamepublishing.com/pengame-gate.js" data-item="<id>"></script>`.
  It reads `gate-config.json` from the website. While the gate is off, it does nothing. When the gate is on, it covers the page until the player has a valid token. If the PenGame servers can't be reached, it opens the game rather than locking out paying players.
- **This is a sign-in gate, not a full lock.** Game files are still public on GitHub Pages, so a determined, technical person could get around it. Refunds aren't checked: a refunded one-time purchase still counts as owned until it's revoked by hand.

**To switch it on:**

1. **Supabase.** Done: project `PenGamePublishingSite` (`https://isdikaghisuptqthlqqw.supabase.co`). Its URL and publishable key are already in `src/lib/gamepass.js` and `wrangler.toml`. Still to do in Supabase: under Authentication → URL Configuration, set Site URL to `https://pengamepublishing.com` and add `https://pengamepublishing.com/play*` to the redirect allow list.
2. **Cloudflare Worker.** From `server/gamepass`, run `npx wrangler deploy`. Then set these secrets with `npx wrangler secret put <NAME>`:
   - `STRIPE_SECRET_KEY`: a restricted key with read access to Customers, Subscriptions and Checkout Sessions is enough.
   - `GATE_SECRET`: any long random string.
   Then check that `https://<worker>/status` returns `{"ready":true}`.
3. **GitHub.** In the PengamePublishing repo, go to Settings → Secrets and variables → Actions → Variables. Set `VITE_GAMEPASS_API_URL` (the Worker URL, no trailing slash) and `VITE_GATE_ENABLED=true`. Then re-run the Pages deploy.
4. **Test it.** Buy one $4.99 game with your own email, sign in at `/play`, check that it opens, then refund yourself in Stripe.

To switch it off again, set `VITE_GATE_ENABLED` to `false` and redeploy. Every game opens freely again.

Games hosted elsewhere (Turn Up Music, StoryScape XR, Rap IQ City, and Ravenbrook in Horizon Worlds) can't be gated or sold individually this way.

---

## Earlier notes (November 2026)

- `/game-pass` sells the Games Pass with two Stripe Payment Links: $4.99/month and $39.99/year (product "PenGame Games Pass"). The links live in `src/data/gamePass.js`.
- There are no free first levels. One game is free: the entry in `src/data/games.js` marked `free: true` (Queen of the Seas). Every other title is listed as part of the pass and has no play link on the sales page.
- `/game-pass/library` is the members' page with every play link. In Stripe, set each Payment Link's **After payment** option to redirect to `https://pengamepublishing.com/game-pass/library`. The page is unlisted (noindex), not protected.
- **Paying does not lock or unlock anything yet.** Every game is still public at its own address, so anyone who has a game's link can play it. Real access control needs the steps below.

## What real access control would take

1. Player sign-in: an email sign-in (for example the Supabase magic link already wired in `src/lib/gamepass.js`), using the same email the player paid with in Stripe.
2. A membership check: deploy `server/gamepass/worker.js` with the two new price IDs. It currently finds Stripe customers by `pengame_user_id` metadata, which Payment Link customers don't have, so it needs to look customers up by verified email instead.
3. Each game checks the membership before it loads, and its paid content moves off public hosting (a private repo and private storage served through the Worker). While a game's files stay in a public GitHub Pages repo, a check inside the game only stops casual players.
4. Games hosted elsewhere (Horizon Worlds, turnupmusic.online, storyscapexr.com, the Rap IQ City artifact) can't be gated by this setup.

The original level-by-level design follows for reference. Its "level 1 free" model is no longer the plan.

---

Implemented: `/game-pass` and `/games` arcade, Three.js objects, mobile layout, email-link accounts, Stripe subscription Checkout and billing portal, live Stripe entitlement checks, and protected level delivery. Pricing: USD $4.99/month or $39.99/year. Sales default OFF. Existing external games are NOT yet converted or protected by this website change.

## Activate infrastructure
1. Create/configure a Supabase Auth project for email magic links. Configure production SMTP and redirect allowlist for `https://pengamepublishing.com/game-pass` (and the actual Pages preview URL if used). No service role key is needed.
2. In Stripe, create a Game Pass product with recurring USD prices: 499 cents monthly and 3999 cents annually. Enable the customer billing portal, including cancellation and changes between these prices.
3. Deploy `server/gamepass/worker.js` using Cloudflare Workers and a PRIVATE R2 bucket named `pengame-private-levels`. Never enable public bucket access. From `server/gamepass`, use Wrangler secrets for `STRIPE_SECRET_KEY`, `STRIPE_PRICE_MONTHLY`, `STRIPE_PRICE_ANNUAL`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY`. Set SITE_URL and exact ALLOWED_ORIGINS in wrangler.toml. Start with Stripe test mode.
4. Set GitHub Actions repository variables `VITE_GAMEPASS_API_URL` (Worker URL without trailing slash), `VITE_SUPABASE_URL`, and `VITE_SUPABASE_ANON_KEY`. These are public client configuration, never Stripe secret keys. Rebuild the website.

## Connect EACH game before enabling sales
The external games currently bypass this site entirely. A landing-page lock cannot secure them. Do not sell memberships until integrated games are tested.

- Refactor the game's loader so level 1 is the free entry and all later level data/assets load from the Worker. Store files in private R2 under `game-id/level-number/filename`, including a manifest.json per level. Remove paid assets from publicly accessible hosting and source repositories; existing public copies cannot be revoked.
- Share the same Supabase Auth project. Sign in within each game's origin (sessions do not automatically cross origins). Fetch paid manifests and assets using `Authorization: Bearer <Supabase access token>`; never put tokens in URLs. Use fetch + blob URLs for textures/audio where necessary. Refresh expired tokens using Supabase's SDK.
- Request `/launch` with `{game, level}`. Its manifest URL is protected independently; a success URL, localStorage flag, or query parameter never grants membership. The public launch URL is only the game shell, and must not contain paid levels.
- After level 1 completes, request level 2. On 401 show sign-in; on 403 show membership choices linking to `/game-pass`. Never fall back to bundled paid content on API failure.
- Add exact game origins to ALLOWED_ORIGINS. Set GAME_CATALOG to a JSON array like `[{"id":"world-of-coasters","levels":3,"launchUrl":"https://mrimagemakers.github.io/WorldofCoasters/"}]` ONLY after implementing and testing that game's loader.
- Horizon Worlds and third-party hosted artifacts are not automatically gated by this backend. Leave them out of the paid catalog until a supported enforcement mechanism exists.

## Billing and validation
Every entitlement read queries Stripe live, so cancellations, delinquency, and renewals are reflected without relying on webhook delivery or a client success redirect. Only active subscriptions matching the configured price IDs grant access. A canceled-at-period-end subscription remains active until Stripe ends it. Trials are not enabled. No webhook is required for this implementation. Add rate limiting in Cloudflare before launch and monitor Stripe API usage; high volume should migrate to a signed-webhook entitlement store.

Run `node --test tests/gamepass.test.mjs` and `npm run build`. In test mode verify: anonymous level 1; anonymous and expired accounts blocked on level 2; successful purchase and cross-device sign-in; direct asset requests blocked; monthly/annual price totals; decline, abandoned Checkout, duplicate clicks, renewal failure, cancellation, and portal changes. Keep SALES_ENABLED false until all pass. Then use live Stripe prices/key and set SALES_ENABLED true.

GitHub Pages deploys only the frontend. Worker deployment, Stripe account setup, Supabase configuration, and individual game integrations are separate required steps. No DNS migration is included.

## AR/VR Books catalog

Changing the Channel and Nia and the Number Garden are listed under Books in Publications and in a dedicated Books section on both Game Pass pages. Their original print purchase links remain separate. Member launch buttons open ChangingtheChannel and NiaNumberGardenAR on GitHub Pages. This uses the existing unprotected library flow; it does not add subscription enforcement or make the public apps private.
