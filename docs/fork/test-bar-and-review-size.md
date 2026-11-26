# Test bar and review size

`/implement` tests a behaviour only when it could break without anyone seeing it, tests each once at the highest level that stays fast, and checks what only the screen shows by looking; it leaves the order of work and the choice of tests to run to the agent. `code-review` runs the Spec axis only for a code diff over about 50 lines with a spec, and never asks the user for a spec it cannot find. `tdd` takes the repo's docs on what gets a test as the agreed seams, without asking. (PRs #22, #23, #25)

In one repo, a test per acceptance criterion grew the tests to the size of the code, and two Opus reviewers ran on most diffs.

## Upstream hooks
- `skills/engineering/implement/SKILL.md`: "Test a behaviour only when it could break without anyone seeing it" in the "**Tests.**" bullet
- `skills/engineering/tdd/SKILL.md`: "they are the agreement" in the "**Agreed seams.**" bullet
- `docs/engineering/tdd.md`: "they count as that agreement"
- `skills/engineering/code-review/SKILL.md`: "Size the review to the diff" under "### 1. Pin the fixed point"; "Do not ask the user for one" under "### 2. Identify the spec source"
- `docs/engineering/implement.md`: the "**Tests.**" bullet of "## What one run does"; "## Which behaviours get a test"
- `docs/engineering/code-review.md`: "The review is sized to the diff"; "the Spec axis skips without asking you" under "## Prerequisites"
- `skills/engineering/ask-matt/SKILL.md`, `README.md`, `skills/engineering/README.md`: "each behaviour that could break unseen"

## On conflict
- Keep the test bar and the review sizing; take upstream's rewording around them.

## Verify
- `grep -n "could break without anyone seeing it" skills/engineering/implement/SKILL.md` and `grep -n "Do not ask the user for one" skills/engineering/code-review/SKILL.md` both match.
