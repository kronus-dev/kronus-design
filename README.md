# Kronos

Human resources dashboard: company hero, key figures, and a process list you can sort by status and page through. Dark only.

Built with Next.js (App Router, static export), React, Tailwind CSS and shadcn/ui. It's a static site with **sample data only**: no sign-in and no database. The data lives in `lib/data.ts`.

## Design system

Open **Design system** at the bottom of the side menu (`/design-system`). It documents:

- **Foundations**: colour tokens, status colours, type scale and radius, all defined in `app/globals.css`.
- **Kronos components** (`components/kronos/`): page hero, section heading, stat card, status label, process table and card, list pagination, side-menu items, profile menu.
- **Component library** (`components/ui/`): all 63 shadcn/ui components (Base UI, "base-nova" style), themed with the Kronos tokens. Each has its own page with live examples.

To add a shadcn component later: `pnpm dlx shadcn@latest add <name>`, then add it to `components/design-system/registry.ts` with a demo in `components/design-system/examples/` (a test checks the two stay in sync). Most demos are shadcn's official examples; the chat ones (Message, Message Scroller, Trace, Code Block) and Direction are written for Kronos.

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

- `app/layout.tsx`: page shell (font, dark theme, tooltip and toast providers)
- `app/page.tsx`: dashboard
- `app/design-system/`: design system overview and one page per component
- `components/ui/`: shadcn/ui base components
- `components/kronos/`: Kronos components (app shell, stat card, process list, …)
- `components/design-system/`: catalogue, examples and helpers for the design system pages
- `lib/data.ts`: sample data, status labels and colours, sort and paging logic
- `tests/`: unit and component tests

The earlier Laravel/Livewire version is in Git history (commit `55083fc`).
