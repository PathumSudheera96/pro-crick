# docs/PROJECT_SPEC.md — Pro-Crick V1 Product Specification

## 1. Document Purpose

This document defines what Pro-Crick V1 must contain.

It describes product requirements, CMS capabilities, public website functionality, player data, SEO, forms, design direction, permissions, and V1 acceptance criteria.

This is a product specification, not a coding-style guide.

Use together with:

- `AGENTS.md` — engineering and Codex rules
- `docs/PLANS.md` — implementation progress and roadmap
- `docs/CODEX_EXECUTION_STEPS.txt` — executable Codex prompts

If implementation details conflict with this product specification, the product requirement should be clarified before changing scope.

---

# 2. Product Overview

Pro-Crick is a professional cricket player agency website.

The site should help:

1. cricket clubs and organizations discover players
2. users review structured player profiles
3. users enquire about specific players
4. prospective players apply to join Pro-Crick
5. Pro-Crick administrators manage players and website content
6. the website rank effectively in search engines
7. the business avoid dependency on expensive WordPress themes/plugins

The website is inspired functionally by professional cricket agency/player directory websites such as CricX, but must use its own branding, content, layout, design system, and implementation.

Do not clone copyrighted designs, wording, imagery, or proprietary data.

---

# 3. V1 Technology

V1 target stack:

- Next.js App Router
- TypeScript
- Payload CMS
- PostgreSQL
- Tailwind CSS
- pnpm
- GitHub
- Docker Compose for standard local development
- cPanel hosting

The public website and CMS should run within the same Next.js application.

---

# 4. User Types

## 4.1 Public Visitor

Can:

- browse public website
- view player directory
- filter/search players
- view published player profiles
- submit general enquiries
- submit player-specific enquiries
- submit a player application
- download public player CVs where available

Cannot:

- access CMS
- see drafts
- see private application data
- see internal enquiry notes/status unless explicitly exposed later

## 4.2 Editor

Can:

- manage players
- manage pages
- manage testimonials
- manage partners
- manage media
- manage enquiries
- manage player applications
- use approved website content controls

Cannot:

- manage administrator accounts
- access secrets
- change protected system configuration
- bypass server-side permissions

## 4.3 Administrator

Can:

- perform all Editor actions
- manage users
- manage site globals/settings
- manage redirects
- perform protected administrative actions

---

# 5. Public Website Information Architecture

Required V1 public routes/capabilities:

- `/`
- `/players`
- `/players/[slug]`
- `/about`
- `/services`
- `/contact`
- `/apply`
- `/privacy-policy`
- `/terms`

Additional CMS-managed pages may be added without code changes where compatible with the routing model.

---

# 6. Homepage

The homepage should support these content sections:

## 6.1 Hero

Fields:

- headline
- supporting text
- background/image
- primary CTA
- secondary CTA if needed

## 6.2 Introduction

Purpose:

- explain Pro-Crick
- establish credibility
- summarize agency value

## 6.3 Featured Players

Requirements:

- manually select or feature players from CMS
- display player cards
- link to player profiles

## 6.4 Services / What We Do

Examples:

- player representation
- club/player connections
- overseas opportunities
- cricket placement support

Exact content to be provided/approved by client.

## 6.5 Stats / Counters

Examples:

- represented players
- countries
- clubs
- years of experience

Do not display claims that have not been verified.

## 6.6 Testimonials

CMS-managed.

## 6.7 CTA

Example objectives:

- Find a Player
- Enquire Now
- Apply to Join

## 6.8 Partners / Sponsors

Requirements:

- display a row/strip of partner or sponsor logos
- CMS-managed via a dedicated Partners collection (see §12A)
- each logo may optionally link out to the partner's site
- homepage only in V1; not part of the reusable page block library

---

# 7. Player Directory

Route:

`/players`

This is one of the primary V1 features.

## 7.1 Player Card

Should support:

- profile image
- player name
- primary playing role
- nationality
- availability status
- optional club
- View Profile action

## 7.2 Search

Support keyword search against appropriate player data.

Potential search fields:

- name
- club
- relevant summary fields

Search implementation should remain efficient as data grows.

## 7.3 Filters

Required:

- Playing Role
- Nationality
- Availability
- Eligible Country

Optional if client confirms:

- Gender
- Club
- Batting Style
- Bowling Style

## 7.4 Pagination

Required.

Do not load an unlimited number of player records into the browser.

## 7.5 Filter URLs

Important filter state should be reflected in query parameters where practical.

Example:

`/players?role=all-rounder&nationality=sri-lanka`

Benefits:

- shareable results
- predictable navigation
- future SEO/analytics flexibility

## 7.6 Empty State

If no players match, show a clear message and option to reset filters.

---

# 8. Player Profile

Route:

`/players/[slug]`

Only published players should be publicly accessible.

Each profile may contain:

## 8.1 Hero / Summary

- player name
- profile image
- primary role
- nationality
- availability
- current club where appropriate
- short introduction

## 8.2 Personal Information

- date of birth
- nationality
- gender where appropriate
- current location

## 8.3 Cricket Information

- primary role
- batting style
- bowling style
- current club
- previous clubs
- teams represented

## 8.4 Availability

- status
- availability date
- eligible countries

Player statuses:

- Available
- Contracted
- Unavailable

## 8.5 Biography

Rich text.

## 8.6 Career

- career highlights
- achievements
- playing experience

## 8.7 Statistics

Initial V1 statistics:

- matches
- runs
- batting average
- highest score
- hundreds
- fifties
- wickets
- bowling average
- best bowling
- economy rate

This is presentation data.

V1 does not require a full match-by-match scoring/statistics engine.

## 8.8 Media

- photo gallery
- YouTube links
- Vimeo links

Do not upload large videos directly to the hosting server in V1.

## 8.9 External Links

Optional:

- Instagram
- ESPNcricinfo
- Cricbuzz

## 8.10 Documents

Optional:

- player CV / PDF

## 8.11 Enquiry CTA

Each player profile should provide an obvious:

**Enquire About This Player**

action.

## 8.12 Related Players

Optional/recommended.

Can use:

- role
- nationality
- availability
- other structured attributes

---

# 9. Player CMS Data Model

## 9.1 Identity

Required/possible fields:

- `fullName`
- `slug`
- `profileImage`
- `heroImage`
- `gallery`
- `shortIntroduction`
- `biography`

## 9.2 Personal

- `dateOfBirth`
- `nationality`
- `gender`
- `currentLocation`

## 9.3 Cricket

- `primaryRole`
- `battingStyle`
- `bowlingStyle`
- `currentClub`
- `previousClubs`
- `teamsRepresented`

## 9.4 Availability

- `playerStatus`
- `availabilityDate`
- `eligibleCountries`

## 9.5 Career

- `careerHighlights`
- `achievements`
- `playingExperience`

## 9.6 Statistics

- `matches`
- `runs`
- `battingAverage`
- `highestScore`
- `hundreds`
- `fifties`
- `wickets`
- `bowlingAverage`
- `bestBowling`
- `economyRate`

## 9.7 Media and External

- `youtubeVideos`
- `vimeoVideos`
- `instagramUrl`
- `espnCricinfoUrl`
- `cricbuzzUrl`
- `playerCv`

## 9.8 Admin

- `featured`
- `sortOrder`
- publishing status

## 9.9 SEO

Use reusable SEO fields.

---

# 10. Reusable Player Data Collections

V1 should have structured reusable collections for filter-critical entities.

## 10.1 Playing Roles

Examples:

- Batter
- Bowler
- All-rounder
- Wicketkeeper

The final role naming should be confirmed with the client.

Fields:

- name
- slug
- active/status if required

## 10.2 Countries / Nationalities

Fields:

- name
- slug
- optional country code
- active/status if needed

Used for:

- nationality
- eligibility
- filtering

## 10.3 Clubs / Teams

Fields:

- name
- slug
- country if useful
- status

Used for:

- current club
- previous clubs
- teams represented

---

# 11. Page Management

The CMS must allow the client to manage website pages without editing source code.

V1 should NOT include a free-form visual builder.

Use controlled content blocks.

Required blocks:

1. Hero
2. Rich Text
3. Image + Text
4. Featured Players
5. Stats
6. Testimonials
7. FAQ
8. CTA
9. Contact

Page fields:

- title
- slug
- publishing status
- page blocks
- SEO

Editors should be able to:

- create/edit pages
- reorder blocks
- change block content
- select images
- select players/testimonials
- publish/unpublish

Editors should not be able to:

- inject arbitrary JavaScript
- modify application code
- modify low-level system behavior

---

# 12. Testimonials

Fields:

- person name
- title/role
- club/organization
- quote
- image
- country if useful
- featured
- sort order
- publishing status

Used on:

- homepage
- about
- other CMS pages

---

# 12A. Partners / Sponsors

Fields:

- name
- logo
- linkUrl (optional)
- sortOrder
- publishing status (active/inactive)

Used on:

- homepage (§6.8)

Not part of the reusable page block library in V1 — homepage-only section, similar to how Testimonials appears on the homepage without being a Page block.

---

# 13. Media Library

Support:

- JPEG
- PNG
- WebP where compatible
- SVG only if explicitly handled safely
- PDF

CMS fields should support:

- title
- alt text
- caption
- file
- metadata available from Payload

V1 storage:

- local persistent hosting storage

Media requirements:

- player profile images
- gallery images
- page images
- logos
- testimonials
- PDFs

Do not expose server filesystem paths.

---

# 14. Enquiries

## 14.1 General Enquiry

Public visitor can submit:

- name
- club/organization
- country
- email
- phone
- message

## 14.2 Player-specific Enquiry

Same general fields plus:

- related Player

## 14.3 Enquiry CMS Fields

- reference number
- related player
- name
- club/organization
- country
- email
- phone
- message
- status
- created date

Statuses:

- New
- Contacted
- In Progress
- Closed

## 14.4 Requirements

- submissions stored in CMS/database
- server-side validation
- safe error messages
- spam/abuse protection
- public users must not have unrestricted write access to the collection

Optional:

- admin notification email
- user confirmation email

---

# 15. Player Applications

Public route:

`/apply`

The form should allow players to apply to Pro-Crick.

Suggested fields:

- applicant name
- email
- phone
- nationality
- date of birth
- current location
- primary role
- batting style
- bowling style
- current club
- playing experience
- teams
- statistics
- biography
- profile photo
- video links
- player CV

Application statuses:

- New
- Under Review
- Approved
- Rejected

## 15.1 Application-to-Player Conversion

Required/recommended V1 feature:

Authorized admin/editor can convert an approved application into a **new Player draft**.

Requirements:

- do not publish automatically
- do not destroy the original application
- avoid duplicate conversion
- copy compatible structured data
- allow admin review before publishing

---

# 16. SEO Requirements

SEO is a core V1 requirement.

## 16.1 Editable SEO Fields

Pages and Players should support:

- meta title
- meta description
- canonical URL
- OG title
- OG description
- OG image
- index
- follow

## 16.2 Automatic Fallbacks

If custom SEO fields are empty:

Meta title:
- use content title/player name plus brand

Meta description:
- use meaningful summary content where practical

OG title:
- fallback to meta title

OG description:
- fallback to meta description

OG image:
- fallback to site default

Canonical:
- fallback to correct public URL

Index/follow:
- true by default for normal published public content

## 16.3 Technical SEO

Application should handle:

- `sitemap.xml`
- `robots.txt`
- canonical tags
- Open Graph
- structured data
- breadcrumbs
- redirects
- 404 handling
- noindex behavior
- clean public URLs

## 16.4 Structured Data

Potential types:

- Organization
- WebSite
- BreadcrumbList
- person/profile-related markup where appropriate

Do not invent facts or use invalid/unsupported schema merely for ranking.

---

# 17. Redirect Manager

CMS module:

Redirects

Fields:

- source/from path
- destination/to path
- type
- enabled

Types:

- 301
- 302

Requirements:

- prevent obvious self redirects
- avoid redirect loops
- protect admin/internal routes
- allow safe URL changes
- preserve SEO where URLs change

---

# 18. Global Website Settings

## 18.1 Site Settings

Fields:

- site name
- company name
- logo
- favicon
- default SEO title
- default SEO description
- default OG image
- email
- phone
- WhatsApp
- address
- social links

Potential social fields:

- Facebook
- Instagram
- LinkedIn
- YouTube
- TikTok

Do not store:

- database password
- Payload secret
- SMTP password
- private API credentials

in ordinary CMS fields.

## 18.2 Header

Manage:

- logo
- navigation
- CTA

## 18.3 Footer

Manage:

- description
- navigation groups
- contact info
- social links
- copyright

---

# 19. CMS Admin Navigation

Recommended CMS navigation:

## Dashboard

## Players

- All Players
- Add Player
- Playing Roles
- Countries
- Clubs

## Content

- Pages
- Testimonials
- Partners
- Media

## Leads

- Enquiries
- Player Applications

## SEO

- Redirects

## Website

- Header
- Footer
- Site Settings

## System

- Users

The exact Payload admin grouping may vary, but the conceptual organization should remain clear.

---

# 20. Dashboard

V1 dashboard can remain simple.

Recommended summary information:

- total players
- available players
- featured players
- new applications
- new enquiries
- recent players
- recent enquiries
- recent applications

Do not spend excessive V1 time creating advanced analytics dashboards.

---

# 21. Design Direction

Use the supplied Pro-Crick logo as the primary brand reference.

Desired style:

- premium
- modern
- clean
- international
- professional
- sports agency
- editorial player photography
- generous whitespace

Color direction:

- white dominant
- black primary typography/details
- cricket-ball red accent

Avoid:

- generic sports-club template appearance
- excessive gradients
- excessive animation
- visual clutter
- gaming/esports styling
- copying CricX visual design

The site may be functionally inspired by professional cricket agency websites, but should be visually distinct.

---

# 22. Responsive Requirements

Support:

- mobile
- tablet
- laptop
- desktop

Important responsive areas:

- header
- mobile navigation
- player filters
- player cards
- statistics
- gallery
- forms
- CMS page sections
- footer

No horizontal overflow should occur at normal viewport widths.

---

# 23. Accessibility Requirements

Target good practical accessibility.

Requirements:

- semantic HTML
- logical heading hierarchy
- visible keyboard focus
- keyboard-usable navigation
- accessible mobile menu
- labels for forms
- accessible validation errors
- meaningful image alt text
- reasonable color contrast
- accessible pagination
- accessible filters
- descriptive link/button text where appropriate

---

# 24. Performance Requirements

V1 should be designed for efficient self-hosting.

Requirements:

- use Server Components where practical
- minimize unnecessary client JavaScript
- optimize images
- paginate player directory
- do not load all players for browser-side filtering
- avoid N+1 database queries
- query only needed fields where practical
- use structured/filterable fields
- index commonly queried fields where useful
- embed YouTube/Vimeo instead of hosting large videos

Do not introduce Redis or Elasticsearch unless actual measured requirements justify them.

---

# 25. Security Requirements

Required:

- server-side Payload access control
- secure admin authentication
- secrets in environment variables
- no production secrets in Git
- server-side form validation
- safe upload restrictions
- controlled public errors
- unpublished content protection
- safe redirect validation
- no arbitrary code entry from CMS users
- least-privilege approach where practical
- production database changes through migrations

Public users must not have unrestricted write access to protected Payload collections.

---

# 26. Database and Migration Requirements

Database:

PostgreSQL

Production schema changes must use a controlled migration workflow.

Never:

- casually reset production database
- use production DB for automated tests
- seed demo data automatically into production
- rename/drop populated fields without migration planning
- commit DB credentials

---

# 27. Hosting Requirements

Target:

cPanel

Required capabilities:

- supported Node.js runtime
- PostgreSQL
- persistent filesystem
- environment variables
- application start/restart control

Current hosting information already identified:

- PostgreSQL available
- 2 GB physical memory
- approximately 2 CPU allocation
- 30 entry processes
- 200 total processes
- 50 MB/s I/O
- 1,024 IOPS

Still to confirm:

- exact Node.js version
- exact cPanel Node application setup
- production/staging paths

---

# 27A. Local Development and Developer Handoff

Local development must be reproducible using Docker Compose.

Required developer experience:

- clone the private GitHub repository
- copy `.env.example` to `.env`
- start the development environment using Docker Compose
- run migrations using documented commands
- optionally load development seed data
- open the public site locally
- open `/admin` locally
- run lint/typecheck/tests/build without installing PostgreSQL on the host

Expected local services:

- `app` — Next.js + Payload
- `db` — PostgreSQL

Local database data must persist across normal container restarts.

Runtime local uploads should persist but should not be committed to Git.

A second developer should not need:
- another developer's local PostgreSQL installation
- another developer's Docker volume
- production credentials
- `node_modules`
- a raw production database dump

Developer onboarding documentation must be maintained in `docs/DEVELOPMENT_SETUP.md`.

Collaboration workflow must be maintained in `CONTRIBUTING.md`.

## Sharing the project

The project should be shared using the private GitHub repository.

A developer handoff should consist of:

1. repository access
2. source code
3. `.env.example`
4. Docker configuration
5. migration files
6. development seed process
7. setup documentation

Sensitive values must never be committed.

Representative development content should preferably use seed scripts.

If a database export is required, it must be sanitized before sharing.

## Local vs Production

Docker is the standard local environment.

cPanel remains the planned production environment.

Do not require Docker support from cPanel unless hosting capabilities are explicitly changed later.

---

# 28. Development / Deployment Workflow

Preferred:

Local Docker development / Codex
-> GitHub
-> staging cPanel
-> production cPanel

Rules:

- GitHub is source of truth for code
- Docker Compose is the standard local development environment
- another developer must be able to onboard from a fresh clone using the documented setup
- do not use production as the main development environment
- test migrations before production
- test staging before launch
- back up database before production migrations
- review Codex diffs before merging

---

# 29. Forms and Notifications

Form submissions must be stored in the database even if optional email notification delivery fails.

Potential optional notifications:

## Enquiry

Admin:

- new enquiry received

User:

- enquiry received confirmation

## Player Application

Admin:

- new player application

Applicant:

- application received confirmation

Email provider/SMTP details are not part of the code specification until actual credentials/provider are selected.

---

# 30. Analytics

Optional V1 integration:

- Google Analytics
- Google Tag Manager

Only add after actual IDs are provided.

Do not hard-code fake IDs.

---

# 31. Search Console

Production should support:

- sitemap submission
- site verification method when provided
- production indexing

Staging must remain noindex.

---

# 32. V1 Non-Goals

The following are NOT part of V1 unless separately approved:

- player login
- club login
- agent login
- player self-service editing
- club shortlists
- private club/player messaging
- automated player-to-club matching
- payments/subscriptions
- advanced CRM
- opportunity/job marketplace
- match scoring engine
- live cricket scores
- external cricket API integrations
- multi-language support
- mobile applications
- Elasticsearch
- Redis
- full visual drag-and-drop page builder
- large video hosting
- multi-tenant SaaS functionality

---

# 33. Future V2 Possibilities

Potential later phases:

- Player portal
- Club portal
- Agent portal
- Player profile ownership
- Approval workflows
- Shortlisting
- Opportunity matching
- Private opportunities
- Internal CRM notes
- Follow-up reminders
- Assigned agents
- Subscription plans
- Advanced player analytics
- external cricket statistics APIs
- object storage/CDN
- advanced search

These should not influence V1 architecture beyond avoiding obviously blocking design choices.

---

# 34. Publishing Rules

Pages and Players need controlled publishing.

Preferred states:

- Draft
- Published
- Archived

Public website:

- Draft: not publicly visible/indexable
- Published: publicly available according to index setting
- Archived: unavailable from normal public listings; exact behavior should remain SEO-safe

Player Applications must never be public content.

Enquiries must never be public content.

---

# 35. Required Player Publishing Checklist

Before a Player is considered ready for public publishing, ideally require:

- player name
- slug
- profile image
- primary role
- nationality
- short introduction or biography
- publishing status

Recommended but not always mandatory:

- current club
- availability
- statistics
- video
- CV
- SEO description

Final required-field rules should be confirmed with client content availability.

---

# 36. Content Ownership

Client/team supplies or approves:

- player information
- player photos
- player statistics
- player CVs
- player videos
- agency content
- testimonials
- business information
- legal content
- claims/statistics shown publicly

Development team may structure, format, or SEO-optimize content but should not invent unverified player or business claims.

---

# 37. V1 Acceptance Criteria

The project is ready for V1 launch when all required items below pass.

## CMS

- Admin can log in
- Editor can log in
- Permissions work correctly
- Admin can create/edit/publish Players
- Admin can manage Countries/Roles/Clubs
- Admin can manage Media
- Admin can manage Pages
- Admin can reorder page blocks
- Admin can manage Header/Footer/Site Settings
- Admin can view/manage Enquiries
- Admin can view/manage Player Applications
- Admin can convert application to Player draft
- Admin can manage redirects

## Public Website

- Homepage renders CMS content
- Pages render CMS blocks
- Player directory works
- Player search works
- Required filters work
- Pagination works
- Player profiles work
- Unpublished player profiles do not leak
- Enquiry forms work
- Player Application form works
- CV download works when provided
- YouTube/Vimeo embeds work
- Header/mobile menu works
- Footer works
- 404 works

## SEO

- Meta titles work
- Meta descriptions work
- canonical URLs work
- OG metadata works
- sitemap works
- robots.txt works
- staging noindex works
- production indexing works
- structured data is valid/appropriate
- redirects work
- unpublished content is excluded

## Quality

- TypeScript passes
- lint passes
- tests pass where configured
- production build passes
- no P0/P1 security issues remain
- responsive review passes
- accessibility review has no major blockers
- no secrets are committed
- migrations are documented
- database backup/rollback process exists

## Developer Onboarding

- fresh clone can be started with the documented Docker Compose workflow
- PostgreSQL requires no host installation
- migrations can be applied using documented container commands
- local data persists after normal container restart
- another developer can run lint/typecheck/tests/build
- `.env.example` contains all required variable names without secrets
- local runtime data is ignored by Git

## Hosting

- Node.js app starts successfully
- PostgreSQL persists data
- uploads persist after app restart
- environment variables work
- SSL works
- staging works
- production deployment process is documented

---

# 38. Scope Change Rule

If a requested feature is not defined here:

1. determine whether it belongs in V1
2. assess data-model impact
3. assess migration impact
4. assess security impact
5. assess SEO impact
6. estimate implementation cost/time
7. update this specification if approved
8. then implement

Do not silently expand V1 scope.

---

# 39. Final V1 Principle

Pro-Crick V1 should be:

- simpler than WordPress for this exact business workflow
- cheaper to operate than a heavily licensed WordPress stack
- easy for the client to manage
- easy for Codex/human developers to maintain
- structured around Players as the central business entity
- technically strong for SEO
- secure enough for production
- ready for future expansion without prematurely building a full SaaS platform
