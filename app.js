'use strict';
const USER = 'RDK456';
const $ = (s, r = document) => r.querySelector(s);
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const svg = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = { dl: svg('<path d="M12 3v12m0 0-5-5m5 5 5-5M4 20h16"/>'), info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>'),
  chev: svg('<path d="m6 9 6 6 6-6"/>'), l: svg('<path d="m15 5-7 7 7 7"/>'), r: svg('<path d="m9 5 7 7-7 7"/>') };

/* ---------- content that GitHub does not provide ---------- */
const P = [
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
const media = p => p.repo === '1-download-manager' ? `<div class="phones">${['downloads', 'discover', 'youtube'].map(f => `<img src="img/dm-android-${f}.png" alt="" loading="lazy">`).join('')}</div>` : ART[p.repo]();

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
const rel = p => DATA.repos[p.repo]?.releases || [];
const latest = p => rel(p)[0];
const ranked = () => P.filter(p => !DATA.repos[p.repo]?.hidden).sort((a, b) => new Date(latest(b)?.date || 0) - new Date(latest(a)?.date || 0));
const mainAssets = r => (r?.assets || []).filter(a => !isMeta(a.name) && kind(a.name)).sort((a, b) => (kind(b.name) === dev) - (kind(a.name) === dev) || KO.indexOf(kind(a.name)) - KO.indexOf(kind(b.name)));
const best = p => { const r = latest(p), as = mainAssets(r), pick = as.find(a => kind(a.name) === (dev || 'Windows') && /setup|\.msi|universal/i.test(a.name)) || as.find(a => kind(a.name) === dev) || as[0]; return pick?.url || r?.url || `https://github.com/${USER}/${p.repo}/releases`; };
const fresh = r => r && Date.now() - new Date(r.date) < 14 * 864e5;

/* ---------- cards, rows, billboard ---------- */
const card = (p, r, i) => { const l = r || latest(p); return `<div class="card" tabindex="0" role="button" data-app="${p.repo}"${r ? ` data-rel="${esc(r.tag)}"` : ''} style="--a:${p.a};--i:${i}" aria-label="${esc(p.name)} ${l ? esc(l.tag) : ''}">
  <div class="thumb">${media(p)}<span class="t">${esc(p.name)}${r ? ' ' + esc(r.tag) : ''}</span>${fresh(l) ? '<span class="new">Recently added</span>' : ''}</div>
  <div class="peek"><strong>${esc(r ? gist(r.body) : p.line)}</strong><small>${l ? `<b>${esc(l.tag)}</b><span>${ago(l.date)}</span>` : ''}<span>${p.plats.join(', ')}</span></small><span class="go">${ICON.chev}</span></div></div>`; };

function buildRows(q = '') {
  const lang = p => Object.keys(DATA.repos[p.repo]?.languages || {}).join(' ');
  const ps = ranked().filter(p => !q || [p.name, p.line, p.desc, p.plats.join(' '), lang(p)].join(' ').toLowerCase().includes(q));
  const feed = ps.flatMap(p => rel(p).map(r => ({ p, r }))).sort((a, b) => new Date(b.r.date) - new Date(a.r.date)).slice(0, 14);
  const defs = [['new', 'New releases', feed.map(({ p, r }, i) => card(p, r, i))],
    ['recent', 'Recently updated', ps.map((p, i) => `<div class="ranked"><span class="num" aria-hidden="true">${i + 1}</span>${card(p, null, i)}</div>`)],
    ['android', 'On Android', ps.filter(p => p.plats.includes('Android')).map((p, i) => card(p, null, i))],
    ['windows', 'On Windows', ps.filter(p => p.plats.includes('Windows')).map((p, i) => card(p, null, i))],
    ['browser', 'Browser extensions', ps.filter(p => p.plats.includes('Browser')).map((p, i) => card(p, null, i))]].filter(d => d[2].length);
  $('#rows').innerHTML = defs.map(([id, t, items]) => `<section class="row" id="row-${id}"><h2>${t}<span class="count">${items.length}</span></h2><div class="scroller"><button class="arrow l" hidden aria-label="Scroll left">${ICON.l}</button><div class="strip">${items.join('')}</div><button class="arrow r" aria-label="Scroll right">${ICON.r}</button></div></section>`).join('');
  $('#empty').hidden = defs.length > 0;
  $('#nav').innerHTML = '<a href="#">Home</a>' + defs.filter(d => d[0] !== 'recent').map(d => `<a href="#row-${d[0]}">${d[1]}</a>`).join('');
  document.querySelectorAll('.row').forEach(row => {
    const st = $('.strip', row), L = $('.arrow.l', row), R = $('.arrow.r', row);
    const upd = () => { L.hidden = st.scrollLeft < 8; R.hidden = st.scrollLeft + st.clientWidth > st.scrollWidth - 8; };
    st.addEventListener('scroll', upd, { passive: true }); upd();
    L.onclick = () => st.scrollBy({ left: -st.clientWidth * .85, behavior: 'smooth' });
    R.onclick = () => st.scrollBy({ left: st.clientWidth * .85, behavior: 'smooth' });
    io.observe(row);
  });
}
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });

function buildBillboard() {
  const ps = ranked(), bb = $('#billboard');
  const seeds = Array.from({ length: 7 }, (_, i) => `<i style="left:${8 + i * 13}%;top:${30 + (i * 37) % 55}%;--r:${i * 40}deg;--dx:${(i % 2 ? 1 : -1) * 40}px;--t:${11 + i * 2}s"></i>`).join('');
  bb.innerHTML = ps.map((p, i) => { const l = latest(p); return `<article class="slide${i ? '' : ' on'}" style="--a:${p.a}" aria-hidden="${i ? 'true' : 'false'}">
    <div class="bd"></div><div class="bd-media">${media(p)}</div><div class="fx">${seeds}</div>
    <div class="copy"><span class="tag" style="--n:1"><b>${fresh(l) ? 'New release' : 'Latest'}</b>${l ? `<span>${esc(l.tag)} ${ago(l.date)}</span>` : ''}</span>
      <h2 style="--n:2" aria-label="${esc(p.name)}">${p.name.split(' ').map((w, k) => `<span class="w" aria-hidden="true" style="--w:${k}">${esc(w)}</span>`).join(' ')}</h2><p style="--n:3">${esc(p.line)} ${esc(p.desc)}</p>
      <div class="btns" style="--n:4"><a class="btn play" href="${best(p)}">${ICON.dl} Download</a><button class="btn info" type="button" data-app="${p.repo}">${ICON.info} More info</button></div></div>
    <div class="rate">${p.plats.join('   ')}</div></article>`; }).join('') +
    `<div class="pager">${ps.map((p, i) => `<button type="button" aria-label="Show ${esc(p.name)}"${i ? '' : ' class="on"'}><i></i></button>`).join('')}</div>`;
  const slides = [...bb.querySelectorAll('.slide')], dots = [...bb.querySelectorAll('.pager button')];
  let cur = 0, sx = null;
  const show = n => { cur = n; slides.forEach((s, i) => { s.classList.toggle('on', i === n); s.setAttribute('aria-hidden', i !== n); }); dots.forEach((d, i) => { d.classList.remove('on', 'done'); void d.offsetWidth; if (i < n) d.classList.add('done'); if (i === n) d.classList.add('on'); }); };
  dots.forEach((d, i) => { d.onclick = () => show(i); d.addEventListener('animationend', () => show((i + 1) % slides.length)); });
  new IntersectionObserver(([e]) => bb.classList.toggle('paused', !e.isIntersecting)).observe(bb);
  bb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  bb.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 50) show((cur + (dx < 0 ? 1 : -1) + slides.length) % slides.length); });
  bb.onpointermove = e => { const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5; bb.querySelectorAll('.bd-media').forEach(m => m.style.transform = `translate(${-x * 26}px,${-y * 18}px)`); };
}

/* ---------- details modal: releases are the episodes ---------- */
const modal = $('#modal'), lightbox = $('#lightbox');
function openApp(repo, relTag) {
  const p = P.find(x => x.repo === repo); if (!p) return;
  const R = rel(p), L = R[0], langs = DATA.repos[p.repo]?.languages || {}, tot = Object.values(langs).reduce((a, b) => a + b, 0) || 1;
  const dls = R.reduce((n, r) => n + r.assets.reduce((m, a) => m + (a.dl || 0), 0), 0);
  const as = mainAssets(L), extra = (L?.assets || []).filter(a => isMeta(a.name));
  const top = Object.entries(langs).sort((a, b) => b[1] - a[1]);
  const shots = p.shots.length ? p.shots.map(([c, f]) => `<button type="button" data-img="img/${f}.png" aria-label="Enlarge ${esc(c)}"><img src="img/${f}.png" alt="${esc(c)}" loading="lazy"></button>`).join('') : `<figure>${media(p)}<figcaption>Illustration, not a screenshot.</figcaption></figure>`;
  modal.style.setProperty('--a', p.a);
  modal.innerHTML = `<button type="button" class="icon-btn close" aria-label="Close details">&times;</button>
  <div class="m-media" style="--a:${p.a}"><div class="bd"></div><div class="bd-media">${media(p)}</div>
    <div class="m-head"><h2>${esc(p.name)}</h2><div class="btns"><a class="btn play" href="${best(p)}">${ICON.dl} Download</a><a class="btn info" href="https://github.com/${USER}/${p.repo}" target="_blank" rel="noopener">GitHub</a></div></div></div>
  <div class="m-body">
    <div class="m-cols"><div>
      <div class="meta">${L ? `<span class="good">${esc(L.tag)}</span><span>${day(L.date)}</span>` : ''}${p.plats.map(x => `<span class="badge">${x}</span>`).join('')}</div>
      <p>${esc(p.desc)}</p><ul class="feat">${p.feats.map(([h, t]) => `<li><b>${esc(h)}.</b> ${esc(t)}</li>`).join('')}</ul></div>
      <dl class="side"><div><dt>Platforms</dt><dd>${p.plats.join(', ')}</dd></div>
        <div><dt>Written in</dt><dd>${top.slice(0, 3).map(([n, b]) => `${n} ${Math.round(b / tot * 100)}%`).join(', ')}<div class="lang">${top.map(([n, b]) => `<i title="${n}" style="flex:${b};background:${LANG[n] || '#888'}"></i>`).join('')}</div></dd></div>
        <div><dt>Downloads so far</dt><dd>${dls.toLocaleString()}</dd></div><div><dt>Releases</dt><dd>${R.length} shown, latest ${L ? ago(L.date) : 'none'}</dd></div></dl></div>
    ${L ? `<div class="sec"><h3>Get ${esc(L.tag)}</h3><div class="dl">${as.map(a => `<a href="${a.url}" class="${kind(a.name) === dev ? 'rec' : ''}"><span class="fn">${esc(a.name)}</span><span class="sz">${size(a.size)}</span>${kind(a.name) === dev ? '<span class="rc">Recommended for your device</span>' : `<span class="rc">${kind(a.name)}</span>`}</a>`).join('') || `<a href="${L.url}"><span class="fn">View on GitHub</span></a>`}</div>
      ${extra.length ? `<details class="more-files"><summary>Updater and checksum files (${extra.length})</summary>${extra.map(a => `<a href="${a.url}">${esc(a.name)} (${size(a.size)})</a>`).join('')}</details>` : ''}</div>` : ''}
    <div class="sec"><h3>Releases</h3>${R.map(r => `<details class="ep" id="rel-${esc(r.tag)}"${r.tag === (relTag || L?.tag) ? ' open' : ''}><summary><span class="tg">${esc(r.tag)}</span><span><h4>${esc(r.name || r.tag)}</h4><small>${esc(gist(r.body))}</small></span><time datetime="${r.date}">${ago(r.date)}</time></summary>
      <div class="notes">${md(r.body)}<div class="chips">${mainAssets(r).slice(0, 8).map(a => `<a href="${a.url}">${esc(kind(a.name))} ${size(a.size)}</a>`).join('')}<a href="${r.url}" target="_blank" rel="noopener">Release page</a></div></div></details>`).join('')}</div>
    <div class="sec"><h3>${p.shots.length ? 'Screenshots' : 'Preview'}</h3><div class="shots">${shots}</div></div>
    <div class="sec"><h3>More like this</h3><div class="similar">${ranked().filter(x => x !== p).map((x, i) => card(x, null, i)).join('')}</div></div>
    <div class="links"><a href="https://github.com/${USER}/${p.repo}" target="_blank" rel="noopener">Source on GitHub</a><a href="https://github.com/${USER}/${p.repo}/releases" target="_blank" rel="noopener">All releases</a><a href="https://github.com/${USER}/${p.repo}/issues" target="_blank" rel="noopener">Report an issue</a></div>
  </div>`;
  if (!modal.open) { modal.showModal(); document.body.classList.add('noscroll'); }
  modal.scrollTop = 0;
  const h = `#app=${repo}${relTag ? '&rel=' + encodeURIComponent(relTag) : ''}`;
  if (location.hash !== h) history.pushState(null, '', h);
  if (relTag) requestAnimationFrame(() => document.getElementById('rel-' + relTag)?.scrollIntoView({ block: 'center' }));
}
modal.addEventListener('close', () => { document.body.classList.remove('noscroll'); if (location.hash.startsWith('#app=')) history.pushState(null, '', location.pathname + location.search); });
const fromHash = () => { const m = location.hash.match(/^#app=([^&]+)(?:&rel=(.+))?/); if (m) openApp(m[1], m[2] && decodeURIComponent(m[2])); else closeModal(); };
addEventListener('popstate', fromHash);

const closeModal = () => {
  if (!modal.open || modal.classList.contains('closing')) return;
  if (RM) return modal.close();
  modal.classList.add('closing');
  modal.addEventListener('animationend', function h(e) { if (e.target !== modal) return; modal.removeEventListener('animationend', h); modal.classList.remove('closing'); modal.close(); });
};
// The clicked card (or billboard art) morphs into the modal header via the View Transitions API.
const openMorph = c => {
  const go = () => openApp(c.dataset.app, c.dataset.rel);
  if (RM || !document.startViewTransition || modal.open) return go();
  const from = c.closest('.slide')?.querySelector('.bd-media') || $('.thumb', c) || c;
  from.style.viewTransitionName = 'hero'; modal.dataset.vt = 1;
  const t = document.startViewTransition(() => { from.style.viewTransitionName = ''; go(); const m = $('.m-media', modal); if (m) m.style.viewTransitionName = 'hero'; });
  t.finished.finally(() => { const m = $('.m-media', modal); if (m) m.style.viewTransitionName = ''; delete modal.dataset.vt; });
};
let suppress = false;
document.addEventListener('click', e => { if (suppress) { e.stopPropagation(); e.preventDefault(); } }, true);
document.addEventListener('click', e => {
  const t = e.target;
  if (t === modal) return closeModal();
  if (t.closest('#lightbox .close') || t === lightbox) return lightbox.close();
  if (t.closest('#modal > .close')) return closeModal();
  const im = t.closest('[data-img]'); if (im) { $('img', lightbox).src = im.dataset.img; return lightbox.showModal(); }
  const c = t.closest('[data-app]'); if (c) openMorph(c);
});

/* pointer effects: card tilt and spotlight, magnetic buttons, mouse drag-scroll */
if (!RM) {
  document.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const c = e.target.closest?.('.card'), b = e.target.closest?.('.btn');
    if (c) { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%'); c.style.setProperty('--rx', (.5 - y) * 9 + 'deg'); c.style.setProperty('--ry', (x - .5) * 11 + 'deg'); }
    if (b) { const r = b.getBoundingClientRect(); b.style.setProperty('--tx', (e.clientX - r.left - r.width / 2) * .15 + 'px'); b.style.setProperty('--ty', (e.clientY - r.top - r.height / 2) * .25 + 'px'); }
  });
  document.addEventListener('pointerout', e => {
    for (const s of ['.card', '.btn']) { const el = e.target.closest?.(s); if (el && !el.contains(e.relatedTarget)) ['--rx', '--ry', '--tx', '--ty'].forEach(v => el.style.removeProperty(v)); }
  });
}
let drag = null;
document.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button) return; const st = e.target.closest('.strip'); if (st) drag = { st, x: e.clientX, l: st.scrollLeft, moved: false }; });
addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 6) { drag.moved = true; drag.st.classList.add('dragging'); } if (drag.moved) drag.st.scrollLeft = drag.l - dx; });
addEventListener('pointerup', () => { if (!drag) return; const { st, moved } = drag; drag = null; if (moved) { suppress = true; setTimeout(() => { suppress = false; st.classList.remove('dragging'); }, 60); } });
document.addEventListener('dragstart', e => { if (e.target.closest?.('.strip')) e.preventDefault(); });
document.addEventListener('keydown', e => { const c = e.target.closest?.('.card'); if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); c.click(); } });

/* ---------- search, top bar ---------- */
const sb = $('#searchbox'), q = $('#q');
$('#searchbtn').onclick = () => { sb.classList.toggle('open'); if (sb.classList.contains('open')) q.focus(); else { q.value = ''; buildRows(); } };
q.addEventListener('input', () => buildRows(q.value.trim().toLowerCase()));
q.addEventListener('blur', () => { if (!q.value) sb.classList.remove('open'); });
sb.onsubmit = e => e.preventDefault();
let tick = false;
addEventListener('scroll', () => {
  $('#topbar').classList.toggle('solid', scrollY > 40);
  if (RM || tick) return; tick = true;
  requestAnimationFrame(() => { tick = false; if (scrollY < innerHeight * 1.3) $('#billboard').style.setProperty('--sy', scrollY); });
}, { passive: true });

/* ---------- data: snapshot first, then live from GitHub ---------- */
const status = (cls, txt) => { const s = $('#status'); s.className = 'status ' + cls; $('span', s).textContent = txt; };
const gh = path => fetch('https://api.github.com/' + path, { headers: { Accept: 'application/vnd.github+json' } }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
const slim = r => ({ tag: r.tag_name, name: r.name, date: r.published_at, body: r.body || '', url: r.html_url, pre: r.prerelease, assets: r.assets.map(a => ({ name: a.name, size: a.size, dl: a.download_count, url: a.browser_download_url })) });
// Only public, non-archived repos are shown: a 404 (private) or archived flag hides the app.
const fetchLive = async () => { const repos = {}; await Promise.all(P.map(async p => {
  const m = await gh(`repos/${USER}/${p.repo}`).catch(e => { if (e.message === '404') return null; throw e; });
  if (!m || m.archived || m.private) { repos[p.repo] = { releases: [], languages: {}, hidden: true }; return; }
  const [r, l] = await Promise.all([gh(`repos/${USER}/${p.repo}/releases?per_page=8`), gh(`repos/${USER}/${p.repo}/languages`)]);
  repos[p.repo] = { releases: r.filter(x => !x.draft).map(slim), languages: l };
})); return { generated: new Date().toISOString(), repos }; };
const sig = d => JSON.stringify(P.map(p => [d.repos[p.repo]?.hidden, (d.repos[p.repo]?.releases || []).map(r => r.tag + r.assets.map(a => a.dl))]));
const render = () => { buildBillboard(); buildRows(q.value.trim().toLowerCase()); };

(async () => {
  try { DATA = await (await fetch('data.json')).json(); } catch { /* live fetch below may still work */ }
  render(); status('', DATA.generated ? 'Snapshot ' + day(DATA.generated) : 'Offline');
  if (location.hash.startsWith('#app=')) fromHash();
  try {
    let c = null; try { c = JSON.parse(localStorage.getItem('rdk-live')); } catch { /* storage unavailable */ }
    const live = c && Date.now() - c.t < 15 * 60e3 ? c.d : await fetchLive();
    try { localStorage.setItem('rdk-live', JSON.stringify({ t: c && live === c.d ? c.t : Date.now(), d: live })); } catch { /* ignore */ }
    const changed = sig(live) !== sig(DATA); DATA = live;
    if (changed && !modal.open) render();
    status('live', 'Live from GitHub');
  } catch { /* rate limited or offline: the snapshot stays on screen */ }
})();
