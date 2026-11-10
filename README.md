# Landscape Radar

A public demo for a small landscape architecture team: a shared discovery board for competitions, RFPs/RFQs, awards and research calls.

**Live board:** https://yuehui-gong.github.io/landscape-radar/

## What works

- A 46-source directory with verified routes, robots/access findings and explicit manual/permission/API-key states.
- Archinect official Atom feed: selected individual competition announcements only; excludes results, shortlists and roundups. No article or competition-directory scraping. Deadlines and open status remain unverified.
- IFLA and Non Architecture are verified reference links in the source directory; their terms restrict automated access. Non Architecture points to its newer Non-A portal, currently advertising future competitions and past results.
- Official YAC competition cards and explicitly labeled submission-calendar dates, with robots checks on listing and brief pages.
- Automatic linked-title metadata from Competitions.archi's advertised RSS, plus a bounded official EU TED Search API query for urban-planning and landscape CPV codes.
- Search, type and source filters, deadline sorting, CSV export, and a browser-local shortlist.
- GitHub-hosted collection approximately every 48 hours, plus manual runs from Actions.
- URL deduplication, preserved discovery timestamps, source health and last successful collection.
- Partial failures retain older records; complete failure publishes error status and fails the run.

This is a **discovery tool**, not a verified bidding service. Listings can be historical. Unknown/multiple/yearless deadlines are kept as source text, without guessing. Official TED calendar dates are retained with raw lot-date evidence; time zones, cutoff times and participation still require review. Feed publication dates are never treated as deadlines. Fee, budget and eligibility extraction are not implemented.

Only sources marked **Automatic** are collected. Directory membership is not monitoring. See [the complete source access review](docs/source-access-review.md). ASLA public-page and Landezine public-page imports were restored at user request for metadata only. Reuse permissions remain unverified; descriptions and images are excluded. Other publishers with restrictions remain links until permission or an authorized integration is available. SAM.gov needs a key and is not enabled.

TED covers the latest 100 ACTIVE-scope matches for CPV 71400000, 71410000 and 71420000 (including secondary classifications), not all EU tenders. ACTIVE scope can include notices other than currently enterable calls. The feed covers recent publisher entries. Coverage limits appear on the board. No paid API key is needed for these enabled sources. Runtime robots checks fail closed on disallow or unresolved access; redirects are checked before following. No login or access-control bypass is implemented.

Canonical links come from explicit single organizer URLs in feed metadata when present; no organizer domain is fetched merely to deduplicate. Cross-posts with matching normalized URLs merge while preserving all provenance and a stable ID. Similar titles and different annual editions are not automatically merged. Unknown participation, eligibility, fees and budgets remain unverified/null. Distinct lot deadlines remain raw evidence rather than one guessed cutoff.

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

Edit `config/source-registry.json` to extend the directory, and `config/source-reviews.json` to record reviewed access decisions. Only add approved collection adapters to `config/sources.json`. RSS normalization is in `scripts/normalize.mjs`; the official TED adapter is in `scripts/ted.mjs`. The ASLA parser runs with metadata-only output. Landezine uses a robots-allowed public listing-page adapter instead of its disallowed RSS paths. A new HTML portal needs an access review and a tested adapter; a URL alone does not enable it.

`node scripts/audit-sources.mjs` performs a bounded robots-first page audit and saves raw evidence locally under ignored `audit/`. It flags possible clauses; it does **not** determine permission or enable sources automatically. Review terms in context. `node scripts/build-directory.mjs` combines that evidence with reviewed decisions into the public directory and Markdown review. The audit is a deliberate maintenance task, not part of the two-day collection loop.

## Next iteration

Choose target regions, add their official procurement sources, verify organizer deadlines and eligibility, then introduce team sign-in and a shared shortlist if needed.
