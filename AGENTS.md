# AGENTS.md

## Git conventions

- Commits follow Conventional Commits per `@commitlint/config-conventional`. Subjects start lowercase (`feat: add game clock`); older commits in history use sentence case, so don't copy them.
- PRs land on `main` by rebase-merge only. Never create merge commits on `main`.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues on `Touratica/html-scoreboard` via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
