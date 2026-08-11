# README Quick-Start Snippet

Use this as the local-development section of the final `README.md` after Codex bootstraps the project.

## Local Development

Prerequisites:

- Git
- Docker
- Docker Compose

Clone and start:

```bash
git clone <REPOSITORY_URL>
cd pro-crick
cp .env.example .env
docker compose up --build
```

On PowerShell:

```powershell
Copy-Item .env.example .env
docker compose up --build
```

Then open:

- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

See `DEVELOPMENT_SETUP.md` for migrations, seed data, troubleshooting, and complete onboarding instructions.

## Contributing

Read:

1. `AGENTS.md`
2. `PROJECT_SPEC.md`
3. `PLANS.md`
4. `DEVELOPMENT_SETUP.md`
5. `CONTRIBUTING.md`

Do not commit `.env`, runtime uploads, database volumes, or production data.
