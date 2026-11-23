/*
 * PenGame sign-in gate. Add one line to the <head> of a game or AR/VR book:
 *   <script src="https://pengamepublishing.com/pengame-gate.js" data-item="porch-war"></script>
 * data-item is the item's id in src/data/purchases.json.
 *
 * While https://pengamepublishing.com/gate-config.json says the gate is off, this does nothing.
 * When it is on, the page is covered until the player has a valid play token for this item.
 * Players get a token from https://pengamepublishing.com/play after signing in with the email
 * they paid with (Games Pass or a one-time purchase). Tokens last 24 hours on that device.
 * If the PenGame servers can't be reached, the game opens rather than locking out paying players.
 */
(function () {
  var script = document.currentScript;
  var item = script && script.getAttribute('data-item');
  if (!item || !/^[a-z0-9-]+$/.test(item)) return;
  var SITE = 'https://pengamepublishing.com';
  var KEY = 'pg_play_' + item;
  var root = document.documentElement;

  var css = document.createElement('style');
  css.textContent =
    'html.pg-locked body>*:not(#pg-gate){visibility:hidden!important}' +
    '#pg-gate{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:24px;' +
    'background:radial-gradient(ellipse at 70% 20%,#1d3566,#0a1730 70%);color:#f4f5ff;font:16px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;text-align:center}' +
    '#pg-gate .pg-card{max-width:420px}' +
    '#pg-gate .pg-mark{display:inline-grid;place-items:center;width:64px;height:64px;border-radius:50%;margin-bottom:18px;font-weight:800;font-size:22px;color:#0a1730;' +
    'background:linear-gradient(105deg,#8a5a12,#f7e2a6 30%,#d9a53a 55%,#fff3c4 70%,#b07c22)}' +
    '#pg-gate h1{margin:0 0 10px;font-size:28px;line-height:1.15;color:#F2D27A}' +
    '#pg-gate p{margin:0 0 22px;color:#b4c0d8}' +
    '#pg-gate a{display:inline-block;padding:14px 22px;border-radius:10px;background:#F2D27A;color:#0a1730;font-weight:800;text-decoration:none}' +
    '#pg-gate a:focus-visible{outline:3px solid #fff;outline-offset:4px}' +
    '#pg-gate small{display:block;margin-top:16px;color:#8d9bb8;font-size:13px}';
  (document.head || root).appendChild(css);
  root.classList.add('pg-locked');

  function unlock() {
    root.classList.remove('pg-locked');
    var g = document.getElementById('pg-gate');
    if (g) g.remove();
  }
  function lock(message) {
    var show = function () {
      if (document.getElementById('pg-gate')) return;
      var back = location.href.split('#')[0];
      var g = document.createElement('div');
      g.id = 'pg-gate';
      g.setAttribute('role', 'dialog');
      g.setAttribute('aria-modal', 'true');
      g.setAttribute('aria-labelledby', 'pg-gate-title');
      g.innerHTML =
        '<div class="pg-card"><span class="pg-mark" aria-hidden="true">PG</span>' +
        '<h1 id="pg-gate-title">Sign in to play</h1>' +
        '<p>' + (message || 'This PenGame world is part of the Games Pass, or you can buy it on its own.') + '</p>' +
        '<a id="pg-gate-go">Sign in or get access</a>' +
        '<small>Use the email you paid with. Questions: Info@pengamepublishing.com</small></div>';
      g.querySelector('#pg-gate-go').href = SITE + '/play?item=' + encodeURIComponent(item) + '&return=' + encodeURIComponent(back);
      document.body.appendChild(g);
      g.querySelector('#pg-gate-go').focus();
    };
    if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
  }
  function store(token) { try { localStorage.setItem(KEY, token); } catch (e) {} }
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function forget() { try { localStorage.removeItem(KEY); } catch (e) {} }

  // A token handed back from /play arrives in the address fragment; keep it and tidy the address.
  var match = location.hash.match(/[#&]pg_token=([^&]+)/);
  if (match) {
    store(decodeURIComponent(match[1]));
    var clean = location.hash.replace(/[#&]pg_token=[^&]+/, '').replace(/^#?&?/, '');
    history.replaceState(null, '', location.pathname + location.search + (clean ? '#' + clean : ''));
  }

  fetch(SITE + '/gate-config.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : { enabled: false }; })
    .then(function (cfg) {
      if (!cfg || !cfg.enabled || !cfg.apiUrl) return unlock();
      var token = stored();
      if (!token) return lock();
      return fetch(cfg.apiUrl + '/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ item: item, token: token }) })
        .then(function (r) {
          if (!r.ok) return unlock(); // server trouble: don't lock out paying players
          return r.json().then(function (v) {
            if (v && v.ok) return unlock();
            forget();
            lock('Your access has ended or needs refreshing. Sign in again to keep playing.');
          });
        });
    })
    .catch(unlock);
})();
