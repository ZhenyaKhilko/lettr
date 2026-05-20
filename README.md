# Application Letters

Frontend test task: generate and manage cover letters in the browser.

## Stack

- React 19 + TypeScript
- Tailwind CSS v4
- Vite
- React Router
- Vitest + Testing Library
- Playwright

## Architecture

The project follows a lightweight domain-oriented structure inspired by FSD principles:

- `src/entities/letter` — domain model, generation logic, validation, storage, context
- `src/shared` — global config, hooks, API layer, and reusable low-level/UI utilities
- `src/widgets` — composed UI blocks for pages
- `src/pages` — route-level composition and user flows
- `src/app` — app entrypoint, providers, and global styles

## Features

- **Dashboard** (`/`) — list of saved letters, delete & copy, goal banner until 5 letters
- **Generator** (`/create`, `/letter/:id`) — form + live preview, 2s loading simulation
- **Persistence** — `IndexedDB` (survives tab close)
- **Responsive** — mobile-friendly layout (stacked form/preview, single-column cards)

## Scripts

```bash
npm install
npm run dev
npm run build
npm run test:unit
npm run test:e2e
```
