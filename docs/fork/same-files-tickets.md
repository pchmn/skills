# Tickets on the same files

`to-tickets` adds a blocking edge between two tickets that change the same modules, and `implement` names any open pull request on the files it is about to change and asks before starting. (PR #16)

## Upstream hooks
- `skills/engineering/to-tickets/SKILL.md`: "Two tickets that will change the same modules" under "### 3. Draft vertical slices", and "or change the same modules" in the quiz under "### 4. Quiz the user"
- `skills/engineering/implement/SKILL.md`: step 2, "List the open pull requests"
- `docs/engineering/to-tickets.md`: "Two tickets that change the same modules" under "## Blocking edges"
- `docs/engineering/implement.md`: step 2 of "## What one run does"

## On conflict
- Keep both rules; take upstream's rewording around them.

## Verify
- `grep -n "same modules" skills/engineering/to-tickets/SKILL.md` and `grep -n "List the open pull requests" skills/engineering/implement/SKILL.md` both match.
