# Landscape Radar

A public demo for a small landscape architecture team: a shared discovery board for competitions, RFPs/RFQs, awards and research calls.

**Live board:** https://yuehui-gong.github.io/landscape-radar/

## What works

- Real public listings from Landezine's Calls & Opportunities RSS feed and ASLA's opportunities page.
- Search, type and source filters, deadline sorting, CSV export, and a browser-local shortlist.
- GitHub-hosted collection approximately every 48 hours, plus manual runs from Actions.
- URL deduplication, preserved discovery timestamps, source health and last successful collection.
- Partial failures retain older records; complete failure publishes error status and fails the run.

This is a **discovery tool**, not a verified bidding service. Listings can be historical. Unknown/multiple/yearless deadlines are kept as source text, without guessing. Dates with an explicit year are parsed from ASLA's listing; organizer time zones and cutoff times still require review. Feed publication dates are never treated as deadlines. Fee, budget and eligibility extraction are not implemented.

Coverage is deliberately small. Regional procurement portals, access-controlled tender sites and full-web AI search are not included. No paid API key is needed for this version. Public source requests use one request per source per run, with no login or access-control bypass.

## Team access

Anyone with the public URL can read the same collected snapshot. Stars are saved in each browser's local storage, not a shared database. Do not enter private team information. A private repository alone does not make a GitHub Pages site private. Team authentication and shared notes/assignments require a separate authenticated host/database or an eligible private Pages arrangement.

## Run locally

Requires Node.js 22 or newer.

```sh
npm install --ignore-scripts
npm test
npm run collect
npm run serve
```

Open http://127.0.0.1:4173. The published site is the `public/` directory and uses relative paths so it works under a project Pages URL.

## GitHub setup

1. Create the repository and push this folder to `main`.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
3. Run **Actions → Collect and publish → Run workflow** if the initial push ran before Pages was enabled.
4. Check that collection and deployment both succeed before sharing the live URL.

The schedule wakes daily at 13:23 UTC and collects when at least 47 hours have elapsed since the last attempt, to allow scheduling jitter around the intended 48-hour interval. Pushes and manual runs collect immediately. GitHub schedules can be delayed. Scheduled workflows in inactive public repositories can be disabled after 60 days; monitor Actions and re-enable when needed. The site remains readable between runs.

## Add sources

Edit `config/sources.json`. RSS and ASLA adapters are implemented in `scripts/normalize.mjs`. A new HTML portal needs its own tested adapter; adding a URL alone does not make arbitrary pages compatible.

## Next iteration

Choose target regions, add their official procurement sources, verify organizer deadlines and eligibility, then introduce team sign-in and a shared shortlist if needed.
