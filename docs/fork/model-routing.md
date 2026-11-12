# Model routing

`/implement` builds through Sonnet subagents and `code-review` reviews on Opus, so decided work runs at half price and a stronger model checks it. (PRs #6, #8)

## Upstream hooks
- `skills/engineering/implement/SKILL.md`: "You orchestrate; builders write the code" above the steps, and the builder hand-offs in steps 3, 5 and 7
- `skills/engineering/code-review/SKILL.md`: "Run both sub-agents on Opus" under "### 4. Spawn both sub-agents in parallel"
- `docs/engineering/implement.md`: "The session orchestrates on its own model" under "## What one run does", and the question "Why builder subagents"
- `docs/engineering/code-review.md`: the question "Which model runs the review?"

## On conflict
- Keep the builder routing and the Opus review line; take upstream's rewording around them.
- If upstream adds its own model choice to either skill, compare before keeping two.

## Verify
- `grep -n 'model: "sonnet"' skills/engineering/implement/SKILL.md` and `grep -n 'model: "opus"' skills/engineering/code-review/SKILL.md` both match, and `grep -c '^model:' skills/engineering/implement/SKILL.md` prints `0`.
- `/implement #N` in Claude Code, auto mode included, spawns builders on Sonnet, and the two review sub-agents run on Opus.
