---
name: pro-crick-new-collection
description: Use when adding or substantially changing a Payload collection or global in Pro-Crick (e.g. Players, Testimonials, Media, Enquiries, Player Applications, Playing Roles, Countries, Clubs, Site Settings, Header, Footer). Walks through the full checklist so nothing is skipped - fields, access, migration, types, registration.
---

# Adding/Changing a Payload Collection or Global

Follow in order. Don't skip steps even for a "small" field addition — a missed migration or access rule is a production bug.

## 1. Confirm scope

Check `docs/PROJECT_SPEC.md` §9-13 (Players, taxonomies, Pages, Testimonials, Media) or the relevant section for the exact fields expected. Don't invent fields beyond spec without flagging it as a scope question (`AGENTS.md` §38 Scope Change Rule).

Check `AGENTS.md`'s "Expected repository layout" for where the file belongs:
- Collections → `src/collections/`
- Globals → `src/globals/`
- Blocks → `src/blocks/`
- Reusable field groups (e.g. SEO) → shared location referenced from multiple collections, not copy-pasted

## 2. Write the schema

- Use relationships to reusable collections (Playing Roles, Countries, Clubs) for any filter-critical or reused value — never free text for those (`docs/PROJECT_SPEC.md` §10).
- Add the reusable SEO field group where the spec calls for it (Players, Pages).
- Add publishing status (draft/published/archived) where the spec calls for it.

## 3. Access control

Every collection/global needs explicit `access` rules — don't leave Payload defaults. Default posture:
- `administrator`: full access
- `editor`: content-management access per `AGENTS.md` "Users and access control", no user admin, no system config
- `public`: read-only on published content only (if publicly readable at all); write only through explicitly designed form endpoints, never direct collection writes

If this is security-sensitive (Enquiries, Player Applications, Users), hand off to or cross-check with the `access-control` agent.

## 4. Register it

Add the collection/global to `collections`/`globals` in `payload.config.ts`.

## 5. Migration

Schema push is disabled. Generate and commit a migration:

```bash
docker compose exec app pnpm payload migrate:create descriptive-name
```

Review the generated SQL — check for destructive operations on populated tables (drop/rename without a data-preservation plan). If this touches production data shape, consider running it past the `db-migration-reviewer` agent before merging.

## 6. Regenerate types

```bash
docker compose exec app pnpm generate:types
```

Never hand-edit `src/payload-types.ts`.

## 7. Verify

```bash
docker compose exec app pnpm typecheck
docker compose exec app pnpm lint
docker compose exec app pnpm payload migrate
```

Confirm in `/admin` that the collection appears in the right nav group (`AGENTS.md` "CMS information architecture") and behaves as expected for both admin and editor roles.

## 8. Update docs if needed

If this added an env var, changed setup steps, or changed migration commands, update `docs/DEVELOPMENT_SETUP.md`/`.env.example` and `docs/PLANS.md`'s status tracker.
