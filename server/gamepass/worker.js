// Deploy separately from GitHub Pages. All Stripe credentials remain here.
export function entitled(subscriptions, prices) {
  return subscriptions.some(s => s.status === 'active' && s.items.data.some(i => prices.includes(i.price.id)));
}
export function validLevel(value) { return Number.isInteger(value) && value >= 1 && value <= 999; }
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowed = (env.ALLOWED_ORIGINS || '').split(',');
    const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Vary': 'Origin' };
    if (allowed.includes(origin)) Object.assign(headers, { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Headers': 'Authorization, Content-Type', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' });
    const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers });
    try {
      if (origin && !allowed.includes(origin)) fail(403, 'Origin not allowed.');
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
      const url = new URL(request.url);
      const catalog = JSON.parse(env.GAME_CATALOG || '[]');
      const configured = Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_PRICE_MONTHLY && env.STRIPE_PRICE_ANNUAL && env.SUPABASE_URL && env.SUPABASE_ANON_KEY);
      const salesEnabled = configured && env.SALES_ENABLED === 'true' && catalog.length > 0;
      if (url.pathname === '/catalog' && request.method === 'GET') return json({ salesEnabled, games: catalog.map(({ id, levels }) => ({ id, levels })) });
      const stripe = async (path, data, key) => {
        const result = await fetch(`https://api.stripe.com/v1/${path}`, { method: data ? 'POST' : 'GET', headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, ...(data ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}), ...(key ? { 'Idempotency-Key': key } : {}) }, ...(data ? { body: new URLSearchParams(data) } : {}) });
        const value = await result.json();
        if (!result.ok) fail(502, 'Billing service temporarily unavailable. Please try again.');
        return value;
      };
      const user = async () => {
        if (!configured) fail(503, 'Game Pass is being connected. Please check back soon.');
        const token = request.headers.get('Authorization');
        if (!token?.startsWith('Bearer ')) fail(401, 'Please sign in first.');
        const result = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, { headers: { Authorization: token, apikey: env.SUPABASE_ANON_KEY } });
        if (!result.ok) fail(401, 'Please sign in again.');
        const value = await result.json();
        if (!/^[a-f0-9-]{36}$/i.test(value.id) || !value.email_confirmed_at) fail(401, 'Verify your email to continue.');
        return value;
      };
      const customersFor = async (id) => (await stripe(`customers/search?query=${encodeURIComponent(`metadata['pengame_user_id']:'${id}'`)}&limit=100`)).data;
      const memberFor = async (customers) => {
        for (const customer of customers) {
          let after = '';
          do {
            const page = await stripe(`subscriptions?customer=${customer.id}&status=all&limit=100${after ? `&starting_after=${after}` : ''}`);
            if (entitled(page.data, [env.STRIPE_PRICE_MONTHLY, env.STRIPE_PRICE_ANNUAL])) return true;
            after = page.has_more ? page.data.at(-1).id : '';
          } while (after);
        }
        return false;
      };
      // Free level assets are public; every paid asset requires a verified active membership.
      const asset = url.pathname.match(/^\/level\/([a-z0-9-]+)\/(\d+)\/(.+)$/);
      if (asset && request.method === 'GET') {
        const [, id, rawLevel, filename] = asset;
        const level = Number(rawLevel);
        const game = catalog.find(g => g.id === id);
        if (!game || !validLevel(level) || level > game.levels || !/^[a-zA-Z0-9_./-]+$/.test(filename) || filename.split('/').includes('..')) fail(404, 'Level not found.');
        if (level > 1) { const player = await user(); if (!await memberFor(await customersFor(player.id))) fail(403, 'Game Pass is required for level 2 and beyond.'); }
        const object = await env.LEVELS.get(`${id}/${level}/${filename}`);
        if (!object) fail(404, 'Level asset not found.');
        const assetHeaders = new Headers(headers); object.writeHttpMetadata(assetHeaders); assetHeaders.set('Cache-Control', 'private, no-store'); assetHeaders.set('X-Content-Type-Options', 'nosniff');
        return new Response(object.body, { headers: assetHeaders });
      }
      if (request.method === 'POST' && request.headers.get('Content-Type')?.includes('application/json') !== true) fail(415, 'JSON required.');
      if (url.pathname === '/launch' && request.method === 'POST') {
        const body = await request.json();
        const game = catalog.find(g => g.id === body.game);
        if (!game || !validLevel(body.level) || body.level > game.levels) fail(404, 'This game is not connected to Game Pass yet.');
        if (body.level > 1) { const player = await user(); if (!await memberFor(await customersFor(player.id))) fail(403, 'Membership required.'); }
        return json({ url: game.launchUrl, manifest: `${url.origin}/level/${game.id}/${body.level}/manifest.json`, level: body.level });
      }
      if (!['/membership', '/checkout', '/portal'].includes(url.pathname)) fail(404, 'Not found.');
      if ((url.pathname === '/membership' && request.method !== 'GET') || (url.pathname !== '/membership' && request.method !== 'POST')) fail(405, 'Method not allowed.');
      const player = await user();
      const customers = await customersFor(player.id);
      if (url.pathname === '/membership') return json({ active: await memberFor(customers) });
      const returnUrl = env.SITE_URL.replace(/\/$/, '') + '/game-pass';
      if (url.pathname === '/portal') {
        if (!customers.length) fail(404, 'No billing account yet.');
        return json(await stripe('billing_portal/sessions', { customer: customers[0].id, return_url: returnUrl }));
      }
      if (!salesEnabled) fail(503, 'Membership sales are not open yet.');
      const { plan } = await request.json();
      if (!['monthly', 'annual'].includes(plan)) fail(400, 'Choose a monthly or annual pass.');
      if (await memberFor(customers)) fail(409, 'You already have Game Pass. Use Manage billing to change your plan.');
      const priceId = plan === 'monthly' ? env.STRIPE_PRICE_MONTHLY : env.STRIPE_PRICE_ANNUAL;
      const price = await stripe(`prices/${priceId}`);
      if (!price.active || price.currency !== 'usd' || price.unit_amount !== (plan === 'monthly' ? 499 : 3999) || price.recurring?.interval !== (plan === 'monthly' ? 'month' : 'year') || price.recurring?.interval_count !== 1) fail(503, 'Membership pricing is being configured.');
      const customer = customers[0] || await stripe('customers', { email: player.email, 'metadata[pengame_user_id]': player.id }, `pengame-customer-${player.id}`);
      // Reuse an open session across plans; do not allow concurrent subscriptions.
      const open = await stripe(`checkout/sessions?customer=${customer.id}&status=open&limit=100`);
      const existing = open.data.find(s => s.metadata?.pengame === 'game-pass');
      if (existing) return json({ url: existing.url });
      const checkout = await stripe('checkout/sessions', { mode: 'subscription', customer: customer.id, client_reference_id: player.id, 'line_items[0][price]': priceId, 'line_items[0][quantity]': '1', 'metadata[pengame]': 'game-pass', 'subscription_data[metadata][pengame_user_id]': player.id, success_url: `${returnUrl}?checkout=success`, cancel_url: `${returnUrl}?checkout=canceled` }, `pengame-checkout-${player.id}-${Math.floor(Date.now() / 1800000)}`);
      return json({ url: checkout.url });
    } catch (error) { return json({ error: error.status ? error.message : 'Service temporarily unavailable. Please try again.' }, error.status || 503); }
  },
};
