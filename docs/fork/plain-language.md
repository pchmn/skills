# Plain language and reopening decisions

Questions, titles, tickets, pull requests and ADRs are written in plain words that name the concrete thing, with no metaphors or invented terms. A grilling question fits in three short lines. Grilling doesn't ask again what the repo's docs and ADRs settle, unless something new bears on it; answering **go** accepts the remaining recommendations and ends the session. An ADR may carry a **Revisit if** line, and meeting it reopens the ADR like a reversal.

## Fork files
- `skills/productivity/interactive-form/SKILL.md`: "named `go`" in "### A grilling round"

## Upstream hooks
- `skills/productivity/grilling/SKILL.md`: "three short lines at most" in the round format; "Write plainly."; "Before the first round, read what is already decided"; "answers a round with **go**"
- `skills/engineering/domain-modeling/ADR-FORMAT.md`: "The title says the decision in plain words"; "**Revisit if**" in "## Optional sections"
- `skills/engineering/setup-matt-pocock-skills/domain.md`: "**What it rests on has changed**" in "## When a change runs into an ADR"
- `skills/engineering/setup-matt-pocock-skills/agent-skills-block.md`: "### Writing"
- `skills/engineering/setup-matt-pocock-skills/SKILL.md`: "writing, branching, pull requests" in step 4
- `docs/productivity/grilling.md`: "Answer a round with **go**" in "Can I cap the number of questions?"; "**Will it ever question a decision we already made?**"; three "It's working if" bullets
- `docs/engineering/domain-modeling.md`: "The title says that decision in plain words"; the "Revisit if" row of the collision table; an "It's working if" bullet

## On conflict
- Keep the fork's lines; carry over upstream's changes to the round format, the frontier and the ADR template around them.

## Verify
- `grep -n "Write plainly" skills/productivity/grilling/SKILL.md` and `grep -n "### Writing" skills/engineering/setup-matt-pocock-skills/agent-skills-block.md` both match.
- `/grill-with-docs <idea>` in a repo with ADRs: no question re-asks an ADR without naming what changed, and answering **go** ends the session with the assumptions listed.
