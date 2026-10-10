// Bakes every public, non-archived, non-fork repo (releases, languages, description) into data.json.
// It is the offline / rate-limit fallback; the site refreshes the same data live from GitHub.
// Usage: GITHUB_TOKEN=$(gh auth token) node scripts/snapshot.mjs
const USER = 'RDK456', SKIP = /^(projects|.*\.github\.io)$/i;
const h = { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }) };
const get = async p => { const r = await fetch(`https://api.github.com/${p}`, { headers: h }); if (!r.ok) throw new Error(`${p}: ${r.status}`); return r.json(); };
const slim = r => ({ tag: r.tag_name, name: r.name, date: r.published_at, body: r.body || '', url: r.html_url, pre: r.prerelease,
  assets: r.assets.map(a => ({ name: a.name, size: a.size, dl: a.download_count, url: a.browser_download_url })) });
const list = (await get(`users/${USER}/repos?type=owner&sort=pushed&per_page=100`)).filter(r => !r.fork && !r.archived && !r.private && !SKIP.test(r.name));
const out = { generated: new Date().toISOString(), repos: {} };
for (const r of list) {
  const releases = (await get(`repos/${USER}/${r.name}/releases?per_page=8`)).filter(x => !x.draft).map(slim);
  const languages = releases.length ? await get(`repos/${USER}/${r.name}/languages`) : (r.language ? { [r.language]: 1 } : {});
  out.repos[r.name] = { releases, languages, meta: { description: r.description, language: r.language, pushed: r.pushed_at, topics: r.topics || [] } };
}
await (await import('node:fs/promises')).writeFile(new URL('../data.json', import.meta.url), JSON.stringify(out));
console.log('data.json written', Object.entries(out.repos).map(([k, v]) => `${k}:${v.releases.length}`).join(' '));
