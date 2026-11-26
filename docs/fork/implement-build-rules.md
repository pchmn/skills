# Implement build rules

`/implement` reverts one file with `git restore <path>`, never a whole-tree `git checkout -- .`, and leaves a builder to own its part's checks. Which checks and tests to run, and when, is the agent's call. (PRs #14, #15)

## Upstream hooks
- `skills/engineering/implement/SKILL.md`: "Revert a file with `git restore <path>`" and "A builder owns its part's checks" in the bullet list
- `docs/engineering/implement.md`: the "**Other sessions share the repo.**" and "**Builders.**" bullets of "## What one run does"

## On conflict
- Keep the rules; take upstream's rewording around them.

## Verify
- `grep -n "git restore <path>" skills/engineering/implement/SKILL.md` and `grep -n "A builder owns its part's checks" skills/engineering/implement/SKILL.md` both match.
