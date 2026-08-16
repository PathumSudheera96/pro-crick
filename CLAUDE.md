# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pro-Crick: cricket player agency website + custom CMS. Single Next.js (App Router) app containing both the public frontend and Payload CMS admin, backed by PostgreSQL, self-hosted on cPanel in production. Local dev runs in Docker Compose.

Full product spec: `docs/PROJECT_SPEC.md`. Live roadmap/status: `docs/PLANS.md`. Engineering rules: `AGENTS.md` (read this — it is long and detailed; the summary below is not a substitute). Local setup detail: `docs/DEVELOPMENT_SETUP.md`.

**Project phase**: early scaffolding only. `Users` collection exists but has no fields/roles yet; no Players/Pages/Media/Enquiries/etc. collections exist yet. Check `docs/PLANS.md` section 3 (status tracker) before assuming a feature exists.

## Commands

All commands normally run inside the `app` container:

```bash
docker compose up --build              # start app (:3000) + db, from a fresh clone
docker compose exec app pnpm dev
docker compose exec app pnpm lint
docker compose exec app pnpm typecheck
docker compose exec app pnpm build
docker compose exec app pnpm payload migrate:status
docker compose exec app pnpm payload migrate:create descriptive-name
docker compose exec app pnpm payload migrate
docker compose exec app pnpm generate:types    # regenerate src/payload-types.ts after schema changes
docker compose exec app pnpm generate:importmap
```

There is no `test` script yet. Do not invent one being run.

`pnpm typecheck` and `pnpm build` both run `scripts/reset-next-env.mjs` (`prepare:next-env`) before/after — this regenerates `next-env.d.ts`; don't hand-edit that file.

Payload schema push is disabled (`push: false` in `payload.config.ts`) — every schema change needs a committed migration under `src/migrations/`, applied via `pnpm payload migrate`. Never run `migrate:fresh/reset/refresh/down` against production.

DB hostname inside Docker is `db`, never hardcode `localhost`. Never run `docker compose down -v` casually — it deletes the local Postgres volume.

## Architecture

- `payload.config.ts` (repo root) — Payload config: registers collections, Postgres adapter (`prodMigrations: migrations`, `push: false`), Lexical rich text editor, `PAYLOAD_SECRET`/`DATABASE_URI` from env. `src/payload-types.ts` is generated from this — never hand-edit it.
- `src/app/(frontend)/` — public Next.js site (route group, no `/admin` prefix in URLs).
- `src/app/(payload)/` — Payload's own admin UI, REST/GraphQL API routes, and generated `importMap.js`. Treat as CMS-owned scaffolding; don't restructure by hand.
- `src/collections/` — Payload collection configs (currently only `Users.ts`). Per `AGENTS.md`'s expected layout, new collections/globals/blocks go in `src/collections/`, `src/globals/`, `src/blocks/`, with shared logic in `src/lib/{seo,validation,queries}/`, `src/access/`, `src/hooks/`.
- `src/migrations/` — committed Payload/Postgres migrations, registered via `src/migrations/index.ts` and passed to the db adapter as `prodMigrations`.
- `storage/` — local persistent upload storage (bind-mounted, gitignored). Production uses local persistent filesystem storage too, not S3, in V1.
- Path aliases (`tsconfig.json`): `@/*` → `src/*`, `@payload-config` → `payload.config.ts`, `payload/generated-types` → `src/payload-types.ts`.

### Data model direction (see `docs/PROJECT_SPEC.md` / `AGENTS.md` for full detail)

Players are the central entity. Filter-critical/reused values (Playing Roles, Countries, Clubs) are meant to be their own reusable collections/relationships, not free text. Pages use a controlled block builder (Hero, Rich Text, Image+Text, Featured Players, Stats, Testimonials, FAQ, CTA, Contact) — no free-form visual builder. Two roles planned: `administrator` (full access incl. user management) and `editor` (content/players/leads, no user admin, no system config) — access control must be enforced server-side via Payload access functions, not hidden UI. Enquiries and Player Applications are separate collections, never public content; an approved Application can be converted to a draft Player (never auto-published). Every Page/Player gets a reusable SEO field group with fallback logic (title/description/OG/canonical/index-follow) implemented in code, not left to editors to fill in manually every time.

## Subagents and skills

`.claude/agents/` and `.claude/skills/` are committed to the repo — use them rather than reinventing the same work ad hoc.

Subagents (delegate via the Agent tool):
- `payload-schema` — collections/globals/blocks, migrations, generated types, query layer
- `access-control` — Payload access-control functions, public form endpoint security
- `frontend-builder` — public Next.js frontend (pages, components, block renderers)
- `seo-guardian` — SEO field group, metadata fallbacks, sitemap/robots/redirects/structured data
- `db-migration-reviewer` — review-only gate on schema/migration safety before merge

Skills (invoke via the Skill tool):
- `pro-crick-dev-workflow` — Docker/migrate/lint/typecheck/build command reference
- `pro-crick-new-collection` — checklist for adding/changing a Payload collection or global
- `pro-crick-new-page-block` — checklist for adding/changing a Pages block
- `pro-crick-seo-checklist` — pre-publish SEO checklist for new pages/routes

When engineering rules in `AGENTS.md` change (roles, migration workflow, SEO model), update the matching agent/skill file in the same change — see `CONTRIBUTING.md` §11A.

## Hard constraints (non-negotiable, from `AGENTS.md`)

- Do not add Redis, Elasticsearch, a second CMS/ORM, microservices, or a separate frontend repo without an explicit, documented reason.
- Do not upgrade framework/DB dependencies as part of unrelated work.
- Never commit secrets, `.env`, or production credentials — placeholders only in `.env.example`.
- Schema changes affecting production data need a migration; don't drop/rename populated fields without one.
- Public form endpoints (enquiries, applications) must validate server-side, never trust client validation, never leak internal errors, and must never allow unrestricted public write access to protected collections.
- Don't change established public URLs without considering redirects/canonical/sitemap.
- Avoid unrelated refactors bundled into a feature change.
