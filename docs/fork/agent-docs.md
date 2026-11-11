# Agent docs

Fork rules for agents: this manifest and its sync settings. (PR #2)

## Upstream hooks
- `CLAUDE.md` (`AGENTS.md` is a symlink to it): "## Fork manifest" section
- `.gitignore`: `.claude/*` with `!.claude/skills/`, replacing upstream's `.claude`, so the installed `sync-upstream` is tracked

## On conflict
- Keep both the upstream text and the fork section.
- `.gitignore`: keep upstream's new entries and the fork's two `.claude` lines.

## Verify
- `grep -n "Fork manifest" CLAUDE.md` matches.
