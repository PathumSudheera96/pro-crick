# PLANS.md — Pro-Crick Implementation Roadmap

## Purpose

This file tracks the current implementation plan, project status, dependencies, decisions, blockers, and next actions for the Pro-Crick website and custom CMS.

Use this file together with:

- `AGENTS.md` — permanent development rules and engineering constraints
- `PROJECT_SPEC.md` — V1 product and CMS requirements
- `CODEX_EXECUTION_STEPS.txt` — step-by-step prompts to run with Codex

Codex should read `AGENTS.md`, `PROJECT_SPEC.md`, and this file before beginning any major implementation task.

---

# 1. Project Summary

Pro-Crick is a professional cricket player agency website with a custom CMS.

Primary goals:

- Present Pro-Crick as a premium international cricket player agency
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

**Current Phase:** Phase 0 — Architecture and Project Setup

**Current Status:** Application foundation created; Docker runtime verification blocked on host Docker CLI availability

**Next Main Task:** Complete STEP 01 Docker runtime verification on a machine with Docker available, then run STEP 01A

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
- [ ] Confirm available Node.js version in cPanel
- [x] Create `AGENTS.md`
- [x] Create `CODEX_EXECUTION_STEPS.txt`
- [x] Create `PROJECT_SPEC.md`
- [x] Create `PLANS.md`
- [x] Create private GitHub repository
- [x] Define Docker-based local development requirement
- [x] Create `DEVELOPMENT_SETUP.md`
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
- [!] Verify fresh-clone Docker startup
- [x] Initialize Next.js App Router
- [x] Add TypeScript
- [x] Add Tailwind CSS
- [x] Add Payload CMS
- [x] Configure PostgreSQL
- [x] Add `.env.example`
- [x] Establish project folder structure
- [!] Confirm `/admin` loads
- [!] Confirm development build works
- [x] Confirm production build works
- [ ] Verify second-developer onboarding from a clean clone
- [ ] Verify documented Docker lint/typecheck/test/build commands

## Phase 2 — Database and Authentication

- [ ] Establish migration workflow
- [ ] Document migration commands
- [ ] Create Users collection
- [ ] Add Administrator role
- [ ] Add Editor role
- [ ] Enforce server-side access control
- [ ] Add basic access-control tests

## Phase 3 — Media and Shared Data

- [ ] Create Media collection
- [ ] Configure image uploads
- [ ] Configure PDF uploads
- [ ] Add alt text
- [ ] Add file-type restrictions
- [ ] Create Playing Roles collection
- [ ] Create Countries collection
- [ ] Create Clubs collection
- [ ] Create reusable SEO field group

## Phase 4 — Player CMS

- [ ] Create Players collection
- [ ] Add identity fields
- [ ] Add cricket fields
- [ ] Add availability fields
- [ ] Add statistics
- [ ] Add clubs/teams
- [ ] Add videos
- [ ] Add gallery
- [ ] Add CV
- [ ] Add SEO
- [ ] Add publishing controls
- [ ] Add featured player control
- [ ] Add player sort order
- [ ] Create development sample players

## Phase 5 — Website Content CMS

- [ ] Create Testimonials collection
- [ ] Create Hero block
- [ ] Create Rich Text block
- [ ] Create Image + Text block
- [ ] Create Featured Players block
- [ ] Create Stats block
- [ ] Create Testimonials block
- [ ] Create FAQ block
- [ ] Create CTA block
- [ ] Create Contact block
- [ ] Create Pages collection
- [ ] Create Site Settings global
- [ ] Create Header global
- [ ] Create Footer global

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
- [ ] Build About page capability
- [ ] Build Services page capability
- [ ] Build Contact page capability
- [ ] Build Privacy page capability
- [ ] Build Terms page capability

## Phase 8 — Player Directory

- [ ] Build player query layer
- [ ] Add keyword search
- [ ] Add Playing Role filter
- [ ] Add Nationality filter
- [ ] Add Availability filter
- [ ] Add Eligible Country filter
- [ ] Add pagination
- [ ] Add sorting
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
- [ ] approved typography
- [ ] final brand red color
- [ ] photography style
- [ ] final frontend visual direction

## Player Requirements

- [ ] final player fields confirmed with client
- [ ] final player filters confirmed
- [ ] whether gender filter is required
- [ ] whether player availability date is needed
- [ ] whether multiple playing roles are allowed
- [ ] whether statistics are overall only or split by format
- [ ] required CV format/size
- [ ] whether agent/internal-only player fields are needed

## Enquiries

- [ ] email notification requirements
- [ ] target notification email address
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

**Confirm cPanel Node.js version and Node application support details before final deployment planning.**

Local development is not blocked because the project will use Docker Compose.

This does not prevent local development from starting.

STEP 01 runtime verification blocker:

**Docker CLI is not installed or not available on PATH in the current execution environment.** The project files, dependency install, lint, typecheck, and production build were completed, but `docker compose up --build`, database health, `/admin` runtime access, hot reload, and persistence verification must be run on a host with Docker available.

---

# 7. Current Task

Complete:

**STEP 01 � Initial Project Bootstrap**

Remaining verification requires Docker CLI availability on the host.

---

# 8. Next Tasks

After STEP 01 Docker runtime verification is completed:

1. STEP 01A � Fresh-clone / second-developer onboarding validation
2. STEP 02 � Database / Migration Foundation
3. STEP 03 � Users / Authentication / Roles
4. STEP 04 � Media
5. STEP 05 � Player Taxonomies
6. STEP 06 � SEO Field Group
7. STEP 07 � Players Collection

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
