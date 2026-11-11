# ADR collisions

An agent sorts a collision with an ADR before raising it: a reversal stops and waits, an extension the user asked for rewrites the ADR in the same change, and the agent's own choice follows the ADR. ADRs state a decision rather than an inventory, are rewritten in place while the decision holds, and exclude a choice undone in one PR. (PR #1)

## Upstream hooks
- `skills/engineering/setup-matt-pocock-skills/domain.md`: "## When a change runs into an ADR": the three cases, replacing upstream's "## Flag ADR conflicts"
- `skills/engineering/domain-modeling/ADR-FORMAT.md`: "a decision, not an inventory" paragraph under the template; "## Editing an ADR"; "A choice undone in one PR" in the "Hard to reverse" test
- `skills/engineering/domain-modeling/SKILL.md`: "a choice undone in one PR fails this"; "which also covers editing an existing ADR"
- `docs/engineering/domain-modeling.md`: "## A decision, not an inventory"; the "Changed" row of the two-artifacts table; the "Miss any one" paragraph; an "It's working if" bullet

## On conflict
- Keep the fork's three cases over any single "flag the conflict" rule upstream writes; carry over upstream's wording changes elsewhere in the file.
- If upstream adds its own guidance on editing or superseding ADRs, merge it into "## Editing an ADR" rather than keeping two sections.

## Verify
- `grep -n "When a change runs into an ADR" skills/engineering/setup-matt-pocock-skills/domain.md` and `grep -n "Editing an ADR" skills/engineering/domain-modeling/ADR-FORMAT.md` both match.
- In a set-up repo, ask for a feature that adds one more case to an ADR: the agent updates the ADR in the same change and says so in one line, without stopping to ask.
