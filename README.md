# RDK456 Projects

A Netflix-style showcase of my apps: billboard, rows, and a details view where each release is an episode.

Live site: https://rdk456.github.io/projects/

- Static HTML, CSS and JS. No build step.
- Releases, downloads and language stats load live from the GitHub API, with `data.json` as the fallback snapshot.
- Refresh the snapshot: `GITHUB_TOKEN=$(gh auth token) node scripts/snapshot.mjs`
- Preview locally: `npx serve .`
- Add an app: add an entry to `P` in `app.js` and its repo name to `scripts/snapshot.mjs`.
