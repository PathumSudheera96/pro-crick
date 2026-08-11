# CONTRIBUTING.md — Pro-Crick

## Purpose

This file defines how human developers and Codex collaborate on the Pro-Crick repository.

Read `AGENTS.md` first. `AGENTS.md` is the higher-priority engineering rulebook.

---

# 1. Getting Started

Before contributing:

1. Clone the private GitHub repository.
2. Read:
   - `AGENTS.md`
   - `PROJECT_SPEC.md`
   - `PLANS.md`
   - `DEVELOPMENT_SETUP.md`
3. Set up the local Docker environment.
4. Confirm the current phase/task in `PLANS.md`.
5. Pull current `main` before creating a branch.

---

# 2. Source of Truth

- GitHub repository: application code
- PostgreSQL: CMS/runtime data
- `PROJECT_SPEC.md`: approved V1 scope
- `PLANS.md`: current implementation state
- `AGENTS.md`: engineering rules
- `CODEX_EXECUTION_STEPS.txt`: planned Codex execution prompts

Do not keep important approved requirements only in private messages or local notes.

---

# 3. Branching

Keep `main` stable.

Use one logical task per branch.

Examples:

```text
feature/player-directory
feature/player-seo
fix/enquiry-validation
chore/docker-dev
docs/deployment-runbook
codex/player-profile
```

Avoid branches containing unrelated changes.

---

# 4. Pull Requests

A significant change should be reviewed through a pull request.

PR description should include:

- what changed
- why
- screenshots for important frontend changes
- schema/database impact
- migration instructions
- environment-variable changes
- security impact
- SEO impact where relevant
- tests/checks performed
- manual QA performed
- deployment notes

If the PR changes setup, verify the fresh-clone onboarding process.

---

# 5. Required Checks

Use scripts actually defined in `package.json`.

Current checks:

```bash
docker compose exec app pnpm lint
docker compose exec app pnpm typecheck
docker compose exec app pnpm build
```

There is no `test` script yet. Do not claim tests ran until a test script exists.

Do not claim a check passed if it was not run.

---

# 6. Database Changes

If a branch changes the production schema:

- create the correct migration
- commit migration files
- describe the migration in the PR
- explain destructive behavior if any
- explain rollback considerations
- verify another developer can apply it

Never:
- casually reset production
- use production credentials for tests

---

# 7. Environment Variables

If adding a variable:

1. add a safe placeholder to `.env.example`
2. update `DEVELOPMENT_SETUP.md`
3. update deployment documentation if production needs it
4. do not commit the real secret

---

# 8. Local Data

Do not commit:

- `.env`
- Docker/database volumes
- raw database dumps
- runtime uploads
- `node_modules`
- `.next`
- logs
- sensitive client data

Use development seeds for common test data.

Use sanitized exports only when necessary.

---

# 9. Frontend Changes

Review meaningful UI work at:

- mobile
- tablet
- desktop

Check:

- overflow
- keyboard access
- focus states
- image behavior
- loading/empty/error states
- CMS content with long and short text

Include screenshots in PRs where practical.

---

# 10. Security-sensitive Changes

Give extra review attention to:

- authentication
- permissions
- public forms
- uploads
- redirects
- database migrations
- HTML/rich text
- secrets
- admin routes

Follow `AGENTS.md`.

---

# 11. Codex Collaboration

Codex should:

1. read `AGENTS.md`
2. read relevant project/spec/plan files
3. inspect existing code before editing
4. implement only the requested bounded task
5. run relevant checks
6. review its own diff
7. summarize migration/security/SEO impact

Human developers still review Codex output before merge.

---

# 12. Handoff Between Developers

Before handing an in-progress branch to another developer:

- push intended commits
- do not leave the only copy of work uncommitted locally
- update PR/task notes
- explain incomplete work
- list required migration/setup steps
- list known failures
- update `PLANS.md` if status changed

A developer must not need another developer's local Docker volume to continue.

---

# 13. Review Priority

Review in this order:

1. data loss/security
2. correctness
3. access control
4. migrations
5. SEO URL stability
6. performance
7. maintainability
8. visual polish

---

# 14. Merge Criteria

Do not merge significant work when:

- build is broken because of the branch
- known P0/P1 security issue exists
- required migration is missing
- required environment variable is undocumented
- production secrets are present
- public routes expose drafts/private content
- the change contradicts `PROJECT_SPEC.md` without approved scope update

---

# 15. Documentation Updates

Update:

- scope -> `PROJECT_SPEC.md`
- progress/blockers -> `PLANS.md`
- engineering rules -> `AGENTS.md`
- local Docker/setup -> `DEVELOPMENT_SETUP.md`
- collaboration -> `CONTRIBUTING.md`
- Codex task order -> `CODEX_EXECUTION_STEPS.txt`
