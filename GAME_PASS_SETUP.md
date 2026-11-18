# PenGame Publishing Game Pass

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
