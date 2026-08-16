---
name: pro-crick-new-page-block
description: Use when adding or changing a Pages block in Pro-Crick (Hero, Rich Text, Image+Text, Featured Players, Stats, Testimonials, FAQ, CTA, Contact) - both the Payload block schema and its Next.js frontend renderer. Invoke for tasks like "add the Stats block", "change the Hero block fields".
---

# Adding/Changing a Page Block

Pro-Crick uses a **controlled** block library for Pages — not a free-form visual builder. Do not add a new block type outside the approved library (`AGENTS.md` "Page collection") without flagging it as a scope question first.

Approved library: Hero, Rich Text, Image + Text, Featured Players, Stats, Testimonials, FAQ, CTA, Contact.

## 1. Schema (`src/blocks/`)

- Clearly named fields, sensible validation, stable `slug`/block identifier (renaming it later breaks existing page content).
- No arbitrary code/HTML entry fields — editors select structured content (images via Media, players via relationship, rich text via the Lexical editor), never raw HTML/JS injection.
- If the block references Players or Testimonials, use a relationship field, not free text or duplicated data.
- Register the block in the Pages collection's blocks array (`src/collections/Pages.ts` once it exists).

## 2. Frontend renderer (`src/app/(frontend)/`)

- Server Component by default.
- Follow brand direction: white/black/cricket-red, generous whitespace, no gradients/clutter/excessive animation (`AGENTS.md` "Design and frontend rules").
- Mobile-first responsive — no horizontal overflow.
- Accessible: semantic HTML, correct heading level for context (blocks don't own page `<h1>` — that's the page/Hero's job), labeled interactive elements, meaningful alt text on any images.
- If the block shows Players (Featured Players) or Testimonials, use the shared query layer — don't write a one-off unbounded query.

## 3. Wire into the block-to-component map

Pages render blocks by iterating the block array and mapping each block's slug to its renderer component. Add the new block to that map/switch when it exists.

## 4. Migration

New block = schema change → follow the migration steps in `pro-crick-new-collection` skill (`migrate:create`, review SQL, `generate:types`).

## 5. Verify

```bash
docker compose exec app pnpm typecheck
docker compose exec app pnpm lint
docker compose exec app pnpm build
```

Confirm in `/admin` that editors can add/reorder/remove the block on a Page, and that the frontend renders it correctly at mobile/tablet/desktop widths.
