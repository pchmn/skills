# UI prototype

A ticket that adds a screen or changes a layout links a validated prototype: `to-tickets` asks for it, `implement` will not build without one unless the user says so, and `code-review`'s Spec axis compares the built screens with it. Where prototypes live and how to capture the app come from the repo's `AGENTS.md`. (PR #17)

## Upstream hooks
- `skills/engineering/to-tickets/SKILL.md`: "links the validated prototype it builds" in `<vertical-slice-rules>`
- `skills/engineering/implement/SKILL.md`: "links no validated prototype" in step 1
- `skills/engineering/code-review/SKILL.md`: "When the spec links a UI prototype" under "### 2. Identify the spec source", and "The linked UI prototype" in the Spec sub-agent prompt
- `docs/engineering/to-tickets.md`, `docs/engineering/implement.md`, `docs/engineering/code-review.md`: the same rule, under "## Blocking edges", step 1, and "## The two axes"

## On conflict
- Keep the rule and the "UI not compared" finding; take upstream's rewording. If upstream changes where `/prototype` leaves a prototype, follow it in the default.

## Verify
- `grep -ln "validated prototype" skills/engineering/{to-tickets,implement}/SKILL.md` lists both, and `grep -n "UI not compared" skills/engineering/code-review/SKILL.md` matches.
