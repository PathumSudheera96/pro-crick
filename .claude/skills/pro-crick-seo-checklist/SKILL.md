---
name: pro-crick-seo-checklist
description: Use before publishing/launching a new page type, player profile, or route on Pro-Crick, or when reviewing SEO impact of a change. Checklist for meta tags, canonical URLs, Open Graph, sitemap, robots, structured data, and redirects per the V1 SEO requirements.
---

# Pro-Crick SEO Checklist

Reference: `docs/PROJECT_SPEC.md` §16 (SEO Requirements), §17 (Redirects), §34 (Publishing Rules).

## Per-page / per-player metadata

- [ ] `metaTitle` present or falls back to content title/player name + brand suffix
- [ ] `metaDescription` present or falls back to a generated summary
- [ ] `canonicalUrl` present or falls back to the correct public URL for that route
- [ ] `ogTitle` falls back to `metaTitle` when empty
- [ ] `ogDescription` falls back to `metaDescription` when empty
- [ ] `ogImage` falls back to the site default image when empty
- [ ] `index`/`follow` default to `true` for normal published public content
- [ ] Staging environment forces `noindex` regardless of per-page settings

## Publishing status

- [ ] Draft content is excluded from sitemap.xml
- [ ] Draft content resolves to 404 (or otherwise doesn't leak) on its public route
- [ ] Archived content is excluded from normal public listings; behavior on its direct URL stays SEO-safe (no soft-404, no broken canonical)
- [ ] Only Published (and index=true) content appears in `sitemap.xml`

## URL changes

If this change adds, removes, or alters a public URL (`/`, `/players`, `/players/[slug]`, `/about`, `/services`, `/contact`, `/apply`, `/privacy-policy`, `/terms`, or any CMS-managed page slug):

- [ ] Old URL has a 301 redirect entry if it previously existed and had traffic/links
- [ ] No self-redirect or redirect loop introduced
- [ ] `/admin` and internal routes are not redirectable
- [ ] Canonical URLs and sitemap reflect the new URL, not the old one

## Structured data

- [ ] Only encodes facts already present in verified CMS content — never invented claims/stats/counts
- [ ] Valid for its type (Organization, WebSite, BreadcrumbList, person/profile markup where appropriate)

## Technical baseline (verify still working after any routing/layout change)

- [ ] `sitemap.xml` reachable and valid
- [ ] `robots.txt` reachable and reflects staging vs production indexing rules
- [ ] 404 page renders correctly for unknown routes
- [ ] Canonical tag present on every public page

If any box can't be checked because the underlying feature doesn't exist yet, say so explicitly rather than marking it done — cross-reference `docs/PLANS.md` Phase 12 (SEO) status.
