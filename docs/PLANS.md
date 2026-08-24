# docs/PLANS.md — Pro-Crick Implementation Roadmap

## Purpose

This file tracks the current implementation plan, project status, dependencies, decisions, blockers, and next actions for the Pro-Crick website and custom CMS.

Use this file together with:

- `AGENTS.md` — permanent development rules and engineering constraints
- `docs/PROJECT_SPEC.md` — V1 product and CMS requirements
- `docs/CODEX_EXECUTION_STEPS.txt` — step-by-step prompts to run with Codex

Codex should read `AGENTS.md`, `docs/PROJECT_SPEC.md`, and this file before beginning any major implementation task.

---

# 1. Project Summary

Pro-Crick is a professional cricket talent connection platform and player agency website with a custom CMS.

Brand line: **Where Cricket Connects**.

Current approved positioning:

- Initial market focus: connect talented Sri Lankan cricketers with cricket clubs across the United Kingdom.
- Long-term vision: expand into a global cricket talent network connecting players, clubs, and cricket communities internationally.
- Core tone: trust, transparency, partnership, professionalism, passion for cricket, and flexibility.

Primary goals:

- Present Pro-Crick as a premium cricket talent connection platform and player agency
- Communicate the Sri Lanka-to-UK initial opportunity focus clearly
- Maintain a structured player database
- Allow administrators/editors to manage player profiles
- Provide public player search and filtering
- Provide individual player profile pages
- Allow administrators to manage website pages and global settings
- Capture player enquiries
- Capture player applications
- Provide strong technical SEO foundations
- Run on the client's existing cPanel hosting using Node.js and PostgreSQL

Planned stack:

- Next.js App Router
- TypeScript
- Payload CMS
- PostgreSQL
- Tailwind CSS
- pnpm
- GitHub
- Docker Compose for local development
- cPanel production hosting

---

# 2. Current Project Phase

**Current Phase:** Phase 4 - Player CMS

**Current Status:** Shared data foundations are implemented. Player schema work is now in progress.

**Next Main Task:** Complete the Player CMS, then move into Website Content CMS and the player directory query layer

---

# 3. Project Status Tracker

Legend:

- [ ] Not started
- [~] In progress
- [x] Complete
- [!] Blocked

## Phase 0 — Planning

- [x] Choose main architecture
- [x] Choose Next.js + Payload CMS + PostgreSQL
- [x] Confirm PostgreSQL is available in cPanel
- [x] Review basic cPanel resource limits
- [x] Confirm available Node.js version in cPanel
- [x] Create `AGENTS.md`
- [x] Create `docs/CODEX_EXECUTION_STEPS.txt`
- [x] Create `docs/PROJECT_SPEC.md`
- [x] Create `docs/PLANS.md`
- [x] Create private GitHub repository
- [x] Define Docker-based local development requirement
- [x] Create `docs/DEVELOPMENT_SETUP.md`
- [x] Create `CONTRIBUTING.md`
- [~] Add project files to repository
- [ ] Add another developer to the private repository when required
- [x] Run Codex STEP 00 architecture review

## Phase 1 — Application Foundation and Local Docker

- [x] Create `compose.yaml`
- [x] Create `Dockerfile.dev`
- [x] Create `.dockerignore`
- [x] Update `.gitignore` for Docker/local runtime data
- [x] Create/validate `.env.example`
- [x] Configure `app` service
- [x] Configure `db` PostgreSQL service
- [x] Add PostgreSQL health check
- [x] Add persistent PostgreSQL named volume
- [x] Add persistent local upload path/volume
- [!] Verify hot reload
- [x] Verify fresh-clone Docker startup
- [x] Initialize Next.js App Router
- [x] Add TypeScript
- [x] Add Tailwind CSS
- [x] Add Payload CMS
- [x] Configure PostgreSQL
- [x] Add `.env.example`
- [x] Establish project folder structure
- [x] Confirm `/admin` loads
- [x] Confirm development build works
- [x] Confirm production build works
- [x] Verify second-developer onboarding from a clean clone
- [x] Verify documented Docker lint/typecheck/build commands

## Phase 2 — Database and Authentication

- [x] Establish migration workflow
- [x] Document migration commands
- [x] Create Users collection
- [x] Add Administrator role
- [x] Add Editor role
- [x] Enforce server-side access control
- [x] Add basic access-control tests

## Phase 3 — Media and Shared Data

- [x] Create Media collection
- [x] Configure image uploads
- [x] Configure PDF uploads
- [x] Add alt text
- [x] Add file-type restrictions
- [x] Create Playing Roles collection
- [x] Create Countries collection
- [x] Create Clubs collection
- [x] Create reusable SEO field group

## Phase 4 — Player CMS

- [x] Create Players collection
- [x] Add identity fields
- [x] Add cricket fields
- [x] Add availability fields
- [x] Add statistics
- [x] Add clubs/teams
- [x] Add videos
- [x] Add gallery
- [x] Add CV
- [x] Add SEO
- [x] Add publishing controls
- [x] Add featured player control
- [x] Add player sort order
- [x] Create development sample players

## Phase 5 — Website Content CMS

- [x] Create Testimonials collection
- [x] Create Partners collection
- [x] Create Hero block
- [x] Create Rich Text block
- [x] Create Image + Text block
- [x] Create Featured Players block
- [x] Create Stats block
- [x] Create Testimonials block
- [x] Create FAQ block
- [x] Create CTA block
- [x] Create Contact block
- [x] Create Pages collection
- [x] Create Site Settings global
- [x] Create Header global
- [x] Create Footer global

## Phase 6 — Frontend Foundation

- [ ] Create design tokens
- [ ] Create global typography
- [ ] Create spacing system
- [ ] Create buttons
- [ ] Create form controls
- [ ] Create badges
- [ ] Create card styles
- [ ] Create responsive containers
- [ ] Build Header
- [ ] Build mobile navigation
- [ ] Build Footer
- [ ] Connect Header/Footer to Payload

## Phase 7 — Marketing Pages

- [ ] Create generic CMS page renderer
- [ ] Create page block renderers
- [ ] Build Homepage
- [ ] Add approved agency background / "Where Cricket Connects" content
- [ ] Add founder profile content for Dilan Perera and Nisala Tharaka
- [ ] Add mission, vision, values, player benefits, and club benefits content sections
- [ ] Build Partners/Sponsors homepage section
- [ ] Build About page capability
- [ ] Build Services page capability
- [ ] Build Contact page capability
- [ ] Build Privacy page capability
- [ ] Build Terms page capability

## Phase 8 — Player Directory

- [x] Build player query layer
- [x] Add keyword search
- [x] Add Playing Role filter
- [x] Add Nationality filter
- [x] Add Availability filter
- [x] Add Eligible Country filter
- [x] Add pagination
- [x] Add sorting
- [ ] Build player card
- [ ] Build `/players`
- [ ] Add URL-aware filter state
- [ ] Add empty states

## Phase 9 — Player Profiles

- [ ] Build player-by-slug query
- [ ] Build `/players/[slug]`
- [ ] Build player hero
- [ ] Build biography
- [ ] Build cricket details
- [ ] Build statistics
- [ ] Build clubs/teams
- [ ] Build video section
- [ ] Build gallery
- [ ] Build CV download
- [ ] Build enquiry CTA
- [ ] Build related players
- [ ] Handle unpublished/missing players

## Phase 10 — Enquiries

- [ ] Create Enquiries collection
- [ ] Add statuses
- [ ] Add player relationship
- [ ] Build general enquiry form
- [ ] Build player-specific enquiry form
- [ ] Add server-side validation
- [ ] Add spam protection
- [ ] Add success/error states
- [ ] Optional: email notifications

## Phase 11 — Player Applications

- [ ] Create Player Applications collection
- [ ] Add application statuses
- [ ] Build `/apply`
- [ ] Add profile photo upload
- [ ] Add CV upload
- [ ] Add video links
- [ ] Add server-side validation
- [ ] Add spam protection
- [ ] Build application-to-player conversion
- [ ] Ensure converted player starts as Draft

## Phase 12 — SEO

- [ ] Connect reusable SEO fields
- [ ] Implement metadata fallbacks
- [ ] Add canonical URLs
- [ ] Add Open Graph
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Add structured data
- [ ] Add breadcrumbs
- [ ] Create Redirects collection
- [ ] Create redirect runtime
- [ ] Verify noindex behavior
- [ ] Verify 404 behavior

## Phase 13 — Quality

- [ ] Performance review
- [ ] Accessibility review
- [ ] Responsive review
- [ ] Security audit
- [ ] Fix P0/P1 security issues
- [ ] Add empty states
- [ ] Add error states
- [ ] Automated testing pass
- [ ] Production-readiness audit
- [ ] Fix launch blockers

## Phase 14 — cPanel Staging

- [ ] Confirm cPanel Node.js version
- [ ] Create staging subdomain
- [ ] Create PostgreSQL database
- [ ] Create PostgreSQL user
- [ ] Configure production environment variables
- [ ] Configure application root
- [ ] Configure persistent uploads
- [ ] Run database migrations
- [ ] Build application
- [ ] Start/restart Node.js application
- [ ] Ensure staging is noindex
- [ ] Run staging smoke tests

## Phase 15 — Content and UAT

- [ ] Enter real players
- [ ] Add real player images
- [ ] Add player CVs
- [ ] Add real page content
- [ ] Add testimonials
- [ ] Configure company settings
- [ ] Add legal pages
- [ ] Complete SEO metadata
- [ ] Client/admin CMS review
- [ ] Mobile review
- [ ] UAT fixes

## Phase 16 — Production Launch

- [ ] Backup existing production site if applicable
- [ ] Backup production PostgreSQL
- [ ] Tag launch version in Git
- [ ] Configure production environment
- [ ] Run production migrations
- [ ] Build
- [ ] Restart app
- [ ] Verify SSL
- [ ] Verify indexing settings
- [ ] Verify sitemap
- [ ] Verify robots.txt
- [ ] Test player directory
- [ ] Test player profiles
- [ ] Test enquiry form
- [ ] Test application form
- [ ] Test redirects
- [ ] Test 404
- [ ] Configure analytics
- [ ] Configure Search Console
- [ ] Monitor production logs

## Phase 17 — Post-Launch

- [ ] Run post-launch health check
- [ ] Fix critical/high issues
- [ ] Remove temporary development-only code
- [ ] Confirm seed scripts cannot run accidentally in production
- [ ] Confirm documentation is current
- [ ] Record V1 known limitations
- [ ] Create backlog for V2

---

# 4. Confirmed Architecture Decisions

## Application

Decision: Single Next.js application containing both:

- public frontend
- Payload CMS admin

Reason:

- simpler deployment
- fewer repositories
- easier Codex maintenance
- lower hosting complexity
- lower recurring cost

## Local Development

Decision: Docker Compose is the standard local development environment.

Expected services:

- `app` — Next.js + Payload
- `db` — PostgreSQL

Reason:

- consistent setup across developers
- no local PostgreSQL installation required
- easier onboarding and handoff
- reproducible development commands
- reduced machine-specific configuration

Production cPanel is not assumed to use Docker.

## Developer Collaboration

Decision: Share the project through a private GitHub repository rather than ZIP copies.

Developer onboarding must work from:

repository clone
-> `.env.example`
-> Docker Compose
-> migrations
-> optional development seed

No developer should require another person's Docker volume or raw production database to begin work.

## Database

Decision: PostgreSQL

Reason:

- officially supported by Payload
- suitable for structured player relationships
- available in client's cPanel
- scalable beyond V1

## CMS

Decision: Payload CMS

Reason:

- avoids building authentication/admin CRUD from scratch
- strongly typed
- code-first schema
- suitable for Codex
- integrates directly with Next.js
- no WordPress theme/plugin licensing

## Page Editing

Decision: Controlled Payload block builder

Not:

- unrestricted drag-and-drop builder
- Elementor clone

Reason:

- keeps design consistent
- reduces CMS complexity
- easier to maintain
- safer for non-technical editors

## Media

Decision for V1:

- local persistent storage for normal images
- local persistent storage for PDFs
- YouTube/Vimeo URLs for videos

Future option:

- S3-compatible object storage/CDN

## SEO

Decision:

- core technical SEO handled in Next.js code
- editable SEO fields in Payload
- automatic fallbacks where fields are empty

## Source Control

Decision: GitHub is the source of truth for code.

Development:

Local/Codex -> GitHub -> staging -> production

Avoid direct editing of production files.

---

# 5. Open Decisions / Items to Confirm

These items should be confirmed before or during early implementation.

## Hosting

- [ ] Exact cPanel Node.js version
- [ ] cPanel Node.js app startup method
- [ ] PostgreSQL host value
- [ ] cPanel persistent application path
- [ ] allowed environment-variable configuration
- [ ] any server-side build memory limits

## Domain

- [ ] final production domain
- [ ] staging subdomain

## Branding

- [x] Pro-Crick logo available
- [ ] final logo files / SVG
- [x] brand line confirmed: "Where Cricket Connects"
- [x] initial market focus confirmed: Sri Lankan cricketers to UK clubs
- [x] founder names/content source supplied
- [x] official contact email supplied: `connect@pro-crick.com`
- [x] official social links supplied
- [ ] approved typography
- [ ] final brand red color
- [~] photography style
- [~] final frontend visual direction

## Player Requirements

- [ ] final player fields confirmed with client
- [ ] final player filters confirmed
- [ ] confirm whether Sri Lankan nationality/UK eligibility should be featured as default filters or homepage discovery shortcuts
- [ ] whether gender filter is required
- [ ] whether player availability date is needed
- [ ] whether multiple playing roles are allowed
- [ ] whether statistics are overall only or split by format
- [ ] required CV format/size
- [ ] whether agent/internal-only player fields are needed

## Enquiries

- [ ] email notification requirements
- [x] public contact email confirmed: `connect@pro-crick.com`
- [ ] target notification inbox for form submissions
- [ ] SMTP/provider
- [ ] whether WhatsApp CTA is needed

## Player Applications

- [ ] final form fields
- [ ] maximum image size
- [ ] maximum CV size
- [ ] application consent/privacy text
- [ ] whether applicant confirmation email is required

## SEO

- [ ] final URL structure approved
- [ ] target countries/markets
- [ ] keyword research completed
- [ ] whether player profile pages should all be indexable
- [ ] analytics / GTM ID
- [ ] Search Console setup

---

# 6. Current Blockers

Current known blocker:

None for local foundation work.

Notes:

- cPanel Node.js application support has been confirmed with Node.js 22.23.0.
- Docker-based fresh-clone onboarding has been validated on the current host.
- Hot reload still needs an explicit verification pass during frontend work.

---

# 7. Current Task

Complete:

**STEP 01A - Fresh-clone / second-developer onboarding validation**

Next:

**STEP 02 - Database / Migration Foundation review and close-out**

---

# 8. Next Tasks

1. STEP 02 - Database / Migration Foundation review and close-out
2. STEP 03 - Users / Authentication / Roles
3. STEP 04 - Media
4. STEP 05 - Player Taxonomies
5. STEP 06 - SEO Field Group
6. STEP 07 - Players Collection

Do not jump ahead to frontend design until the core CMS data model is stable.

---
# 9. Branch / PR Strategy

Recommended:

- `main` — stable production-ready code
- feature branches for logical stages

Examples:

- `chore/docker-dev`
- `codex/project-bootstrap`
- `codex/database-migrations`
- `codex/auth`
- `codex/media`
- `codex/player-taxonomies`
- `codex/players`
- `codex/pages`
- `codex/frontend-foundation`
- `codex/player-directory`
- `codex/player-profile`
- `codex/enquiries`
- `codex/player-applications`
- `codex/seo`
- `codex/deployment`

Recommended flow:

Codex task
-> inspect
-> implementation plan
-> code
-> tests/build
-> diff review
-> PR
-> Codex review
-> human review
-> merge

---

# 10. Definition of Phase Completion

A phase should not be marked complete unless:

- requested functionality works
- TypeScript passes
- relevant lint passes
- relevant tests pass
- production build passes when practical
- database changes have safe migrations
- access control is correct
- no secrets are committed
- documentation is updated
- no known P0/P1 issue from that phase remains
- changes have been reviewed before merge

---

# 11. V2 Backlog — Not Part of Initial Build

Do not implement these during V1 unless explicitly approved.

Potential future features:

- Player login
- Club login
- Agent accounts
- Player self-service profile updates
- Approval workflows
- Club shortlists
- Private player opportunities
- Messaging
- Automated player/club matching
- CRM assignment
- Internal notes
- Follow-up reminders
- Subscription/payment system
- Advanced analytics
- External cricket statistics integrations
- API access
- S3/object-storage migration
- Elasticsearch/advanced search

---

# 12. Update Rules for This File

After each completed major stage:

1. Mark completed checklist items.
2. Update `Current Project Phase`.
3. Update `Current Task`.
4. Add/remove blockers.
5. Record important architectural decisions.
6. Add newly approved scope changes.
7. Do not erase historical decisions without noting why they changed.

This file should always answer:

- Where are we now?
- What is complete?
- What is blocked?
- What do we do next?
- What important decisions have already been made?
- [x] Create Enquiries collection
- [x] Add statuses
- [x] Add player relationship
- [ ] Build general enquiry form
- [ ] Build player-specific enquiry form
- [x] Add server-side validation
- [x] Add spam protection
- [x] Add success/error states
- [x] Create Player Applications collection
- [x] Add application statuses
- [ ] Build `/apply`
- [x] Add profile photo upload
- [x] Add CV upload
- [x] Add video links
- [x] Add server-side validation
- [x] Add spam protection
- [x] Build application-to-player conversion
- [x] Ensure converted player starts as Draft
