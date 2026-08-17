# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary audiences, served by the same public site:

- **Cricket clubs and organizations** — browsing the player directory to discover and enquire about players, including overseas clubs looking to place/recruit talent.
- **Prospective players** — reviewing how Pro-Crick represents players and submitting an application to be represented.

Secondary/internal audience: Pro-Crick **administrators and editors** managing players, content, and leads through the Payload CMS admin.

## Product Purpose

Pro-Crick is a professional cricket player agency. The website exists to let clubs discover and enquire about represented players, let players apply to be represented, and let Pro-Crick's own staff manage player profiles and site content without needing a developer or an expensive WordPress stack. Success = clubs/players can complete their respective flows (browse → enquire, or apply → get reviewed) and Pro-Crick staff can run the whole site themselves.

## Positioning

Pro-Crick sits between "generic player directory" and "overseas placement specialist" — both are core, roughly equal emphasis:

- **Curated agency representation**: players are vetted and represented, not self-listed; the agency stands behind who it presents.
- **Placement/connection mechanism**: helping players reach clubs and opportunities (including overseas), not just publishing a static roster.

Functionally inspired by professional cricket agency/player-directory sites (e.g. CricX's business model), but must be visually and content-wise distinct — own branding, own copy, own design system, no cloned layout or wording.

## Operating Context

- Single Next.js (App Router) app serving both the public marketing/directory site and the Payload CMS admin (`/admin`).
- Local dev via Docker Compose (`app` + `db` services); production is self-hosted on cPanel with PostgreSQL and persistent local filesystem storage (not S3, not Docker in prod).
- CMS-driven: Pages use a controlled block builder (Hero, Rich Text, Image+Text, Featured Players, Stats, Testimonials, FAQ, CTA, Contact) — no free-form visual builder. Two CMS roles: `administrator` (full access) and `editor` (content/players/leads, no user admin, no system config).
- Two structured lead-capture flows feed the CMS, never public content: general/player-specific **Enquiries** (from clubs) and **Player Applications** (from players), with an admin-driven approved-application → draft-player conversion path.

## Capabilities and Constraints

- Player is the central data entity: identity, personal info, cricket info (role/batting/bowling style/clubs), availability, career, presentation-level statistics, media (gallery + YouTube/Vimeo links, no self-hosted video), external profile links, CV download.
- Filter-critical/reused values (Playing Role, Country/Nationality, Club) are structured reusable collections/relationships, not free text.
- Player directory: unified `/players` listing with server-side search/filter (role, nationality, availability, eligible country) and pagination — explicitly not a client-side-filtered dump of the whole dataset. No regional split pages, no interactive map (considered against the CricX reference and cut for V1).
- Homepage includes a Partners/Sponsors logo section (new, small `Partners` collection: name, logo, optional link, sort order) — homepage-only, not a reusable Page block.
- No dedicated "club registration" flow — the general Enquiry form covers that case.
- Full SEO layer is required from V1: reusable SEO field group (meta title/description, canonical, OG, index/follow) on Pages and Players with code-driven fallbacks, sitemap.xml, robots.txt, structured data, redirects.
- Explicit V1 non-goals: player/club/agent login or portals, self-service profile editing, shortlisting, messaging, automated matching, payments/subscriptions, CRM, live scores or external cricket-stat API integrations, match-scoring engine, multi-language, mobile apps, Elasticsearch, Redis, a full drag-and-drop page builder, large self-hosted video.
- Do not add Redis, Elasticsearch, a second CMS/ORM, microservices, or a separate frontend repo without an explicit, documented reason.

## Brand Commitments

- Name: **Pro-Crick**. Logo assets exist at `public/images/` (`pro-crick-ICO.ico`, `pro-crick-PNG.png`, `pro-crick-SVG.svg`) — committed, but PNG/SVG are oversized for web delivery and need optimizing before production use.
- Declared color direction: white-dominant background, black primary typography/details, cricket-ball red as an accent. Exact accent hex and typeface are **not yet fixed** — open to derive from the logo and propose during design work, not client-mandated.
- Desired tone: premium, modern, clean, international, professional sports-agency feel; editorial player photography; generous whitespace.
- Explicitly avoid: generic sports-club template look, excessive gradients/animation, visual clutter, gaming/esports styling, and cloning the CricX reference site's visual design, wording, or imagery.

## Evidence on Hand

- No real player data, testimonials, or verified statistics yet — **everything is placeholder for the V1 build**. Client supplies/approves real player info, photos, stats, CVs, videos, testimonials, and business claims before launch; do not fabricate specific numbers or claims (e.g. "6,000+ placements"-style figures) — homepage Stats/Counters must stay CMS-editable and empty/generic until the client provides real figures.
- Logo files (see Brand Commitments) are the only concrete brand asset on hand so far.

## Product Principles

1. Players are the central entity — every other collection (taxonomies, testimonials, pages) exists to support presenting and connecting players, not as independent content types.
2. Curated, not self-serve — the agency-representation story and the placement/connection story carry equal narrative weight; neither should crowd out the other in copy or layout.
3. CMS-editable over hard-coded — content, stats, SEO metadata, and structured data must have safe fallbacks and be editable by non-technical staff, not fixed in code.
4. Distinct from the reference, not derivative — functional inspiration from the CricX business model is fine; visual, textual, or structural cloning is not.
5. Lean V1 over feature completeness — when a CricX-style feature (regional pages, live social feed, interactive map, club registration, stats dashboard) isn't confirmed as needed, leave it out rather than build it speculatively.

## Accessibility & Inclusion

No formal standard (e.g. WCAG level) has been specified by the client. General good-practice accessibility is a stated requirement: semantic HTML, logical heading hierarchy, visible keyboard focus, keyboard-usable navigation, accessible mobile menu, labeled forms with accessible validation errors, meaningful image alt text, reasonable color contrast, accessible pagination and filters.
