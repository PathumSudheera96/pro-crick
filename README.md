# Pro-Crick

Pro-Crick is a cricket talent connection platform, player agency website, and custom CMS built with Next.js, Payload CMS, PostgreSQL, and Tailwind CSS.

Brand line: **Where Cricket Connects**.

The initial business focus is connecting talented Sri Lankan cricketers with cricket clubs across the United Kingdom, with a longer-term vision to grow into a global cricket talent network.

## Local Development

Prerequisites:

- Git
- Docker
- Docker Compose

### macOS

Install prerequisites with Homebrew, or via the Docker Desktop installer:

```bash
brew install git
brew install --cask docker
```

Then open Docker Desktop once from Applications/Launchpad and wait for it to finish starting (whale icon steady in the menu bar) before running `docker compose` commands. Docker Compose v2 ships bundled with Docker Desktop — no separate install needed. Works the same on Apple Silicon and Intel Macs.

Clone and start:

```bash
git clone git@github.com:PathumSudheera96/pro-crick.git
cd pro-crick
cp .env.example .env
docker compose up --build
docker compose exec app pnpm payload migrate
```

### Windows (PowerShell)

```powershell
git clone git@github.com:PathumSudheera96/pro-crick.git
cd pro-crick
Copy-Item .env.example .env
docker compose up --build
docker compose exec app pnpm payload migrate
```

Then open:

- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

See `docs/DEVELOPMENT_SETUP.md` for migrations, seed data, troubleshooting, and complete onboarding instructions.

Useful checks:

```bash
docker compose exec app pnpm lint
docker compose exec app pnpm typecheck
docker compose exec app pnpm build
```

Migration commands:

```bash
docker compose exec app pnpm payload migrate:status
docker compose exec app pnpm payload migrate:create descriptive-name
docker compose exec app pnpm payload migrate
```

If `docker compose up --build` fails on macOS with I/O or "shared library" errors mid-install, Docker Desktop's virtual disk usually ran out of host disk space — free up space, restart Docker Desktop, and retry.

## Contributing

Read:

1. `AGENTS.md`
2. `docs/PROJECT_SPEC.md`
3. `docs/PLANS.md`
4. `docs/DEVELOPMENT_SETUP.md`
5. `CONTRIBUTING.md`

Do not commit `.env`, runtime uploads, database volumes, or production data.
