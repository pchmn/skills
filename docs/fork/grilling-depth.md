# Grilling depth

A grilling session runs **light** by default: two rounds at most, asking only what would be expensive to get wrong, then listing the answers it assumed. **Deep** works the full design tree on request. It holds wherever grilling runs, including inside `grill-with-docs` and `triage`. (PR #2)

## Upstream hooks
- `skills/productivity/grilling/SKILL.md`: "Interview the user until you reach" (upstream says "relentlessly"); "A session runs at one of two **depths**"; "A light session is done after its second round"
- `docs/productivity/grilling.md`: "By default it stops after two rounds" in "It's working if"

## On conflict
- Keep the depth paragraph and the two-way done criterion; carry over upstream's changes to rounds, the frontier and the question format.

## Verify
- `grep -n "default is \*\*light\*\*" skills/productivity/grilling/SKILL.md` matches.
- `/grill-with-docs <idea>` stops after two rounds and lists its assumptions; `/grill-with-docs deep <idea>` keeps going until nothing is open.
