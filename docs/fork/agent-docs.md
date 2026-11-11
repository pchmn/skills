# Agent docs

Fork rules for agents: this manifest, and the upstream remote. (PR #2)

## Upstream hooks
- `CLAUDE.md` (`AGENTS.md` is a symlink to it): "## Fork manifest" section

## On conflict
- Keep both the upstream text and the fork section.

## Verify
- `grep -n "Fork manifest" CLAUDE.md` matches.
