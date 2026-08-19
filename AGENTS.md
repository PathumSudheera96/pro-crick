# AGENTS.md — Pro-Crick

## Project overview

Pro-Crick is a cricket talent connection platform, cricket player agency website, and custom CMS.

Brand line: **Where Cricket Connects**.

The initial business focus is connecting talented Sri Lankan cricketers with cricket clubs across the United Kingdom. The long-term vision is a global cricket talent network connecting players, clubs, and cricket communities through transparent, long-term partnerships.

The application is a single Next.js + Payload CMS codebase backed by PostgreSQL and intended to be self-hosted on cPanel.

Primary business goals:
- Present Pro-Crick as a professional cricket talent connection platform and player agency.
- Communicate the Sri Lanka-to-UK initial market clearly while keeping the platform extensible for broader international expansion.
- Maintain a structured, searchable player database.
- Allow non-technical administrators to manage players and website content.
- Capture player enquiries and player applications.
- Provide strong technical SEO foundations.
- Keep the codebase simple, maintainable, secure, and inexpensive to operate.
- Make future development straightforward for Codex and human developers.

Do not turn this project into a general-purpose CMS or SaaS platform unless explicitly requested.

---

## Technology stack

Use:
- Next.js App Router
- TypeScript
- Payload CMS
- PostgreSQL
- Tailwind CSS for frontend styling unless the repository already uses another approved styling system
- pnpm as the package manager
- Git / GitHub
- Docker and Docker Compose for the standard local development environment
- Local file storage for normal images and PDFs in V1 unless storage architecture is explicitly changed
- YouTube/Vimeo URLs for video content rather than uploading large video files

Do not introduce:
- WordPress
- Elementor
- A second CMS
- Another ORM unless Payload requires it
- A separate frontend repository
- Microservices
- Redis
- Elasticsearch
- Third-party paid SaaS dependencies
unless a task explicitly requires them and the trade-off is documented first.

Use versions pinned in package.json and the lockfile. Do not upgrade framework or database dependencies as part of unrelated work.

---

## Repository principles

1. Keep the frontend and Payload CMS in the same Next.js application.
2. Treat PostgreSQL as the source of truth for CMS data.
3. Treat GitHub as the source of truth for application code.
4. Treat Docker Compose as the standard local development environment so another developer can clone and run the project consistently.
5. Never edit generated production files in cPanel as the primary development workflow.
6. Never commit secrets, credentials, database passwords, API keys, or production environment values.
7. Preserve backward compatibility with existing CMS content whenever practical.
8. Prefer simple and explicit code over unnecessary abstractions.
9. Avoid unrelated refactors while implementing a requested feature.
10. Do not silently change URLs, database field names, API contracts, or SEO behavior.
11. Every schema change that affects production data must be deployable safely.

---

## Expected repository layout

Prefer this general organization unless the existing codebase has a better established structure:

src/
  app/
    (frontend)/
    (payload)/
  collections/
    Users.ts
    Media.ts
    Players.ts
    Pages.ts
    Enquiries.ts
    PlayerApplications.ts
    Testimonials.ts
    Partners.ts
    Redirects.ts
    PlayingRoles.ts
    Countries.ts
    Clubs.ts
  globals/
    Header.ts
    Footer.ts
    SiteSettings.ts
  blocks/
    Hero.ts
    RichText.ts
    ImageText.ts
    FeaturedPlayers.ts
    Stats.ts
    Testimonials.ts
    FAQ.ts
    CTA.ts
    Contact.ts
  components/
  lib/
    seo/
    validation/
    queries/
  access/
  hooks/
  migrations/
  styles/

public/

storage/                 # local development uploads; ignored by Git unless explicitly seeded

AGENTS.md
docs/PROJECT_SPEC.md
docs/PLANS.md
docs/CODEX_EXECUTION_STEPS.txt
docs/DEVELOPMENT_SETUP.md
CONTRIBUTING.md
README.md
.env.example
compose.yaml
Dockerfile.dev
.dockerignore
.gitignore
package.json
pnpm-lock.yaml

Do not rename major directories without a clear reason.

---

## Local development and Docker

Docker Compose is the standard local development workflow for this repository.

Goals:
- A new developer should not need to install PostgreSQL locally.
- Local development should use the same documented service names and environment assumptions for every developer.
- The project should be startable from a fresh clone with a small, documented sequence of commands.
- Development database data and uploaded files must persist across normal container restarts.
- Local development data must never be committed to Git.

Expected local services:
- `app` — Next.js + Payload development server
- `db` — PostgreSQL

Use a pinned, supported PostgreSQL major version. Do not use an unpinned `latest` database image.

Recommended local networking:
- The application connects to PostgreSQL using Docker service hostname `db`.
- Do not hard-code `localhost` into application database code.
- Environment-specific connection strings belong in environment variables.

Expected persistence:
- PostgreSQL uses a named Docker volume.
- Development uploads use either a documented bind mount such as `./storage` or a named volume.
- `storage/`, database dumps, and other local runtime data must be ignored by Git.

Expected development files:
- `compose.yaml`
- `Dockerfile.dev`
- `.dockerignore`
- `.env.example`
- `docs/DEVELOPMENT_SETUP.md`

The local workflow should support commands equivalent to:

```bash
cp .env.example .env
docker compose up --build
docker compose exec app pnpm <command>
docker compose down
```

The exact commands must match the repository's actual configuration.

### Docker rules

1. Do not put production credentials into Compose files.
2. Do not bake `.env` or secrets into Docker images.
3. Do not commit local PostgreSQL volumes, dumps, uploads, or generated application data.
4. Use health checks for PostgreSQL when practical.
5. Make the app service depend on database readiness rather than assuming PostgreSQL is instantly available.
6. Keep container user/file-permission behavior compatible with developer host files.
7. Prefer bind mounts for source code during development so hot reload works.
8. Avoid mounting host `node_modules` into the container.
9. Keep Docker-specific environment differences documented.
10. Production cPanel deployment is not assumed to use Docker. Local Docker and cPanel production are separate deployment concerns.

### Database commands in Docker

Documentation and scripts should make it clear how to run:
- migrations
- development seed data
- tests
- typecheck
- lint
- production build verification

from the `app` container.

Never run destructive development reset/seed commands against production.

### Fresh-clone validation

Before considering local setup complete, validate the onboarding path from a clean clone or clean working copy:

1. copy `.env.example`,
2. build/start Docker Compose,
3. wait for database health,
4. run required migrations,
5. create or initialize the local CMS admin account using the documented supported flow,
6. access the public site,
7. access `/admin`,
8. create/read a simple record,
9. restart containers and confirm database persistence.

If any undocumented manual step is required, update `docs/DEVELOPMENT_SETUP.md`.

---

## Developer onboarding and collaboration

This project must be easy to share with another developer through GitHub.

The standard handoff is:
1. Add the developer to the private GitHub repository.
2. Developer clones the repository.
3. Developer reads `AGENTS.md`, `docs/PROJECT_SPEC.md`, `docs/PLANS.md`, `docs/DEVELOPMENT_SETUP.md`, and `CONTRIBUTING.md`.
4. Developer copies `.env.example` to `.env`.
5. Developer starts the local environment with Docker Compose.
6. Developer runs migrations and optional development seed data using documented commands.
7. Developer works on a feature branch and submits a pull request.

Do not share the project by sending `node_modules`, Docker volumes, local PostgreSQL data directories, or production `.env` files.

If a developer needs representative data, prefer:
- deterministic development seed scripts, or
- a sanitized development database export that contains no sensitive production data.

Never share real production enquiry/application data simply for development convenience.

### Collaboration rules

- Use the private GitHub repository as the collaboration source of truth.
- Keep `main` stable.
- Use one logical feature/fix per branch.
- Use pull requests for review before merging significant changes.
- Do not commit generated runtime data.
- Document new environment variables in `.env.example` and `docs/DEVELOPMENT_SETUP.md`.
- If a migration is added, the pull request must explain how another developer applies it.
- If setup changes, verify the fresh-clone workflow again.

Preferred branch examples:
- `feature/player-filters`
- `feature/player-profile`
- `fix/enquiry-validation`
- `chore/docker-dev`

Codex-generated branches may use a `codex/` prefix.

---

## Documentation ownership

Keep these files current:

- `AGENTS.md` — engineering rules
- `docs/PROJECT_SPEC.md` — approved V1 product requirements
- `docs/PLANS.md` — live roadmap/status
- `docs/CODEX_EXECUTION_STEPS.txt` — ordered Codex task prompts
- `docs/DEVELOPMENT_SETUP.md` — local Docker setup and day-to-day commands
- `CONTRIBUTING.md` — collaboration, branches, pull requests, and handoff rules
- `README.md` — project overview and shortest getting-started path

A feature that changes local setup, required environment variables, migrations, or developer workflow is not complete until the relevant documentation is updated.

---

## CMS information architecture

The CMS should be focused on the client's real operational needs.

Recommended admin structure:

Dashboard

Players
- All Players
- Add Player
- Playing Roles
- Countries / Nationalities
- Clubs

Content
- Pages
- Testimonials
- Partners
- Media

Leads
- Enquiries
- Player Applications

SEO
- Redirects

Website
- Header / Navigation
- Footer
- Global Settings

System
- Users

Do not build an Elementor-style unrestricted visual builder.

Use a controlled block-based page builder so the client can rearrange approved section types without breaking the design system.

---

## Player collection

Players are the core business entity.

A player should support structured fields for the following concepts where applicable.

### Identity
- fullName
- slug
- profileImage
- heroImage
- gallery
- shortIntroduction
- biography

### Personal information
- dateOfBirth
- nationality
- gender
- currentLocation

### Cricket information
- primaryRole
- battingStyle
- bowlingStyle
- currentClub
- previousClubs
- teamsRepresented

### Availability
- playerStatus
- availabilityDate
- eligibleCountries

Suggested player statuses:
- available
- contracted
- unavailable

### Career
- careerHighlights
- achievements
- playingExperience

### Statistics

V1 statistics should be useful for player presentation, not a full cricket scoring engine.

Examples:
- matches
- runs
- battingAverage
- highestScore
- hundreds
- fifties
- wickets
- bowlingAverage
- bestBowling
- economyRate

If different cricket formats require separate statistics, model them cleanly instead of adding duplicated ad hoc fields.

### External profiles and media
- youtubeVideos
- vimeoVideos
- instagramUrl
- espnCricinfoUrl
- cricbuzzUrl
- playerCv

Do not upload large video files to the application server by default.

### Administration
- featured
- sortOrder
- status / draft / published / archived

### SEO
Each player should support the reusable SEO field group defined below.

---

## Reusable player taxonomies

Use relationships or reusable collections for values that:
- appear on multiple players,
- are used for filtering,
- may be renamed by administrators,
- need their own slug or metadata.

Likely reusable entities:
- Playing Roles
- Countries / Nationalities
- Clubs / Teams

Avoid uncontrolled free-text values for filter-critical data.

Use simple select fields for truly fixed values such as batting style when administrator-managed taxonomies provide no real benefit.

---

## Page collection

Pages should support:
- title
- slug
- status
- layout blocks
- SEO fields

Use controlled page blocks.

Initial block library:
- Hero
- Rich Text
- Image + Text
- Featured Players
- Statistics / Counters
- Testimonials
- FAQ
- CTA
- Contact

Each block must have:
- clearly named fields,
- sensible validation,
- responsive frontend implementation,
- no arbitrary code entry,
- stable schema identifiers.

Do not let content editors directly control low-level layout values unless the design explicitly requires them.

---

## SEO model

Create a reusable SEO field group for Pages and Players.

Fields:
- metaTitle
- metaDescription
- canonicalUrl
- ogTitle
- ogDescription
- ogImage
- index
- follow

Provide automatic fallbacks when optional SEO fields are empty.

Expected behavior:
- Meta title fallback should use the content title/player name plus the Pro-Crick brand.
- Meta description fallback should be generated from appropriate summary content when practical.
- Canonical URL should default to the canonical public URL.
- OG title should fall back to meta title.
- OG description should fall back to meta description.
- OG image should fall back to a suitable site default.
- index/follow should default to true for normal published public content.

Technical SEO should be implemented in application code:
- metadata generation
- canonical tags
- sitemap
- robots.txt
- Open Graph metadata
- structured data where appropriate
- clean status codes
- 404 handling
- redirect handling

Do not rely on administrators manually entering technical SEO configuration for every page.

---

## Redirects

Redirect records should include:
- fromPath
- toPath
- redirectType
- enabled

Supported initial redirect types:
- 301
- 302

Validate paths and prevent obvious redirect loops.

Changes to routing must consider existing redirects and SEO impact.

---

## Media

Media should support:
- image/file upload
- alt text
- caption where useful
- title
- file type
- file dimensions where available

For V1:
- normal player photos and page images may use local persistent server storage
- PDFs such as player CVs may use local persistent server storage
- large video files should not be uploaded; use YouTube or Vimeo links

Never expose private filesystem paths to public users.

Restrict dangerous upload types.

---

## Enquiries

Player-specific and general enquiries should be stored in the CMS, not only emailed.

Recommended fields:
- referenceNumber
- relatedPlayer
- name
- clubOrOrganization
- country
- email
- phone
- message
- status
- createdAt

Suggested statuses:
- new
- contacted
- in_progress
- closed

Public form submission endpoints must:
- validate input server-side
- sanitize where appropriate
- reject malformed requests
- provide basic spam/rate-limit protection appropriate for the hosting environment
- never expose internal error details to the browser

---

## Player applications

Player applications are separate from enquiries.

Recommended fields:
- applicantName
- contact information
- nationality
- cricket role
- current club
- teams / experience
- statistics
- biography
- profile photo
- video links
- CV
- applicationStatus

Suggested statuses:
- new
- under_review
- approved
- rejected

Design the data so an approved application can later be converted into a Player record with minimal duplicate entry.

Do not automatically publish an application as a public player profile.

---

## Users and access control

Initial roles:
- administrator
- editor

Administrator:
- full CMS access
- user management
- site settings
- integrations/settings
- destructive actions

Editor:
- manage players
- manage pages
- manage testimonials
- manage partners
- manage media
- manage enquiries
- manage player applications
- no user administration
- no sensitive system configuration

All server-side access rules must be enforced in code.
Do not rely only on hidden admin UI controls.

Public users must never have write access to protected CMS collections except through explicitly designed public form endpoints.

---

## Global settings

SiteSettings should contain shared values such as:
- siteName
- companyName
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
- analytics IDs only if storing them in the CMS is explicitly approved

Header and Footer should be modeled separately if that provides cleaner editing.

Do not store passwords, private API keys, SMTP passwords, database credentials, or other secrets in normal CMS fields.

---

## Frontend routes

Prefer stable, readable routes.

Examples:
- /
- /players
- /players/[slug]
- /about
- /services
- /contact
- /apply
- /privacy-policy

Do not change established public URLs without:
1. documenting the reason,
2. adding a redirect when appropriate,
3. considering canonical and sitemap effects.

---

## Player directory

The player directory should support:
- keyword search
- filtering
- pagination or another scalable result-loading strategy
- clean empty states
- shareable URLs for important filter state where practical

Likely filters:
- playing role
- nationality
- availability
- eligible country
- gender if required by the business

Filter-critical values must come from structured data.

Avoid fetching the entire player database to the browser just to filter client-side.

---

## Design and frontend rules

The Pro-Crick brand direction is:
- clean
- premium
- modern cricket agency
- predominantly white and black
- cricket-ball red as an accent
- strong player photography
- generous whitespace
- professional international agency feel rather than a local club theme
- people-first, trust-led cricket partnership positioning
- initial Sri Lankan talent to UK club opportunity focus

Requirements:
- mobile-first responsive implementation
- accessible semantic HTML
- keyboard-accessible interactions
- usable focus states
- appropriate image sizing
- avoid layout shift
- avoid excessive animation
- avoid visual clutter

Do not introduce a new design language during unrelated backend work.

---

## Performance

Prefer:
- server rendering / static rendering where appropriate
- optimized database queries
- explicit field selection where useful
- indexed fields for frequently filtered/sorted data
- image optimization
- pagination for growing collections

Avoid:
- N+1 query patterns
- unnecessary client components
- loading huge CMS documents when only a few fields are needed
- unbounded queries on public routes

Before adding caching infrastructure, first measure the actual bottleneck.

---

## Security

Never:
- commit secrets
- hard-code database credentials
- expose Payload secrets
- return stack traces to public users
- trust browser validation alone
- disable authentication to make a feature easier
- make protected collections publicly writable
- execute arbitrary user-provided HTML, JavaScript, SQL, or shell commands

Always:
- validate public input server-side
- enforce Payload access control server-side
- use environment variables for secrets
- keep dependencies intentional
- review file upload restrictions
- use least-privilege database credentials where feasible
- treat migrations and destructive operations carefully

If a task involves authentication, authorization, file upload, database migrations, redirects, or public forms, explicitly mention security impact in the completion summary.

---

## Database and migrations

PostgreSQL is the production database.

Schema changes must:
1. be intentional,
2. preserve existing data where practical,
3. include the appropriate Payload/database migration when production requires it,
4. document destructive behavior,
5. be tested against realistic sample data.

Never:
- drop production data casually,
- rename populated fields without a migration strategy,
- reset the production database,
- seed development sample data into production,
- use production database credentials for automated tests.

If a requested change may destroy or reinterpret production data, stop and explain the risk before implementing it.

---

## Environment variables

Maintain a safe `.env.example`.

Examples of categories:
- DATABASE_URI
- PAYLOAD_SECRET
- public site URL
- SMTP configuration
- analytics configuration
- third-party integration credentials

`.env.example` must contain placeholders only.

Do not commit `.env`, `.env.local`, production secrets, or cPanel credentials.

---

## cPanel production assumptions

Production is intended to run on cPanel with:
- Node.js application support
- PostgreSQL
- persistent filesystem
- environment variables configured outside Git
- application restart controlled by cPanel or the host

Development should happen locally using the documented Docker Compose environment or in an approved Codex environment.

Docker is the standard local development environment, but production cPanel deployment should use the hosting method actually supported by the server. Do not assume production Docker support unless explicitly confirmed.

Do not make direct production-file edits the normal workflow.

A deployment task should document:
- required environment variables
- database migration command
- build command
- application start/restart command
- persistent upload path assumptions
- rollback considerations

Do not invent cPanel paths or commands. Read the actual hosting configuration first.

---

## Development workflow

For every non-trivial task:

1. Read this AGENTS.md.
2. Inspect the relevant existing code.
3. State a short implementation plan.
4. Identify schema, routing, security, SEO, and migration impact.
5. Make the smallest coherent change.
6. Run relevant checks.
7. Review the diff.
8. Summarize what changed.
9. Report any unresolved risks or manual deployment steps.

Do not start by rewriting existing architecture.

---

## Required checks

Use the commands actually defined in package.json.

Expected checks may include:
- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm build

If a command does not exist, do not pretend it ran.

For frontend behavior, add or update automated tests when practical.

For critical flows, prefer coverage of:
- player listing/filtering
- player profile routing
- form validation
- permissions/access control
- SEO metadata
- redirects

Do not mark a task complete while known build/type errors caused by the task remain.

---

## Definition of done

A feature is done only when:
- requested behavior is implemented
- TypeScript is valid
- relevant lint/tests pass
- build passes when practical
- access control is correct
- mobile layout has been considered
- empty/loading/error states are handled where relevant
- SEO implications are handled where relevant
- schema changes are migration-safe
- no secrets were added
- documentation is updated when setup or deployment changes
- the final summary lists changed behavior and verification performed

---

## Git rules

Prefer one logical task per branch / pull request.

Do not:
- force-push shared branches unless explicitly asked
- rewrite unrelated history
- commit secrets
- bundle unrelated cleanup with feature work

Use descriptive commits.

Before a large or destructive refactor, present the plan first.

---

## Code review rules

### Access control
Flag any change that allows public or editor users to perform administrator-only operations.
Safe path: enforce permissions server-side through Payload access control and endpoint authorization.

### Public form security
Flag public enquiry/application endpoints that trust client validation, expose internal exceptions, or allow unvalidated file uploads.
Safe path: validate and sanitize on the server, restrict uploads, return controlled errors, and apply appropriate abuse protection.

### Database safety
Flag destructive schema changes without an explicit migration/data-preservation strategy.
Safe path: write a migration, document the transformation, and preserve existing production data where possible.

### SEO URL stability
Flag changes to established player/page URLs that do not consider redirects, canonical URLs, and sitemap behavior.
Safe path: preserve the URL or add the appropriate redirect and update SEO generation.

### Secrets
Flag credentials, API keys, tokens, SMTP passwords, database URIs, or Payload secrets committed to the repository.
Safe path: use environment variables and `.env.example` placeholders.

---

## Codex task style

When receiving a broad request:
- inspect first
- break it into reviewable stages
- do not implement every stage at once unless explicitly requested

When requirements are ambiguous and the ambiguity materially affects architecture, security, data model, or public UX, ask a focused question before coding.

For minor implementation details, make a reasonable choice consistent with this file and document it.

When the user requests a plan only, do not edit code.

When asked to implement, prefer completing one clearly bounded vertical slice at a time.

---

## Initial project delivery sequence

Use this order unless requirements change:

1. Repository and environment setup
2. Payload + PostgreSQL connection
3. Authentication and roles
4. Media
5. Reusable taxonomy collections
6. Players
7. Pages and page blocks
8. Global site settings / header / footer
9. Public frontend shell
10. Player directory
11. Player profile
12. Enquiries
13. Player applications
14. SEO foundations
15. Redirects
16. Responsive/accessibility pass
17. Automated testing
18. Performance/security review
19. cPanel deployment runbook
20. Staging deployment
21. Content entry / migration
22. Production launch

Do not skip directly to production deployment before the application can build and the database migration process is understood.
