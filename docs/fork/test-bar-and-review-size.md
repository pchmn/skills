# Test bar and review size

`/implement` writes a test first only for a behaviour that could break without anyone seeing it, tests each behaviour once at the highest level that stays fast, and checks a criterion only the screen shows by looking. `code-review` runs the Spec axis only for a code diff over about 50 lines with a spec, and never asks the user for a spec it cannot find. (PRs #22, #23)

In one repo, a test per acceptance criterion grew the tests to the size of the code, and two Opus reviewers ran on most diffs.

## Upstream hooks
- `skills/engineering/implement/SKILL.md`: "for each behaviour that could break without anyone seeing it" in step 3
- `skills/engineering/code-review/SKILL.md`: "Size the review to the diff" under "### 1. Pin the fixed point"; "Do not ask the user for one" under "### 2. Identify the spec source"
- `docs/engineering/implement.md`: step 3 of "## What one run does"; "## Acceptance criteria first"
- `docs/engineering/code-review.md`: "The review is sized to the diff"; "the Spec axis skips without asking you" under "## Prerequisites"
- `skills/engineering/ask-matt/SKILL.md`, `README.md`, `skills/engineering/README.md`: "for each behaviour that could break unseen"

## On conflict
- Keep the test bar and the review sizing; take upstream's rewording around them.

## Verify
- `grep -n "could break without anyone seeing it" skills/engineering/implement/SKILL.md` and `grep -n "Do not ask the user for one" skills/engineering/code-review/SKILL.md` both match.
