# Agent docs

Fork rules for agents: this manifest, the upstream remote, and the `/sync-upstream` skill that merges upstream through a reviewed PR. (PR #2)

## Fork files
- `.claude/skills/sync-upstream/SKILL.md`: runs the sync check of `docs/fork/README.md` end to end

## Upstream hooks
- `CLAUDE.md` (`AGENTS.md` is a symlink to it): "## Fork manifest" section
- `.gitignore`: `.claude/*` with `!.claude/skills/`, replacing upstream's `.claude`, so the repo-local skill is tracked

## On conflict
- Keep both the upstream text and the fork section.
- `.gitignore`: keep upstream's new entries and the fork's two `.claude` lines.

## Verify
- `grep -n "Fork manifest" CLAUDE.md` matches.
