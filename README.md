# RDK456 Projects

A neat, light showcase of my apps: featured panel, filterable app grid, and a release list. Each app opens a details view where every release is an episode.

Live site: https://rdk456.github.io/projects/

- Static HTML, CSS and JS with no build step. Animation uses GSAP (ScrollTrigger, Flip) and Lenis smooth scroll from jsDelivr; the page still works if they fail to load.
- Releases, downloads and language stats load live from the GitHub API, with `data.json` as the fallback snapshot.
- Refresh the snapshot: `GITHUB_TOKEN=$(gh auth token) node scripts/snapshot.mjs`
- Preview locally: `npx serve .`
- Add an app: add an entry to `P0` in `app.js`. Other public repos are picked up automatically.
