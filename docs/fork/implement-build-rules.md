# Implement build rules

`/implement` reverts one file with `git restore <path>`, and says so in a builder's brief. It runs the repo's check (typecheck, lint) before the commit, chooses which tests to run beyond the files it touches, and leaves slow suites to CI unless the repo's docs say otherwise. (PRs #14, #15)

## Upstream hooks
- `skills/engineering/implement/SKILL.md`: "Revert a file with `git restore <path>`" above the steps, and "Run that check once" in step 5
- `docs/engineering/implement.md`: "## How much it checks", "## How it reverts files", and step 4 of "## What one run does"

## On conflict
- Keep the rules; take upstream's rewording around them.

## Verify
- `grep -n "git restore <path>" skills/engineering/implement/SKILL.md` and `grep -n "Run that check once" skills/engineering/implement/SKILL.md` both match.
