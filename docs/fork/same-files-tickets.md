# Tickets on the same files

`to-tickets` adds a blocking edge between two tickets that change the same modules, and `implement` starts despite an open pull request on the files it is about to change, naming it in its own pull request, and asks first only when the work needs that pull request's code. (PR #16)

## Upstream hooks
- `skills/engineering/to-tickets/SKILL.md`: "Two tickets that will change the same modules" under "### 3. Draft vertical slices", and "or change the same modules" in the quiz under "### 4. Quiz the user"
- `skills/engineering/implement/SKILL.md`: step 2, "List the open pull requests", and "found at step 2" in step 7
- `docs/engineering/to-tickets.md`: "Two tickets that change the same modules" under "## Blocking edges"
- `docs/engineering/implement.md`: steps 2 and 7 of "## What one run does"

## On conflict
- Keep both rules; take upstream's rewording around them.

## Verify
- `grep -n "same modules" skills/engineering/to-tickets/SKILL.md` and `grep -n "List the open pull requests" skills/engineering/implement/SKILL.md` both match.
