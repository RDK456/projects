'use strict';
const USER = 'RDK456';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
// Motion is on by default. The OS reduced-motion flag is often set by accident, so the header switch decides (saved in this browser).
const RM = (() => { try { return localStorage.getItem('rdk-motion') === 'off'; } catch { return false; } })();
document.documentElement.classList.toggle('calm', RM);
const G = window.gsap && window.ScrollTrigger && window.Flip; // every animation is optional: the page works without GSAP
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const svg = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = { dl: svg('<path d="M12 3v12m0 0-5-5m5 5 5-5M4 20h16"/>'), info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>'), go: svg('<path d="M7 17 17 7M8 7h9v9"/>') };

/* ---------- content that GitHub does not provide ---------- */
// Hand-written details for the apps I curated. Any other public repo is picked up automatically (see auto()).
const P0 = [
  { repo: '1-download-manager', name: '1 download manager', a: '#5b8cff', plats: ['Android', 'Windows', 'Browser'],
    line: 'One queue for every download.',
    desc: 'A free download manager for Android and Windows: direct links, YouTube, torrents and free media libraries in one queue, with browser extensions for Chrome and Firefox.',
    feats: [['Fast, resumable downloads', 'Segmented HTTP and HTTPS with pause, resume, retry and a speed limit.'], ['Batch download', 'Paste many links at once, or a range like file[001-120].jpg.'],
      ['YouTube', 'Videos, playlists, albums and channels, in your choice of quality or as M4A, MP3, Opus or WAV audio.'], ['Torrents', 'Magnet links and .torrent files, with file selection.'],
      ['Internet Archive', 'Browse archive.org and download a whole item in one click.'], ['Browser extensions', 'Chrome and Firefox hand downloads to the app.'], ['Themes', 'Light, dark and AMOLED with nine colour palettes.']],
    shots: [['Windows app', 'dm-desktop'], ['Download queue', 'dm-android-downloads'], ['Discover', 'dm-android-discover'], ['Internet Archive browser', 'dm-android-archive'], ['YouTube downloader', 'dm-android-youtube']], phones: ['dm-android-downloads', 'dm-android-discover', 'dm-android-youtube'] },
  { repo: 'ThermalScope', name: 'ThermalScope', a: '#ff7a3d', plats: ['Windows'],
    line: 'Watch your temperatures and pace your frames.',
    desc: 'A portable Windows hardware monitor with DirectX FPS monitoring and a frame pacer, in one window.',
    feats: [['Monitor', 'CPU and GPU temperature, load, clock and power on heat-ramp dials, with history and a live sensor list.'], ['Frame pacer', 'Limits a game’s frame rate with evenly spaced frames and shows live FPS and frame time.'],
      ['In-game overlay', 'Hotkeys, a tray icon and an overlay, with 32-bit and DirectX 9 games supported.'], ['Self-contained', 'Needs no MSI Afterburner, RTSS or other tool, and no administrator rights to start.'],
      ['Small updates', 'Delta packages are usually under 1 MB instead of about 68 MB, checked against SHA256 sums.'], ['Honest CPU temperature', 'It never shows a motherboard reading as the CPU die temperature.']], hero: 'ts-monitor', shots: [['Monitor: CPU and GPU dials', 'ts-monitor'], ['Frame pacer', 'ts-pacer']] },
  { repo: 'forget-it', name: 'Forget-it', a: '#a37bff', plats: ['Android'],
    line: 'Never miss a renewal, EMI or bill.',
    desc: 'An offline Android tracker for subscriptions, EMIs and loans, bills, and household stock. It scans SMS, email, photos and spreadsheets on the phone.',
    feats: [['Four trackers in one', 'Subscriptions, EMIs and loans, bills and utilities, and household stock.'], ['Scan anything', 'Take a photo or share a screenshot. Text is read on the phone and sorted into the right tracker for you to review.'],
      ['Payment detection', 'Optional SMS and email alerts become transactions, with ads, promos and failed payments filtered out.'], ['Voice entry for stock', 'Say “2 litres milk” or “half kg sugar”.'],
      ['Reminders and widget', 'Several reminders per item, snooze, a weekly summary and a home-screen widget.'], ['Offline by default', 'No account needed. The network is used only for the optional Gmail sync.'],
      ['Backups', 'CSV and Excel import and export, plus a full backup that includes photos.']], phones: ['fi-overview', 'fi-subs', 'fi-money'], shots: [['Overview', 'fi-overview'], ['Money and budget', 'fi-money'], ['Subscriptions', 'fi-subs'], ['Loans and EMIs', 'fi-loans'], ['Household stock', 'fi-stock']] },
  { repo: 'appDash', name: 'AppDash', a: '#34d3a0', plats: ['Android', 'Windows'],
    line: 'See what is installed, used and taking space.',
    desc: 'See every app on your PC or phone: what is installed, what you actually use, how much space it takes, and what can be updated.',
    feats: [['Every app in one list', 'Installed and portable apps on Windows, and your apps and system apps on Android, with sizes.'], ['What you actually use', 'Usage from Windows launch history and Android screen time, so you can remove rarely used apps in bulk.'],
      ['Updates', 'Windows updates through winget and Chocolatey. On Android: Play Store, F-Droid and GitHub updates.'], ['Disk space by file type', 'Videos, archives, documents and the largest files, with Recycle Bin or permanent delete.'],
      ['Small updates', 'The Windows app updates itself with small delta packages.']], phones: ['ad-android-home', 'ad-android-apps', 'ad-android-updates'], shots: [['Windows disks', 'ad-win-disks'], ['Android home', 'ad-android-home'], ['Android apps', 'ad-android-apps'], ['Android updates', 'ad-android-updates']] },
  { repo: 'openCam', name: 'openCam', a: '#2fb6c9', plats: ['Android', 'Windows'],
    line: 'Your phone as a webcam for any Windows app.',
    desc: 'Use an Android phone as a webcam for Zoom, Teams, Chrome and OBS, over USB or Wi-Fi. No resolution cap and no watermark.',
    feats: [['Every Windows app sees it', 'A real Windows 11 virtual camera, so no OBS plugin is needed.'], ['USB or Wi-Fi', 'USB through adb, or Wi-Fi with automatic discovery or a 5-digit pairing code.'], ['Up to 4K at 60 fps', 'Hardware H.264 encoding on the phone, with no time limit.'],
      ['Full camera control', 'Zoom, flip, torch, focus, exposure, stabilisation, Pro mode and Portrait blur, from either side.'], ['Battery friendly', 'The camera runs only while something is watching.'], ['Hands-off', 'Starts with Windows, reconnects by itself and updates from GitHub Releases.']],
    hero: 'oc-live', shots: [['Windows live feed', 'oc-live'], ['Android controls', 'oc-phone'], ['Finding a phone', 'oc-connect'], ['Settings', 'oc-settings']] },
  { repo: '1-stream', name: '1-stream', a: '#e5484d', plats: ['Windows'],
    line: 'A Windows media player that streams from your plugins.',
    desc: 'A Windows desktop media player with a Netflix-style interface. It ships with no content sources: you install the plugins you want. Based on CloudStream.',
    feats: [['Plugins', 'Plain JVM jars in isolated class loaders, plus converted Android plugins. Every download is SHA-256 verified.'], ['Library and history', 'Add titles to a library, resume where you stopped and see Continue watching on Home.'], ['Built-in player', 'libVLC with HLS and DASH, speed, source, audio and subtitle settings, and full keyboard control.'],
      ['Downloads', 'A quality picker for direct files and HLS.'], ['Scales down', 'Works at any window size, down to 420 px wide.'], ['Small updates', 'Delta patches for the app, and plugins update every 6 hours.']],
    hero: '1s-home', shots: [['Home', '1s-home'], ['Title page', '1s-details'], ['Playback settings', '1s-player-settings'], ['Plugins', '1s-plugins'], ['Player shortcuts', '1s-player-shortcuts']] },,
  { repo: 'open-dock', name: 'Open Dock', a: '#7c6cff', plats: ['Android', 'Windows', 'macOS'],
    line: 'Your phone as a control deck for your PC.',
    desc: 'A phone control deck with a local PC companion. Pair by QR code on the same Wi-Fi, then send media keys, shortcuts and voice commands. A modified fork of Freeze.',
    feats: [['Pair by QR code', 'The desktop app shows a code; scan it on the phone over the same Wi-Fi.'], ['Media keys and shortcuts', 'Control playback and trigger shortcuts on Windows or macOS.'], ['Hands-free voice', 'Say "hey dock" on the PC, with offline voice when run as admin.'], ['Per-look layouts', 'Separate layouts and floating navigation on the phone.'], ['Delta updates', 'After the first install it downloads only what changed.']], shots: [] },
  { repo: 'open-connect', name: 'Open Connect', a: '#3ba0ff', plats: ['Android', 'Windows'],
    line: 'Move files between your phone and PC over Wi-Fi.',
    desc: 'Browse and share files between Android and Windows on the same network, with no cable and no account.',
    feats: [['Send to…', 'Push files or a selection straight into another device’s Downloads, with progress and a toast on the receiver.'], ['Stays available', 'A persistent notification shows the address and device count, and sharing keeps running after the app is swiped away.'], ['Battery aware', 'Stops 15 seconds after leaving Wi-Fi when the app is not on screen.'], ['In-app updates', 'The Windows app updates itself.']], shots: [] },
  { repo: 'bookmark', name: 'Bookmark', a: '#ffb02e', plats: ['Web'],
    line: 'A bookmark manager with social previews.',
    desc: 'A web bookmark manager that fetches rich previews for saved links, with a browser extension and a Supabase backend.',
    feats: [['Social previews', 'Saved links show a title, image and description pulled from the page.'], ['Browser extension', 'Save the current page in one click.'], ['Source only', 'No release yet. Run it from the repository.']], shots: [] }
];
const CUR = Object.fromEntries(P0.map(p => [p.repo, p]));
let P = [];
const LANG = { Kotlin: '#a97bff', JavaScript: '#f1e05a', PowerShell: '#5391fe', HTML: '#e34c26', 'C#': '#3fb950', 'C++': '#f34b7d', Batchfile: '#c1f12e', Shell: '#89e051', CSS: '#7f5fd0', TypeScript: '#3178c6' };

/* ---------- illustrations (not screenshots) for apps without public screenshots ---------- */
const win = (inner, label) => `<svg viewBox="0 0 520 320" role="img" aria-label="${label}"><rect x="4" y="4" width="512" height="312" rx="14" fill="#1a1216" stroke="#ffffff30" stroke-width="2"/><path d="M4 18a14 14 0 0 1 14-14h484a14 14 0 0 1 14 14v20H4Z" fill="#2a1e24"/><circle cx="26" cy="21" r="5" fill="#ff5d7a"/><circle cx="44" cy="21" r="5" fill="#e0a526"/><circle cx="62" cy="21" r="5" fill="#55c47f"/>${inner}</svg>`;
const genericArt = p => win(`<text x="260" y="190" text-anchor="middle" fill="${p.a}" font-size="130" font-weight="800" font-family="sans-serif">${esc(p.name[0])}</text><text x="260" y="245" text-anchor="middle" fill="#b7a9ad" font-size="16" font-family="sans-serif">${esc(p.name)}</text>`, `Illustration for ${esc(p.name)}`);
const media = p => p.phones ? `<div class="phones">${p.phones.map(f => `<img src="img/${f}.png" alt="" loading="lazy">`).join('')}</div>` : p.hero ? `<img src="img/${p.hero}.png" alt="" loading="lazy">` : genericArt(p);

/* ---------- helpers ---------- */
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const ago = d => { const s = (new Date(d) - Date.now()) / 1000; for (const [u, n] of [['year', 31536e3], ['month', 2592e3], ['day', 86400], ['hour', 3600], ['minute', 60]]) if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), u); return 'just now'; };
const day = d => new Date(d).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' });
const size = b => b < 1048576 ? Math.max(1, Math.round(b / 1024)) + ' KB' : (b / 1048576).toFixed(b > 1e8 ? 0 : 1) + ' MB';
const dev = /Android/i.test(navigator.userAgent) ? 'Android' : /Windows/i.test(navigator.userAgent) ? 'Windows' : '';
const isMeta = n => /\.(json|patch|nupkg)$|SHA256SUMS|^RELEASES$|delta\.zip$/i.test(n);
const kind = n => /\.apk$/i.test(n) ? 'Android' : /chrome.*\.zip$/i.test(n) ? 'Chrome' : /\.xpi$/i.test(n) ? 'Firefox' : /(\.msi|\.exe|win.*\.zip|portable\.zip)$/i.test(n) ? 'Windows' : '';
const KO = ['Android', 'Windows', 'Chrome', 'Firefox'];
const inl = s => s.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
const md = src => { let h = '', ul = false; for (const l of esc(src || '').split(/\r?\n/)) { const li = l.match(/^\s*[-*]\s+(.*)/); if (li) { if (!ul) { h += '<ul>'; ul = true; } h += `<li>${inl(li[1])}</li>`; continue; } if (ul) { h += '</ul>'; ul = false; } const hd = l.match(/^#{1,6}\s+(.*)/); if (hd) h += `<h4>${inl(hd[1])}</h4>`; else if (l.trim()) h += `<p>${inl(l)}</p>`; } return h + (ul ? '</ul>' : '') || '<p>No release notes.</p>'; };
const gist = b => (b || '').split(/\r?\n/).map(s => s.replace(/^[#>*\-\s]+/, '').replace(/\*\*|`/g, '').trim()).find(Boolean) || 'No release notes.';

let DATA = { repos: {}, generated: null };
// New repos get a card built from their GitHub description, language and release assets.
const hue = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
const auto = (repo, d) => {
  const ks = new Set((d.releases[0]?.assets || []).filter(a => !isMeta(a.name)).map(a => kind(a.name)).map(k => k === 'Chrome' || k === 'Firefox' ? 'Browser' : k).filter(Boolean)), desc = d.meta?.description;
  return { repo, name: repo.replace(/[-_]+/g, ' ').replace(/^./, c => c.toUpperCase()), a: `hsl(${hue(repo)} 85% 62%)`, plats: ks.size ? [...ks] : ['Source'],
    line: desc || 'A project on GitHub.', desc: desc || 'No description yet. See the source on GitHub.', feats: [], shots: [], auto: true };
};
const sync = () => { P = Object.entries(DATA.repos).map(([k, d]) => CUR[k] || auto(k, d)); };
const rel = p => DATA.repos[p.repo]?.releases || [];
const latest = p => rel(p)[0];
const stamp = p => new Date(latest(p)?.date || 0).getTime() || new Date(DATA.repos[p.repo]?.meta?.pushed || 0).getTime() / 1e3;
const ranked = () => [...P].sort((a, b) => stamp(b) - stamp(a));
const mainAssets = r => (r?.assets || []).filter(a => !isMeta(a.name) && kind(a.name)).sort((a, b) => (kind(b.name) === dev) - (kind(a.name) === dev) || KO.indexOf(kind(a.name)) - KO.indexOf(kind(b.name)));
const best = p => { const r = latest(p), as = mainAssets(r), pick = as.find(a => kind(a.name) === (dev || 'Windows') && /setup|\.msi|universal/i.test(a.name)) || as.find(a => kind(a.name) === dev) || as[0]; return pick?.url || r?.url || `https://github.com/${USER}/${p.repo}`; };
const fresh = r => r && Date.now() - new Date(r.date) < 14 * 864e5;

/* ---------- smooth scroll, header, progress, intro, hero ---------- */
// Reduced motion keeps fades and drops movement, pinning, cursor effects and the intro.
const mv = n => RM ? 0 : n;
const FINE = matchMedia('(pointer: fine)').matches;
const lenis = !RM && window.Lenis ? new Lenis({ lerp: .09, anchors: true }) : null;
if (G) {
  gsap.registerPlugin(ScrollTrigger, Flip);
  if (lenis) { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
  gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });
} else if (lenis) { const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
addEventListener('scroll', () => $('#topbar').classList.toggle('solid', scrollY > 20), { passive: true });

const mo = $('#motion');
mo.setAttribute('aria-pressed', !RM); mo.lastElementChild.textContent = RM ? 'Motion off' : 'Motion on';
mo.onclick = () => { try { localStorage.setItem('rdk-motion', RM ? 'on' : 'off'); } catch { /* storage unavailable */ } location.reload(); };

const split = el => { el.innerHTML = el.textContent.split(' ').map(w => `<span class="ln"><span>${esc(w)}</span></span>`).join(' '); };
split($('#h1')); $$('.head h2').forEach(split);
const heroIn = () => {
  if (!G) return;
  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .from('#topbar .bar > *', { y: mv(-20), opacity: 0, duration: .9, stagger: .06 })
    .from('#h1 .ln > span', { yPercent: mv(115), opacity: RM ? 0 : 1, duration: 1.4, stagger: .08 }, .05)
    .from('.lede, .stats > div', { y: mv(26), opacity: 0, duration: 1, stagger: .08 }, .55)
    .from('#marquee', { opacity: 0, y: mv(30), duration: 1 }, .8);
};
const intro = $('#intro');
if (G && !RM) {
  lenis?.stop(); const n = $('#intro-n'), o = { v: 0 };
  const done = () => { intro.remove(); lenis?.start(); };
  gsap.timeline({ onComplete: done })
    .to(o, { v: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: () => { n.textContent = Math.round(o.v); } })
    .to('.intro-t', { yPercent: -110, opacity: 0, duration: .6, ease: 'power3.in' }, '-=.15')
    .to(intro, { yPercent: -100, duration: .9, ease: 'power4.inOut' }, '-=.2')
    .add(heroIn, '-=.6');
  setTimeout(() => intro.isConnected && done(), 5000); // never trap the page behind the curtain
} else { intro.remove(); heroIn(); }

/* ---------- ambient mesh, cursor, magnetic buttons, card tilt ---------- */
const meshColors = ps => $$('.mesh i').forEach((el, i) => ps[i] && el.style.setProperty('--c', ps[i].a));
if (G && !RM) {
  const drift = el => gsap.to(el, { x: () => gsap.utils.random(-.25 * innerWidth, .25 * innerWidth), y: () => gsap.utils.random(-.2 * innerHeight, .2 * innerHeight), scale: () => gsap.utils.random(.8, 1.3), duration: () => gsap.utils.random(9, 16), ease: 'sine.inOut', onComplete: () => drift(el) });
  $$('.mesh i').forEach(drift);
}
if (G && !RM && FINE) {
  document.body.classList.add('has-cursor');
  const c = $('#cursor'), xTo = gsap.quickTo(c, 'x', { duration: .35, ease: 'power3' }), yTo = gsap.quickTo(c, 'y', { duration: .35, ease: 'power3' });
  addEventListener('pointermove', e => { c.classList.add('on'); xTo(e.clientX); yTo(e.clientY); });
  document.addEventListener('pointerover', e => c.classList.toggle('hot', !!e.target.closest?.('a, button, [data-app], input')));
  document.addEventListener('pointermove', e => {
    const b = e.target.closest?.('.btn'), k = e.target.closest?.('.card');
    if (b) { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .25, y: (e.clientY - r.top - r.height / 2) * .35, duration: .4, ease: 'power3.out', overwrite: 'auto' }); }
    if (k) { const r = k.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; gsap.to($('.thumb', k), { rotationY: x * 12, rotationX: -y * 12, transformPerspective: 800, duration: .5, ease: 'power3.out', overwrite: 'auto' }); }
  });
  document.addEventListener('pointerout', e => {
    const b = e.target.closest?.('.btn'), k = e.target.closest?.('.card');
    if (b && !b.contains(e.relatedTarget)) gsap.to(b, { x: 0, y: 0, duration: .9, ease: 'elastic.out(1, .4)' });
    if (k && !k.contains(e.relatedTarget)) gsap.to($('.thumb', k), { rotationX: 0, rotationY: 0, duration: .7, ease: 'power3.out' });
  });
}

/* ---------- stats ---------- */
const countUp = (el, n) => {
  if (!G || el.dataset.done) { el.textContent = n.toLocaleString(); return; }
  el.dataset.done = 1; const o = { v: 0 };
  gsap.to(o, { v: n, duration: 1.8, ease: 'power3.out', delay: RM ? 0 : 2.2, onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString(); } });
};
function buildStats() {
  const dls = P.reduce((n, p) => n + rel(p).reduce((m, r) => m + r.assets.reduce((k, a) => k + (a.dl || 0), 0), 0), 0);
  const rels = P.reduce((n, p) => n + rel(p).length, 0);
  const box = $('#stats');
  if (!box.children.length) box.innerHTML = [['Apps', 'apps'], ['Releases shipped', 'rels'], ['Downloads', 'dls']].map(([l, k]) => `<div><dt>${l}</dt><dd data-k="${k}">0</dd></div>`).join('');
  countUp($('[data-k=apps]'), P.length); countUp($('[data-k=rels]'), rels); countUp($('[data-k=dls]'), dls);
}

/* ---------- marquee: app names, speeds up with scroll velocity ---------- */
let mq;
function buildMarquee() {
  const ps = ranked(), base = []; if (!ps.length) return;
  while (base.length < 8) base.push(...ps);
  const half = base.map(p => `<span style="--c:${p.a}">${esc(p.name)}</span>`).join('');
  $('#track').innerHTML = half + half;
  if (!G || RM || mq) return;
  mq = gsap.to('#track', { xPercent: -50, repeat: -1, duration: 40, ease: 'none' });
  let back; ScrollTrigger.create({ onUpdate: s => { mq.timeScale(1 + gsap.utils.clamp(-10, 10, s.getVelocity() / 140)); back?.kill(); back = gsap.to(mq, { timeScale: 1, duration: .9, delay: .05 }); } });
}

/* ---------- showcase: pinned, scroll-scrubbed tour of the five newest apps ---------- */
let featPs = [], mm;
const slideHTML = p => { const l = latest(p); return `<div class="s-in"><div class="s-copy"><span class="tag"><b>${fresh(l) ? 'New release' : 'Latest'}</b>${l ? `<span>${esc(l.tag)}</span><span>${ago(l.date)}</span>` : ''}</span>
  <h2>${esc(p.name)}</h2><p>${esc(p.line)}${p.desc === p.line ? '' : ' ' + esc(p.desc)}</p>
  <div class="btns"><a class="btn play" href="${best(p)}">${ICON.dl} Download</a><button class="btn info" type="button" data-app="${p.repo}">${ICON.info} More info</button></div></div><div class="s-art">${media(p)}</div></div>`; };
function buildShowcase() {
  featPs = ranked().filter(latest).slice(0, 5);
  const s = $('#showcase'); mm?.revert();
  if (!featPs.length) { s.hidden = true; return; } s.hidden = false;
  s.style.setProperty('--a', featPs[0].a);
  s.innerHTML = `<div class="s-stage">${featPs.map((p, i) => `<div class="s-slide" data-i="${i}" style="--a:${p.a}">${slideHTML(p)}</div>`).join('')}</div>
    <div class="s-dots">${featPs.map((p, i) => `<button type="button" class="dot${i ? '' : ' on'}" data-i="${i}" aria-label="Show ${esc(p.name)}"><span>${esc(p.name)}</span></button>`).join('')}</div>`;
  if (!G) return;
  mm = gsap.matchMedia();
  mm.add('(min-width: 901px) and (min-height: 620px)', () => {
    if (RM) { s.classList.add('stack'); gsap.from('.s-slide', { opacity: 0, duration: .8, stagger: .1, scrollTrigger: { trigger: s, start: 'top 80%', once: true } }); return () => s.classList.remove('stack'); }
    const slides = $$('.s-slide', s), n = slides.length, dots = $$('.dot', s);
    s.classList.add('pinned'); gsap.set(slides.slice(1), { autoAlpha: 0 });
    const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: s, start: 'top top', end: () => '+=' + (n - 1) * innerHeight * .85, pin: true, scrub: .7, anticipatePin: 1, invalidateOnRefresh: true,
      snap: n > 1 ? { snapTo: 1 / (n - 1), duration: { min: .25, max: .7 }, delay: .04, ease: 'power2.inOut' } : false,
      onUpdate: self => { const i = Math.round(self.progress * (n - 1)); dots.forEach((d, k) => d.classList.toggle('on', k === i)); } } });
    for (let i = 1; i < n; i++) {
      const at = i - 1;
      tl.to(slides[i - 1], { autoAlpha: 0, yPercent: -7, scale: .96, duration: .45 }, at)
        .to(s, { '--a': featPs[i].a, duration: .7 }, at + .1)
        .fromTo(slides[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: .3 }, at + .4)
        .fromTo($$('.s-copy > *', slides[i]), { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: .45, stagger: .06, ease: 'power2.out' }, at + .4)
        .fromTo($('.s-art', slides[i]), { yPercent: 14, scale: .85, rotate: 4 }, { yPercent: 0, scale: 1, rotate: 0, duration: .6, ease: 'power2.out' }, at + .4);
    }
    const st = tl.scrollTrigger;
    const go = e => { const d = e.target.closest('.dot'); if (!d) return; const y = st.start + (st.end - st.start) * (+d.dataset.i / (n - 1)); lenis ? lenis.scrollTo(y) : scrollTo({ top: y, behavior: 'smooth' }); };
    s.addEventListener('click', go);
    return () => { s.removeEventListener('click', go); s.classList.remove('pinned'); };
  });
  mm.add('(max-width: 900px), (max-height: 619px)', () => {
    gsap.from('.s-slide', { opacity: 0, y: mv(40), duration: .9, ease: 'power3.out', stagger: .1, scrollTrigger: { trigger: s, start: 'top 80%', once: true } });
  });
}

/* ---------- app grid with Flip filtering, release list ---------- */
const card = (p, r) => { const l = r || latest(p); return `<article class="card" tabindex="0" role="button" data-app="${p.repo}"${r ? ` data-rel="${esc(r.tag)}"` : ''} style="--a:${p.a}" data-plats="${p.plats.join(',')}" data-s="${esc([p.name, p.line, p.desc, p.plats.join(' '), Object.keys(DATA.repos[p.repo]?.languages || {}).join(' ')].join(' ').toLowerCase())}" aria-label="${esc(p.name)}">
  <div class="thumb">${media(p)}${fresh(l) ? '<span class="new">New</span>' : ''}</div>
  <div class="info"><h3>${esc(p.name)}</h3><p>${esc(p.line)}</p><div class="foot-row"><span>${l ? `<b>${esc(l.tag)}</b>${ago(l.date)}` : 'Source only'}</span><span class="plats">${p.plats.map(x => `<span class="badge">${x}</span>`).join('')}</span></div></div></article>`; };
const relRow = ({ p, r }) => `<div class="rel" tabindex="0" role="button" data-app="${p.repo}" data-rel="${esc(r.tag)}" style="--a:${p.a}" data-s="${esc((p.name + ' ' + r.tag + ' ' + gist(r.body)).toLowerCase())}">
  <span class="n"><i></i>${esc(p.name)}</span><span class="v">${esc(r.tag)}</span><span class="g">${esc(gist(r.body))}</span><time datetime="${r.date}">${ago(r.date)}</time><span class="go">${ICON.go}</span></div>`;

const view = { plat: 'All', q: '' };
let built = false;
function buildLists() {
  const ps = ranked(), feed = ps.flatMap(p => rel(p).map(r => ({ p, r }))).sort((a, b) => new Date(b.r.date) - new Date(a.r.date)).slice(0, 12);
  $('#grid').innerHTML = ps.map(p => card(p)).join('');
  $('#rels').innerHTML = feed.map(relRow).join('');
  const count = k => ps.filter(p => k === 'All' || p.plats.includes(k)).length;
  const ks = ['All', ...['Android', 'Windows', 'Browser', 'Source'].filter(k => ps.some(p => p.plats.includes(k)))];
  if (!ks.includes(view.plat)) view.plat = 'All';
  $('#filters').innerHTML = ks.map(k => `<button type="button" class="chip${k === view.plat ? ' on' : ''}" data-plat="${k}" aria-pressed="${k === view.plat}">${k}<small>${count(k)}</small></button>`).join('');
  applyFilter(false);
  if (G && !built) {
    gsap.set(".card, .rel", { opacity: 0, y: mv(44) });
    for (const sel of [".card", ".rel"]) ScrollTrigger.batch(sel, { start: "top 92%", once: true,
      onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: .08, clearProps: "transform,opacity" }) });
    $$(".head h2").forEach(h => gsap.from(h.querySelectorAll(".ln > span"), { yPercent: mv(115), opacity: RM ? 0 : 1, duration: 1.1, ease: "power4.out", stagger: .07, scrollTrigger: { trigger: h, start: "top 88%", once: true } }));
    gsap.from(".chips-row .chip", { opacity: 0, y: mv(16), duration: .7, ease: "power3.out", stagger: .05, scrollTrigger: { trigger: "#filters", start: "top 92%", once: true } });
    if (!RM) {
      gsap.from("#mega", { yPercent: 45, ease: "none", scrollTrigger: { trigger: "footer", start: "top bottom", end: "bottom bottom", scrub: true } });
      gsap.to(".hero h1", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    }
  }
  built = true; if (G) ScrollTrigger.refresh();
}
function applyFilter(animate) {
  const cards = $$('#grid .card'), ok = c => (view.plat === 'All' || c.dataset.plats.split(',').includes(view.plat)) && (!view.q || c.dataset.s.includes(view.q));
  const st = G && animate ? Flip.getState(cards) : null;
  cards.forEach(c => c.classList.toggle('off', !ok(c)));
  if (st) Flip.from(st, { duration: .7, ease: 'power3.inOut', absolute: true, stagger: .03,
    onEnter: e => gsap.fromTo(e, { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: .5, clearProps: 'transform,opacity' }),
    onLeave: e => gsap.to(e, { opacity: 0, scale: .92, duration: .3 }) });
  $$('#rels .rel').forEach(r => r.classList.toggle('off', !!view.q && !r.dataset.s.includes(view.q)));
  $('#empty').hidden = cards.some(c => !c.classList.contains('off'));
}

/* ---------- details modal: releases are the episodes ---------- */
const modal = $('#modal'), lightbox = $('#lightbox');
function openApp(repo, relTag) {
  const p = P.find(x => x.repo === repo); if (!p) { closeModal(); return; }
  const R = rel(p), L = R[0], langs = DATA.repos[p.repo]?.languages || {}, tot = Object.values(langs).reduce((a, b) => a + b, 0) || 1;
  const dls = R.reduce((n, r) => n + r.assets.reduce((m, a) => m + (a.dl || 0), 0), 0);
  const as = mainAssets(L), extra = (L?.assets || []).filter(a => isMeta(a.name));
  const top = Object.entries(langs).sort((a, b) => b[1] - a[1]);
  const shots = p.shots.length ? p.shots.map(([c, f]) => `<figure><button type="button" data-img="img/${f}.png" aria-label="Enlarge ${esc(c)}"><img src="img/${f}.png" alt="${esc(c)}" loading="lazy"></button><figcaption>${esc(c)}</figcaption></figure>`).join('') : '';
  const rk = ranked(), i = rk.indexOf(p), nb = [rk[(i + rk.length - 1) % rk.length], rk[(i + 1) % rk.length]];
  modal.style.setProperty('--a', p.a);
  modal.innerHTML = `<button type="button" class="icon-btn close" aria-label="Close details">&times;</button>
  <div class="m-media"><div class="bd"></div><div class="bd-media">${media(p)}</div>
    <div class="m-head"><h2>${esc(p.name)}</h2><div class="btns"><a class="btn play" href="${best(p)}">${L ? ICON.dl + ' Download' : 'View on GitHub'}</a>${L ? `<a class="btn info" href="https://github.com/${USER}/${p.repo}" target="_blank" rel="noopener">GitHub</a>` : ''}</div></div></div>
  <div class="m-body">
    <div class="m-cols"><div>
      <div class="meta">${L ? `<span class="good">${esc(L.tag)}</span><span>${day(L.date)}</span>` : ''}${p.plats.map(x => `<span class="badge">${x}</span>`).join('')}${(DATA.repos[p.repo]?.meta?.topics || []).map(t => `<span class="badge">${esc(t)}</span>`).join('')}</div>
      <p>${esc(p.desc)}</p><ul class="feat">${p.feats.map(([h, t]) => `<li><b>${esc(h)}.</b> ${esc(t)}</li>`).join('')}</ul></div>
      <dl class="side"><div><dt>Platforms</dt><dd>${p.plats.join(', ')}</dd></div>
        <div><dt>Written in</dt><dd>${top.slice(0, 3).map(([n, b]) => `${n} ${Math.round(b / tot * 100)}%`).join(', ')}<div class="lang">${top.map(([n, b]) => `<i title="${n}" style="flex:${b};background:${LANG[n] || '#888'}"></i>`).join('')}</div></dd></div>
        <div><dt>Downloads so far</dt><dd>${dls.toLocaleString()}</dd></div><div><dt>Releases</dt><dd>${R.length} shown, latest ${L ? ago(L.date) : 'none'}</dd></div></dl></div>
    ${L ? `<div class="sec"><h3>Get ${esc(L.tag)}</h3><div class="dl">${as.map(a => `<a href="${a.url}" class="${kind(a.name) === dev ? 'rec' : ''}"><span class="fn">${esc(a.name)}</span><span class="sz">${size(a.size)}</span><span class="rc">${kind(a.name) === dev ? 'Recommended for your device' : kind(a.name)}</span></a>`).join('') || `<a href="${L.url}"><span class="fn">View on GitHub</span></a>`}</div>
      ${extra.length ? `<details class="more-files"><summary>Updater and checksum files (${extra.length})</summary>${extra.map(a => `<a href="${a.url}">${esc(a.name)} (${size(a.size)})</a>`).join('')}</details>` : ''}</div>` : ''}
    ${R.length ? `<div class="sec"><h3>Releases</h3>${R.map(r => `<details class="ep" id="rel-${esc(r.tag)}"${r.tag === (relTag || L?.tag) ? ' open' : ''}><summary><span class="tg">${esc(r.tag)}</span><span><h4>${esc(r.name || r.tag)}</h4><small>${esc(gist(r.body))}</small></span><time datetime="${r.date}">${ago(r.date)}</time></summary>
      <div class="notes">${md(r.body)}<div class="chips">${mainAssets(r).slice(0, 8).map(a => `<a href="${a.url}">${esc(kind(a.name))} ${size(a.size)}</a>`).join('')}<a href="${r.url}" target="_blank" rel="noopener">Release page</a></div></div></details>`).join('')}</div>` : ''}
    ${shots ? `<div class="sec"><h3>Screenshots</h3><div class="shots">${shots}</div></div>` : ''}
    <div class="sec"><h3>More like this</h3><div class="similar">${ranked().filter(x => x !== p).map(x => card(x)).join('')}</div></div>
    <nav class="pn" aria-label="Other apps"><button type="button" data-app="${nb[0].repo}"><small>Previous</small>${esc(nb[0].name)}</button><button type="button" class="copy" data-copy>Copy link</button><button type="button" data-app="${nb[1].repo}"><small>Next</small>${esc(nb[1].name)}</button></nav>
    <div class="links"><a href="https://github.com/${USER}/${p.repo}" target="_blank" rel="noopener">Source on GitHub</a><a href="https://github.com/${USER}/${p.repo}/releases" target="_blank" rel="noopener">All releases</a><a href="https://github.com/${USER}/${p.repo}/issues" target="_blank" rel="noopener">Report an issue</a></div>
  </div>`;
  if (!modal.open) {
    modal.showModal(); document.body.classList.add('noscroll'); lenis?.stop();
    if (G) gsap.fromTo(modal, { y: 60, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: .7, ease: 'power3.out', clearProps: 'transform,opacity' });
  }
  if (G) gsap.from('.m-media .bd-media > *, .m-head > *', { y: 24, opacity: 0, duration: .8, ease: 'power3.out', stagger: .08, delay: .1 });
  modal.scrollTop = 0;
  const h = `#app=${repo}${relTag ? '&rel=' + encodeURIComponent(relTag) : ''}`;
  if (location.hash !== h) history.pushState(null, '', h);
  if (relTag) requestAnimationFrame(() => document.getElementById('rel-' + relTag)?.scrollIntoView({ block: 'center' }));
}
modal.addEventListener('close', () => { document.body.classList.remove('noscroll'); lenis?.start(); if (location.hash.startsWith('#app=')) history.pushState(null, '', location.pathname + location.search); });
const fromHash = () => { const m = location.hash.match(/^#app=([^&]+)(?:&rel=(.+))?/); if (m) openApp(m[1], m[2] && decodeURIComponent(m[2])); else closeModal(); };
addEventListener('popstate', fromHash);
const closeModal = () => {
  if (!modal.open) return;
  if (!G) return modal.close();
  gsap.to(modal, { y: 40, opacity: 0, scale: .97, duration: .3, ease: 'power2.in', onComplete: () => { modal.close(); gsap.set(modal, { clearProps: 'transform,opacity' }); } });
};

/* ---------- interaction ---------- */
document.addEventListener('click', e => {
  const t = e.target;
  if (t === modal) return closeModal();
  if (t.closest('#lightbox .close') || t === lightbox) return lightbox.close();
  if (t.closest('#modal > .close')) return closeModal();
  if (t.closest('[data-copy]')) { navigator.clipboard?.writeText(location.href); t.textContent = 'Copied'; return; }
  const im = t.closest('[data-img]'); if (im) { $('img', lightbox).src = im.dataset.img; return lightbox.showModal(); }
  const chip = t.closest('.chip'); if (chip) {
    view.plat = chip.dataset.plat; $$('.chip').forEach(c => { c.classList.toggle('on', c === chip); c.setAttribute('aria-pressed', c === chip); }); return applyFilter(true);
  }
  if (t.closest('a[href]')) return;
  const c = t.closest('[data-app]'); if (c) openApp(c.dataset.app, c.dataset.rel);
});
document.addEventListener('keydown', e => { const c = e.target.closest?.('.card, .rel'); if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); c.click(); } });
const q = $('#q');
q.addEventListener('input', () => { view.q = q.value.trim().toLowerCase(); applyFilter(true); });
$('#searchbox').onsubmit = e => e.preventDefault();

/* ---------- data: snapshot first, then live from GitHub ---------- */
const status = (cls, txt) => { const s = $('#status'); s.className = 'status ' + cls; $('span', s).textContent = txt; };
const gh = path => fetch('https://api.github.com/' + path, { headers: { Accept: 'application/vnd.github+json' } }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
const slim = r => ({ tag: r.tag_name, name: r.name, date: r.published_at, body: r.body || '', url: r.html_url, pre: r.prerelease, assets: r.assets.map(a => ({ name: a.name, size: a.size, dl: a.download_count, url: a.browser_download_url })) });
// Every public, non-archived, non-fork repo is discovered on each visit, except this site and the portfolio repo.
const SKIP = /^(projects|.*\.github\.io)$/i, FORKS = new Set(['open-dock']); // forks are skipped unless listed here
const fetchLive = async () => {
  const list = (await gh(`users/${USER}/repos?type=owner&sort=pushed&per_page=100`)).filter(r => (!r.fork || FORKS.has(r.name)) &&!r.archived && !r.private && !SKIP.test(r.name));
  const repos = {};
  await Promise.all(list.map(async r => {
    const releases = (await gh(`repos/${USER}/${r.name}/releases?per_page=8`)).filter(x => !x.draft).map(slim);
    const languages = releases.length ? await gh(`repos/${USER}/${r.name}/languages`) : (r.language ? { [r.language]: 1 } : {});
    repos[r.name] = { releases, languages, meta: { description: r.description, language: r.language, pushed: r.pushed_at, topics: r.topics || [] } };
  }));
  return { generated: new Date().toISOString(), repos };
};
const sig = d => JSON.stringify(Object.keys(d.repos).sort().map(k => [k, d.repos[k].meta?.description, d.repos[k].releases.map(r => r.tag + r.assets.map(a => a.dl))]));
const render = () => { meshColors(ranked()); buildStats(); buildMarquee(); buildShowcase(); buildLists(); };

// Pulls fresh data (cached 15 min per browser) and re-renders only when a release, repo or description changed.
async function refresh() {
  try {
    let c = null; try { c = JSON.parse(localStorage.getItem('rdk-live')); } catch { /* storage unavailable */ }
    const live = c && Date.now() - c.t < 15 * 60e3 ? c.d : await fetchLive();
    try { localStorage.setItem('rdk-live', JSON.stringify({ t: c && live === c.d ? c.t : Date.now(), d: live })); } catch { /* ignore */ }
    const changed = sig(live) !== sig(DATA); DATA = live; sync();
    if (changed && !modal.open) render();
    status('live', 'Live from GitHub');
  } catch { /* rate limited or offline: what is on screen stays */ }
}
(async () => {
  try { DATA = await (await fetch('data.json')).json(); } catch { /* live fetch below may still work */ }
  sync(); render(); status('', DATA.generated ? 'Snapshot ' + day(DATA.generated) : 'Offline');
  if (location.hash.startsWith('#app=')) fromHash();
  await refresh();
  if (location.hash.startsWith('#app=') && !modal.open) fromHash();
  setInterval(refresh, 16 * 60e3);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
})();
