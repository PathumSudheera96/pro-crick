---
name: pro-crick-dev-workflow
description: Use when starting local development on Pro-Crick, running lint/typecheck/build/migrate commands, troubleshooting Docker Compose, or onboarding from a fresh clone. Covers the exact container commands for this repo (Docker service names, migration commands, storage paths).
---

# Pro-Crick Local Dev Workflow

Local dev is Docker Compose only. Production is cPanel, not Docker — don't conflate the two.

## Fresh clone

```bash
cp .env.example .env       # PowerShell: Copy-Item .env.example .env
docker compose up --build
docker compose exec app pnpm payload migrate
```

Open: `http://localhost:3000` (site), `http://localhost:3000/admin` (CMS).

## Everyday commands

Run everything through the `app` container — never install deps or Postgres on the host:

```bash
docker compose exec app pnpm dev
docker compose exec app pnpm lint
docker compose exec app pnpm typecheck
docker compose exec app pnpm build
docker compose exec app pnpm generate:types
docker compose exec app pnpm generate:importmap
```

There is no `pnpm test` script yet — don't invent one or claim it ran.

## Migrations

```bash
docker compose exec app pnpm payload migrate:status
docker compose exec app pnpm payload migrate:create descriptive-name
docker compose exec app pnpm payload migrate
```

Schema push is disabled (`push: false` in `payload.config.ts`) — every schema change needs a committed migration under `src/migrations/`, applied with the command above. Never run `migrate:fresh`, `migrate:reset`, `migrate:refresh`, or `migrate:down` without an explicit, approved rollback plan, and never against production.

## Persistence and networking

- DB hostname from inside the app container is always `db` — never hardcode `localhost` in application code.
- Uploads persist in `./storage` (bind-mounted, gitignored).
- Postgres data persists in the named volume `procric_postgres_data`.
- Never run `docker compose down -v` casually — `-v` deletes the named volumes, including the local database.

## Troubleshooting

```bash
docker compose ps
docker compose logs -f app
docker compose logs -f db
docker compose up -d --build     # after Dockerfile/dependency changes
```

If setup, ports, env vars, migrations, or storage paths change, update `docs/DEVELOPMENT_SETUP.md` and `.env.example` in the same PR — see `AGENTS.md` "Documentation ownership".

Full detail: `docs/DEVELOPMENT_SETUP.md`. Engineering rules: `AGENTS.md`. Current phase/status: `docs/PLANS.md`.
