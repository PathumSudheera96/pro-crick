# docs/DEVELOPMENT_SETUP.md — Pro-Crick Local Development

## Purpose

This is the standard onboarding and local-development guide for Pro-Crick.

The goal is that a developer can clone the private GitHub repository and run the same local environment without installing PostgreSQL directly on the host machine.

Local development uses Docker Compose.

Production is planned for cPanel and does not automatically use Docker.

---

# 1. Prerequisites

Install:

- Git
- Docker Desktop or Docker Engine
- Docker Compose v2 (`docker compose`)
- A code editor such as VS Code

A separate local PostgreSQL installation is not required.

A local Node.js installation should not be required for the normal containerized workflow, although it may be useful for editor tooling.

Verify:

```bash
git --version
docker --version
docker compose version
```

---

# 2. Repository Onboarding

Clone the private repository:

```bash
git clone git@github.com:PathumSudheera96/pro-crick.git
cd pro-crick
```

Read:

1. `AGENTS.md`
2. `docs/PROJECT_SPEC.md`
3. `docs/PLANS.md`
4. `CONTRIBUTING.md`
5. this file

Create local environment variables:

```bash
cp .env.example .env
```

On PowerShell:

```powershell
Copy-Item .env.example .env
```

Never commit `.env`.

---

# 3. Docker Architecture

Local Docker Compose provides:

```text
Developer Machine
│
├── app
│   └── Next.js + Payload
│       └── http://localhost:3000
│
└── db
    └── PostgreSQL
        └── persistent named volume
```

Service names should remain stable:

- `app`
- `db`

The application database connection inside Docker should use `db` as the PostgreSQL hostname.

Example development connection shape:

```text
postgresql://USER:PASSWORD@db:5432/DATABASE
```

Actual development credentials belong in `.env`, not in source code.

---

# 4. Docker Files

The repository contains:

```text
compose.yaml
Dockerfile.dev
.dockerignore
.env.example
pnpm-workspace.yaml
```

The app container should:

- use Node.js 22
- use pnpm through Corepack
- install dependencies reproducibly from the lockfile
- run the Next.js/Payload development server
- support hot reload
- mount source code from the host
- avoid using host `node_modules`

The database container should:

- use `postgres:16.4-alpine`
- have a health check
- use a persistent named volume
- receive development credentials through environment variables

Local persistent uploads use:

```text
storage/
```

The `storage/` directory is bind-mounted into the app container and ignored by Git except for `storage/.gitkeep`.

---

# 5. Start the Local Environment

From a fresh clone:

```bash
cp .env.example .env
docker compose up --build
```

On PowerShell:

```powershell
Copy-Item .env.example .env
docker compose up --build
```

For detached mode:

```bash
docker compose up -d --build
```

View services:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f app
docker compose logs -f db
```

Stop the stack:

```bash
docker compose down
```

Open:

```text
Public website: http://localhost:3000
CMS admin:      http://localhost:3000/admin
```

---

# 6. Run Project Commands

Run package commands inside the app container.

Examples:

```bash
docker compose exec app pnpm lint
docker compose exec app pnpm typecheck
docker compose exec app pnpm build
```

Only use commands that actually exist in `package.json`.

Current project scripts:

```bash
docker compose exec app pnpm dev
docker compose exec app pnpm test
docker compose exec app pnpm lint
docker compose exec app pnpm typecheck
docker compose exec app pnpm build
docker compose exec app pnpm payload
docker compose exec app pnpm generate:types
```

---

# 7. Database Migrations

Payload migrations are committed under:

```text
src/migrations/
```

Check migration status:

```bash
docker compose exec app pnpm payload migrate:status
```

Create a migration after an intentional schema change:

```bash
docker compose exec app pnpm payload migrate:create descriptive-name
```

Apply pending migrations:

```bash
docker compose exec app pnpm payload migrate
```

The app is configured with Payload schema push disabled, so local and production databases use committed migrations instead of ad hoc schema synchronization.

Rules:

- create migrations for production-relevant schema changes
- commit migration files
- another developer must be able to apply migrations after pulling the branch
- do not reset the production database
- do not run development seed/reset commands against production
- do not run `migrate:fresh`, `migrate:reset`, `migrate:refresh`, or `migrate:down` against production unless an explicit rollback plan has been approved

---

# 8. Development Seed Data

Representative local data should be created using an explicit development-only seed process.

It may create:

- playing roles
- countries
- clubs
- sample players
- sample testimonials

Requirements:

- never run automatically in production
- never contain sensitive production enquiries/applications
- be deterministic where practical
- be documented

Seed setup is not part of STEP 01. The future general pattern will be:

```bash
docker compose exec app pnpm <dev-seed-command>
```

---

# 9. Local Uploads

V1 local development may store uploads in:

```text
storage/
```

This directory should be mounted into the app container and ignored by Git.

Do not commit:

- development uploads
- PDFs
- database files
- temporary runtime files

If the team needs consistent sample media, use a small approved seed-media directory separate from runtime uploads.

---

# 10. Stop / Restart

Stop:

```bash
docker compose down
```

Restart:

```bash
docker compose up -d
```

Rebuild after Dockerfile/dependency changes:

```bash
docker compose up -d --build
```

Do not use:

```bash
docker compose down -v
```

casually. `-v` removes named volumes and can delete the local PostgreSQL database.

---

# 11. Pulling Changes From Another Developer

Before new work:

```bash
git checkout main
git pull
```

Create a branch:

```bash
git checkout -b feature/example
```

If pulled changes include migrations:

```bash
docker compose exec app pnpm <apply-migrations-command>
```

If dependencies/Docker configuration changed:

```bash
docker compose up -d --build
```

---

# 12. Sharing With Another Developer

Preferred method:

1. Add the developer to the private GitHub repository.
2. Do not share production secrets through Git.
3. Developer clones the repository.
4. Developer creates `.env` from `.env.example`.
5. Share development-only values through an approved secure channel if they cannot be generated locally.
6. Developer starts Docker Compose.
7. Developer runs migrations.
8. Developer optionally runs development seed data.

Do not send:

- `node_modules`
- `.next`
- `.env`
- Docker volumes
- PostgreSQL data directories
- raw production DB dumps
- production enquiry/application records

A source-code clone plus documented setup should be sufficient.

---

# 13. Sanitized Data Handoff

If realistic data is necessary:

Preferred:
- seed script

Alternative:
- sanitized development database dump

A sanitized dump must remove/anonymize:

- enquiry names
- enquiry emails
- phone numbers
- player application contact details
- private internal notes
- authentication credentials/tokens

Do not use a raw production dump for normal developer onboarding.

---

# 14. Common Docker Troubleshooting

## Docker command is not found

Install Docker Desktop or Docker Engine and make sure `docker` is available on PATH:

```bash
docker --version
docker compose version
```

STEP 01 implementation in this repository created the Docker configuration, but runtime verification requires Docker CLI availability on the host machine.

## Port 3000 already in use

Stop the conflicting process or change the local port mapping in a documented way.

## Database not ready

Check:

```bash
docker compose ps
docker compose logs db
```

Use PostgreSQL health checks rather than arbitrary sleep commands.

## Dependencies are stale

Rebuild:

```bash
docker compose up -d --build
```

## File-permission issues

Do not solve permission problems by globally applying unsafe `777` permissions.

Fix container user/volume configuration properly.

## Database connection fails

Confirm:

- app and db services share the Compose network
- hostname is `db` from the app container
- `.env` credentials match the db service
- db service is healthy

---

# 15. Fresh-Clone Acceptance Test

Local onboarding is complete only if a second developer can:

1. clone repository
2. create `.env` from example
3. start Docker
4. apply migrations
5. open `/`
6. open `/admin`
7. initialize/login to the local admin account using the supported flow
8. create a test CMS record
9. restart Docker
10. confirm the record still exists
11. run lint/typecheck/tests/build using documented container commands

Target: no undocumented machine-specific setup.

---

# 16. Production Difference

Local:

```text
Docker Compose
├── app
└── PostgreSQL
```

Production:

```text
cPanel
├── Node.js application
├── PostgreSQL
└── persistent filesystem
```

Docker Compose is not automatically the production deployment mechanism.

The production runbook must use the real cPanel paths, Node version, environment configuration, and PostgreSQL credentials.

For the current staging host, the repository includes a local wrapper:

```bash
pnpm deploy:staging
```

It uses SSH + `rsync` against the cPanel Node.js app root, then installs, builds, migrates, and restarts remotely. Keep `.cpanel_creds` local-only and gitignored. The script does not upload `.env`, `storage/`, `.next/`, `node_modules/`, or other local runtime artifacts.

---

# 17. Documentation Rule

If a change modifies:

- Docker services
- ports
- environment variables
- migrations
- startup commands
- storage paths
- seed commands
- build/test commands

the same pull request must update this file and `.env.example` where relevant.
