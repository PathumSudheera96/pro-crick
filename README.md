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

## Contributing

Read:

1. `AGENTS.md`
2. `docs/PROJECT_SPEC.md`
3. `docs/PLANS.md`
4. `docs/DEVELOPMENT_SETUP.md`
5. `CONTRIBUTING.md`

Do not commit `.env`, runtime uploads, database volumes, or production data.
