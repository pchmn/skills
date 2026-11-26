# Model routing

`/implement` writes the code in its own session and spawns Sonnet builders only for large parts that touch separate files; a builder owns its checks. `code-review` reviews on Opus, so a model at least as strong as the one that wrote the diff checks it. (PRs #6, #8, #13)

Routing every ticket through builders cost more than it saved: on two tickets the orchestrator read about 16 M and 27 M tokens re-running checks, reading diffs and debugging CI, as much as its builders, and a builder taking 45 to 56 minutes held the whole session.

## Upstream hooks
- `skills/engineering/implement/SKILL.md`: the "**Builders.**" bullet
- `skills/engineering/code-review/SKILL.md`: "Run both sub-agents on Opus" under "### 4. Spawn both sub-agents in parallel"
- `docs/engineering/implement.md`: the "**Builders.**" bullet of "## What one run does", and the question "When does it spawn builders?"
- `docs/engineering/code-review.md`: the question "Which model runs the review?"

## On conflict
- Keep the session-builds rule, the builder routing for large separate parts, and the Opus review line; take upstream's rewording around them.
- If upstream adds its own model choice to either skill, compare before keeping two.

## Verify
- `grep -n 'model: "sonnet"' skills/engineering/implement/SKILL.md` and `grep -n 'model: "opus"' skills/engineering/code-review/SKILL.md` both match, and `grep -c '^model:' skills/engineering/implement/SKILL.md` prints `0`.
- `/implement #N` on a ticket that fits one session spawns no builder, and the two review sub-agents run on Opus.
