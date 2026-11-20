# Kronos

Human resources dashboard: company hero, key figures, and a process list you can sort by status and page through. Dark only.

Built with Next.js (App Router, static export), React, Tailwind CSS and Heroicons. It's a static site with **sample data only**: no sign-in and no database. The data lives in `lib/data.ts`.

Live site: https://kronus-dev.github.io/kronus-design/

## Run locally

Needs Node.js 20.9+ and pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Checks

```bash
pnpm lint
pnpm test       # Vitest + Testing Library
pnpm build      # static site in out/
```

## Deploy

Every push to `main` runs `.github/workflows/deploy-pages.yml`, which lints, tests, builds and publishes `out/` to GitHub Pages.
One-time setup: **Settings → Pages → Source: GitHub Actions**.

## Project layout

- `app/layout.tsx`: page shell (fonts, dark theme)
- `app/page.tsx`: dashboard
- `components/app-shell.tsx`: floating side menu, phone top bar, header
- `components/process-list.tsx`: process table (cards on phones), status sort, pagination
- `lib/data.ts`: sample data, status labels and colours, sort and paging logic
- `tests/`: unit and component tests

The earlier Laravel/Livewire version is in Git history (commit `55083fc`).
