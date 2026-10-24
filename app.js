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
    shots: [['Windows app', 'dm-desktop'], ['Download queue', 'dm-android-downloads'], ['Discover', 'dm-android-discover'], ['Internet Archive browser', 'dm-android-archive'], ['YouTube downloader', 'dm-android-youtube']] },
  { repo: 'ThermalScope', name: 'ThermalScope', a: '#ff7a3d', plats: ['Windows'],
    line: 'Watch your temperatures and pace your frames.',
    desc: 'A portable Windows hardware monitor with DirectX FPS monitoring and a frame pacer, in one window.',
    feats: [['Monitor', 'CPU and GPU temperature, load, clock and power on heat-ramp dials, with history and a live sensor list.'], ['Frame pacer', 'Limits a game’s frame rate with evenly spaced frames and shows live FPS and frame time.'],
      ['In-game overlay', 'Hotkeys, a tray icon and an overlay, with 32-bit and DirectX 9 games supported.'], ['Self-contained', 'Needs no MSI Afterburner, RTSS or other tool, and no administrator rights to start.'],
      ['Small updates', 'Delta packages are usually under 1 MB instead of about 68 MB, checked against SHA256 sums.'], ['Honest CPU temperature', 'It never shows a motherboard reading as the CPU die temperature.']], shots: [] },
  { repo: 'forget-it', name: 'Forget-it', a: '#a37bff', plats: ['Android'],
    line: 'Never miss a renewal, EMI or bill.',
    desc: 'An offline Android tracker for subscriptions, EMIs and loans, bills, and household stock. It scans SMS, email, photos and spreadsheets on the phone.',
    feats: [['Four trackers in one', 'Subscriptions, EMIs and loans, bills and utilities, and household stock.'], ['Scan anything', 'Take a photo or share a screenshot. Text is read on the phone and sorted into the right tracker for you to review.'],
      ['Payment detection', 'Optional SMS and email alerts become transactions, with ads, promos and failed payments filtered out.'], ['Voice entry for stock', 'Say “2 litres milk” or “half kg sugar”.'],
      ['Reminders and widget', 'Several reminders per item, snooze, a weekly summary and a home-screen widget.'], ['Offline by default', 'No account needed. The network is used only for the optional Gmail sync.'],
      ['Backups', 'CSV and Excel import and export, plus a full backup that includes photos.']], shots: [] },
  { repo: 'appDash', name: 'AppDash', a: '#34d3a0', plats: ['Android', 'Windows'],
    line: 'See what is installed, used and taking space.',
    desc: 'See every app on your PC or phone: what is installed, what you actually use, how much space it takes, and what can be updated.',
    feats: [['Every app in one list', 'Installed and portable apps on Windows, and your apps and system apps on Android, with sizes.'], ['What you actually use', 'Usage from Windows launch history and Android screen time, so you can remove rarely used apps in bulk.'],
      ['Updates', 'Windows updates through winget and Chocolatey. On Android: Play Store, F-Droid and GitHub updates.'], ['Disk space by file type', 'Videos, archives, documents and the largest files, with Recycle Bin or permanent delete.'],
      ['Small updates', 'The Windows app updates itself with small delta packages.']], shots: [] }
];
const CUR = Object.fromEntries(P0.map(p => [p.repo, p]));
let P = [];
const LANG = { Kotlin: '#a97bff', JavaScript: '#f1e05a', PowerShell: '#5391fe', HTML: '#e34c26', 'C#': '#3fb950', 'C++': '#f34b7d', Batchfile: '#c1f12e', Shell: '#89e051', CSS: '#7f5fd0', TypeScript: '#3178c6' };

/* ---------- illustrations (not screenshots) for apps without public screenshots ---------- */
const win = (inner, label) => `<svg viewBox="0 0 520 320" role="img" aria-label="${label}"><rect x="4" y="4" width="512" height="312" rx="14" fill="#1a1216" stroke="#ffffff30" stroke-width="2"/><path d="M4 18a14 14 0 0 1 14-14h484a14 14 0 0 1 14 14v20H4Z" fill="#2a1e24"/><circle cx="26" cy="21" r="5" fill="#ff5d7a"/><circle cx="44" cy="21" r="5" fill="#e0a526"/><circle cx="62" cy="21" r="5" fill="#55c47f"/>${inner}</svg>`;
const dial = (cx, cy, v, c, t, l) => `<circle cx="${cx}" cy="${cy}" r="46" fill="none" stroke="#ffffff1a" stroke-width="11"/><circle cx="${cx}" cy="${cy}" r="46" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round" pathLength="100" stroke-dasharray="${v} 100" transform="rotate(-90 ${cx} ${cy})"><animate attributeName="stroke-dasharray" from="0 100" to="${v} 100" dur="1.8s" fill="freeze" calcMode="spline" keySplines=".2 .9 .3 1" keyTimes="0;1"/></circle><text x="${cx}" y="${cy + 6}" text-anchor="middle" fill="#fff" font-size="22" font-weight="700" font-family="sans-serif">${t}</text><text x="${cx}" y="${cy + 70}" text-anchor="middle" fill="#b7a9ad" font-size="12" font-family="sans-serif">${l}</text>`;
const bar = (x, y, w, h, c, d = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}"><animate attributeName="width" from="0" to="${w}" dur="1.4s" begin="${d}s" fill="freeze" calcMode="spline" keySplines=".2 .9 .3 1" keyTimes="0;1"/></rect>`;
const ART = {
  ThermalScope: () => win(dial(110, 130, 62, '#ff7a3d', '62°', 'CPU') + dial(250, 130, 48, '#ffb347', '48°', 'GPU') +
    [['Load', 41], ['Clock', 78], ['Power', 55]].map(([n, v], i) => `<text x="345" y="${88 + i * 36}" fill="#b7a9ad" font-size="12" font-family="sans-serif">${n}</text>` + bar(345, 94 + i * 36, 140, 8, '#ffffff1a') + bar(345, 94 + i * 36, v * 1.4, 8, '#ff7a3d', .2 * i)).join('') +
    `<polyline points="30,285 70,270 110,278 150,255 190,272 230,262 270,280 310,258 350,268 390,252 430,270 490,260" fill="none" stroke="#55c47f" stroke-width="3" stroke-linejoin="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"><animate attributeName="stroke-dashoffset" from="100" to="0" dur="2.2s" fill="freeze"/></polyline><text x="30" y="238" fill="#b7a9ad" font-size="12" font-family="sans-serif">Frame time</text>`, 'Illustration of ThermalScope temperature dials and a frame-time graph'),
  'forget-it': () => win(`<image href="img/forget-it-icon.png" x="34" y="70" width="120" height="120"/><text x="94" y="225" text-anchor="middle" fill="#fff" font-size="18" font-weight="700" font-family="sans-serif">Forget-it</text>` +
    [['Subscriptions', 190, '#a37bff'], ['EMIs and loans', 130, '#ff7a9a'], ['Bills', 160, '#ffb347'], ['Stock', 100, '#55c47f']].map(([n, w, c], i) => `<rect x="190" y="${62 + i * 62}" width="300" height="50" rx="10" fill="#2a1e24"/><rect x="190" y="${62 + i * 62}" width="5" height="50" rx="2" fill="${c}"/><text x="208" y="${92 + i * 62}" fill="#fff" font-size="14" font-family="sans-serif">${n}</text>` + bar(330, 82 + i * 62, w * .85, 8, c, .15 * i)).join(''), 'Illustration of the four Forget-it trackers'),
  appDash: () => win([['Videos', 250, '#34d3a0'], ['Archives', 170, '#5b8cff'], ['Documents', 100, '#ffb347'], ['Other', 60, '#ff7a9a']].map(([n, w, c], i) => `<text x="34" y="${84 + i * 38}" fill="#b7a9ad" font-size="13" font-family="sans-serif">${n}</text>` + bar(120, 74 + i * 38, 360, 12, '#ffffff14') + bar(120, 74 + i * 38, w * 1.4, 12, c, .15 * i)).join('') +
    ['Used often', 'Sometimes', 'Rarely'].map((n, i) => `<rect x="${34 + i * 156}" y="240" width="146" height="52" rx="10" fill="#2a1e24"/><circle cx="${58 + i * 156}" cy="266" r="7" fill="${['#34d3a0', '#ffb347', '#ff7a9a'][i]}"/><text x="${74 + i * 156}" y="271" fill="#fff" font-size="13" font-family="sans-serif">${n}</text>`).join(''), 'Illustration of AppDash storage bars and usage groups')
};
const genericArt = p => win(`<text x="260" y="190" text-anchor="middle" fill="${p.a}" font-size="130" font-weight="800" font-family="sans-serif">${esc(p.name[0])}</text><text x="260" y="245" text-anchor="middle" fill="#b7a9ad" font-size="16" font-family="sans-serif">${esc(p.name)}</text>`, `Illustration for ${esc(p.name)}`);
const media = p => p.repo === '1-download-manager' ? `<div class="phones">${['downloads', 'discover', 'youtube'].map(f => `<img src="img/dm-android-${f}.png" alt="" loading="lazy">`).join('')}</div>` : (ART[p.repo] || genericArt)(p);

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
  const shots = p.shots.length ? p.shots.map(([c, f]) => `<button type="button" data-img="img/${f}.png" aria-label="Enlarge ${esc(c)}"><img src="img/${f}.png" alt="${esc(c)}" loading="lazy"></button>`).join('') : `<figure>${media(p)}<figcaption>Illustration, not a screenshot.</figcaption></figure>`;
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
    <div class="sec"><h3>${p.shots.length ? 'Screenshots' : 'Preview'}</h3><div class="shots">${shots}</div></div>
    <div class="sec"><h3>More like this</h3><div class="similar">${ranked().filter(x => x !== p).map(x => card(x)).join('')}</div></div>
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
