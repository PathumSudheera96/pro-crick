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

Every feature, fix, documentation task, setup change, and deployment change must use its own branch.

Start new work from an up-to-date `main` unless the work is intentionally stacked on another active branch:

```bash
git checkout main
git pull --ff-only origin main
git checkout -b feature/example
```

Push the branch to GitHub early so the work is backed up and visible to the team:

```bash
git push -u origin feature/example
```

Use one logical task per branch. Do not develop directly on `main` unless the repository owner explicitly approves an emergency change.

Examples:

```text
feature/player-directory
feature/player-seo
fix/enquiry-validation
chore/docker-dev
docs/deployment-runbook
codex/player-profile
```

Branch names should be lowercase, hyphen-separated, and specific to the work. Avoid branches containing unrelated changes.

---

# 4. Professional Development Checklist

For every task:

1. confirm the current stage in `PLANS.md`
2. create or switch to the correct feature branch before editing
3. inspect the relevant files before changing them
4. make the smallest coherent change
5. update docs, migrations, and `.env.example` when required
6. run relevant checks from `package.json`
7. review `git status` and `git diff`
8. commit with a clear message
9. push the branch to GitHub
10. open or update the pull request
11. record blockers, deployment notes, and manual QA results

Do not hand off important work that exists only on one local machine.

---

# 5. Pull Requests

All feature branches should be reviewed through a pull request before merging to `main`. Very small documentation-only changes may be merged directly only with repository-owner approval.

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

# 6. Required Checks

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

# 7. Database Changes

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

# 8. Environment Variables

If adding a variable:

1. add a safe placeholder to `.env.example`
2. update `DEVELOPMENT_SETUP.md`
3. update deployment documentation if production needs it
4. do not commit the real secret

---

# 9. Local Data

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

# 10. Frontend Changes

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

# 11. Security-sensitive Changes

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

# 12. Codex Collaboration

Codex should:

1. read `AGENTS.md`
2. read relevant project/spec/plan files
3. create or confirm a `codex/` branch before editing
4. inspect existing code before editing
5. implement only the requested bounded task
6. run relevant checks
7. review its own diff
8. commit and push the branch when asked to publish work
9. summarize migration/security/SEO impact

Human developers still review Codex output before merge.

---

# 13. Handoff Between Developers

Before handing an in-progress branch to another developer:

- push intended commits
- confirm the branch exists on GitHub
- do not leave the only copy of work uncommitted locally
- update PR/task notes
- explain incomplete work
- list required migration/setup steps
- list known failures
- update `PLANS.md` if status changed

A developer must not need another developer's local Docker volume to continue.

---

# 14. Review Priority

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

# 15. Merge Criteria

Do not merge significant work when:

- build is broken because of the branch
- known P0/P1 security issue exists
- required migration is missing
- required environment variable is undocumented
- production secrets are present
- public routes expose drafts/private content
- the change contradicts `PROJECT_SPEC.md` without approved scope update

---

# 16. Documentation Updates

Update:

- scope -> `PROJECT_SPEC.md`
- progress/blockers -> `PLANS.md`
- engineering rules -> `AGENTS.md`
- local Docker/setup -> `DEVELOPMENT_SETUP.md`
- collaboration -> `CONTRIBUTING.md`
- Codex task order -> `CODEX_EXECUTION_STEPS.txt`
