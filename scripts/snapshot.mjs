// Bakes releases + languages into data.json as the offline/rate-limit fallback.
// Usage: GITHUB_TOKEN=$(gh auth token) node scripts/snapshot.mjs
const USER = 'RDK456', REPOS = ['1-download-manager', 'ThermalScope', 'forget-it', 'appDash'];
const h = { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }) };
const get = async p => { const r = await fetch(`https://api.github.com/${p}`, { headers: h }); if (!r.ok) throw new Error(`${p}: ${r.status}`); return r.json(); };
const slim = r => ({ tag: r.tag_name, name: r.name, date: r.published_at, body: r.body || '', url: r.html_url, pre: r.prerelease,
  assets: r.assets.map(a => ({ name: a.name, size: a.size, dl: a.download_count, url: a.browser_download_url })) });
const out = { generated: new Date().toISOString(), repos: {} };
for (const r of REPOS) {
  const [rel, lang, meta] = await Promise.all([get(`repos/${USER}/${r}/releases?per_page=8`), get(`repos/${USER}/${r}/languages`), get(`repos/${USER}/${r}`)]);
  if (meta.archived || meta.private) { out.repos[r] = { releases: [], languages: {}, hidden: true }; continue; } // public, non-archived only
  out.repos[r] = { releases: rel.filter(x => !x.draft).map(slim), languages: lang, pushed: meta.pushed_at, stars: meta.stargazers_count };
}
await (await import('node:fs/promises')).writeFile(new URL('../data.json', import.meta.url), JSON.stringify(out));
console.log('data.json written', Object.entries(out.repos).map(([k, v]) => `${k}:${v.releases.length}`).join(' '));
