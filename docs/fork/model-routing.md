# Model routing

`/implement` builds on Sonnet and `code-review` reviews on Opus, so decided work runs at half price and a stronger model checks it. (PR #6)

## Upstream hooks
- `skills/engineering/implement/SKILL.md`: `model: sonnet` in the frontmatter
- `skills/engineering/code-review/SKILL.md`: "Run both sub-agents on Opus" under "### 4. Spawn both sub-agents in parallel"
- `docs/engineering/implement.md`: "The run is on Sonnet" under "## What one run does", and the question "It stopped to ask me something"
- `docs/engineering/code-review.md`: the question "Which model runs the review?"

## On conflict
- Keep both model lines; take upstream's rewording around them.
- If upstream adds its own model choice to either skill, compare before keeping two.

## Verify
- `grep -n 'model: sonnet' skills/engineering/implement/SKILL.md` and `grep -n 'model: "opus"' skills/engineering/code-review/SKILL.md` both match.
- `/implement #N` in Claude Code shows Sonnet on the turn, and the two review sub-agents run on Opus.
