# Pro-Crick

Pro-Crick is a cricket player agency website and custom CMS built with Next.js, Payload CMS, PostgreSQL, and Tailwind CSS.

## Local Development

Prerequisites:

- Git
- Docker
- Docker Compose

Clone and start:

```bash
git clone git@github.com:PathumSudheera96/pro-crick.git
cd pro-crick
cp .env.example .env
docker compose up --build
docker compose exec app pnpm payload migrate
```

On PowerShell:

```powershell
Copy-Item .env.example .env
docker compose up --build
docker compose exec app pnpm payload migrate
```

Then open:

- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

See `DEVELOPMENT_SETUP.md` for migrations, seed data, troubleshooting, and complete onboarding instructions.

## Development Workflow

Every feature, fix, documentation task, setup change, and deployment change should use its own branch and be pushed to GitHub:

```bash
git checkout main
git pull --ff-only origin main
git checkout -b feature/example
git push -u origin feature/example
```

Codex work should use a `codex/` branch. Open or update a pull request before merging work into `main`.

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

## Contributing

Read:

1. `AGENTS.md`
2. `PROJECT_SPEC.md`
3. `PLANS.md`
4. `DEVELOPMENT_SETUP.md`
5. `CONTRIBUTING.md`

Do not commit `.env`, runtime uploads, database volumes, or production data.
