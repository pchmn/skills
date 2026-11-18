# Implement build rules

`/implement` edits files with the harness's edit tool and reverts one file with `git restore <path>`, and says so in a builder's brief. It runs the full check once before the commit and leaves slow suites to CI unless the repo's docs say otherwise. (PRs for the edit tool and the check sizes)

## Upstream hooks
- `skills/engineering/implement/SKILL.md`: "Edit files with the harness's file-editing tool" above the steps, and "Run that check once" in step 4
- `docs/engineering/implement.md`: "## How much it checks", "## How it edits files", and "The full check runs once" in step 4 of "## What one run does"

## On conflict
- Keep the rules; take upstream's rewording around them.

## Verify
- `grep -n "git restore <path>" skills/engineering/implement/SKILL.md` and `grep -n "Run that check once" skills/engineering/implement/SKILL.md` both match.
