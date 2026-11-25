# Tickets on the same files

`to-tickets` adds a blocking edge between two tickets that change the same modules. `implement` no longer lists the open pull requests on the same files: the blocking edge already orders the tickets. (PRs #16, #23)

## Upstream hooks
- `skills/engineering/to-tickets/SKILL.md`: "Two tickets that will change the same modules" under "### 3. Draft vertical slices", and "or change the same modules" in the quiz under "### 4. Quiz the user"
- `docs/engineering/to-tickets.md`: "Two tickets that change the same modules" under "## Blocking edges"

## On conflict
- Keep the rule; take upstream's rewording around it.

## Verify
- `grep -n "same modules" skills/engineering/to-tickets/SKILL.md` matches, and `grep -n "List the open pull requests" skills/engineering/implement/SKILL.md` does not.
