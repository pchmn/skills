# Test bar and review size

`/implement` writes a test only for a behaviour that could break without anyone seeing it, writes it first only when it calls the logic directly (a browser or process test comes after the behaviour works), tests each behaviour once at the highest level that stays fast, and checks a criterion only the screen shows by looking. `code-review` runs the Spec axis only for a code diff over about 50 lines with a spec, and never asks the user for a spec it cannot find. `tdd` takes the repo's docs on what gets a test as the agreed seams, without asking. (PRs #22, #23, #25)

In one repo, a test per acceptance criterion grew the tests to the size of the code, and two Opus reviewers ran on most diffs.

## Upstream hooks
- `skills/engineering/implement/SKILL.md`: "for each behaviour that could break without anyone seeing it" and "comes after the behaviour works" in step 3
- `skills/engineering/tdd/SKILL.md`: "they are the agreement" under "## Seams: where tests go"; the exception under "**Red before green.**"
- `docs/engineering/tdd.md`: "they count as that agreement"; "**Should it write browser or end-to-end tests first?**"
- `skills/engineering/code-review/SKILL.md`: "Size the review to the diff" under "### 1. Pin the fixed point"; "Do not ask the user for one" under "### 2. Identify the spec source"
- `docs/engineering/implement.md`: step 3 of "## What one run does"; "## Acceptance criteria first"
- `docs/engineering/code-review.md`: "The review is sized to the diff"; "the Spec axis skips without asking you" under "## Prerequisites"
- `skills/engineering/ask-matt/SKILL.md`, `README.md`, `skills/engineering/README.md`: "for each behaviour that could break unseen"

## On conflict
- Keep the test bar and the review sizing; take upstream's rewording around them.

## Verify
- `grep -n "could break without anyone seeing it" skills/engineering/implement/SKILL.md` and `grep -n "Do not ask the user for one" skills/engineering/code-review/SKILL.md` both match.
