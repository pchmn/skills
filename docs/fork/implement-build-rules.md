# Implement build rules

`/implement` edits files with the harness's edit tool and reverts one file with `git restore <path>`, and says so in a builder's brief. (PR for the edit tool)

## Upstream hooks
- `skills/engineering/implement/SKILL.md`: "Edit files with the harness's file-editing tool" above the steps
- `docs/engineering/implement.md`: "## How it edits files"

## On conflict
- Keep the rules; take upstream's rewording around them.

## Verify
- `grep -n "git restore <path>" skills/engineering/implement/SKILL.md` matches.
